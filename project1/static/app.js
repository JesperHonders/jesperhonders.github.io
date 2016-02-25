(function() {

    var app = {
        init: function() {
            routes.init(); // Initiate Routes
            utils.events(); // Setup Event Listeners
            console.log('initialized');
			var StorageValues = utils.listLocalStorage();
			console.dir(StorageValues[1]);
        }
    };
	
	


    // Credits to Math96
    var select = {
        one: function(selector) {
            return document.querySelector(selector);
        },
        all: function(selector) {
            return document.querySelectorAll(selector);
        }
    }

    var routes = {
        init: function(xmlhttp) {
            routie({
                'results': function() {},
                'results/:id': function(id) {
                    api.detailObject(id);
                    sections.toggle('#DetailResult');
                }
            })
        }
    };

    // Credits to Math96
    var sections = {
        toggle: function(hash) {
            var content = select.all('.content')
            for (var i = 0; i < content.length; i++) {
                content[i].classList.add('none')
            }
            select.one(hash).classList.remove('none')
        }
    }

    var utils = {
        spinner: document.getElementById('spinner'),

        events: function() {
            document.getElementById("searchButton").addEventListener('click', api.searchObject);
            document.getElementById("newHouseButton").addEventListener('click', api.searchObject);
        },

        listLocalStorage: function() {
            var items = [],
                keys = Object.keys(localStorage),
                i = keys.length;
            while (i--) {
                items.push(localStorage.getItem(keys[i]));
            }
            return items;
        }
    }



    var api = {

            key: "e2d60e885b8742d4b0648300e3703bd7",

            searchObject: function() {
                var searchTerm = document.getElementById("searchTerm").value;
                var minPriceSelect = document.forms['searchForm'].elements['minPrice'];
                var minPriceValue = minPriceSelect.value;
                var maxPriceSelect = document.forms['searchForm'].elements['maxPrice'];
                var maxpriceValue = maxPriceSelect.value;
                document.getElementById('spinner').classList.remove('none')
                microAjax("http://funda.kyrandia.nl/feeds/Aanbod.svc/json/" + api.key + "/?type=koop&zo=/" + searchTerm + "/" + minPriceValue + "-" + maxpriceValue + "/", function(resp) {
                    document.getElementById('spinner').classList.add('none')
                    document.getElementById('notFound').classList.add('none')
                    window.location.hash = "#results";
                    var data = JSON.parse(resp);
                    console.log(data.Objects);
                    var amountFound = data.Objects.length;
                    var house = data.Objects[Math.floor(Math.random() * (amountFound - 0) + 0)];



                    if (typeof house === 'undefined') {
                        document.getElementById('notFound').classList.remove('none')
                        document.getElementById('SearchResults').classList.add('none')
                    } else {
                        sections.toggle('#SearchResults')
                        var object = {
                                place: house.Woonplaats,
                                adres: house.Adres,
                                foto: house.FotoLarge,
                                arooms: "Aantal kamers: " + house.AantalKamers,
                                since: "Aangeboden sinds: " + house.AangebodenSindsTekst,
                                price: "$ " + house.Koopprijs,
                                id: house.Id
                            },
                            directives = {
                                image: {
                                    src: function(params) {
                                        return this.foto;
                                    }
                                },
                                link: {
                                    href: function(params) {
                                        return "#results/" + this.id
                                    }
                                }
                            }
                        Transparency.render(document.getElementById('SearchResults'), object, directives);
                    }
                })
            }, // end of searchObject function


            detailObject: function(id) {
                microAjax("http://funda.kyrandia.nl/feeds/Aanbod.svc/json/detail/e2d60e885b8742d4b0648300e3703bd7/koop/" + id + "/", function(resp) {
                    var data = JSON.parse(resp);
                    console.log(data);


                    var Object = {
                            adres: data.Adres,
                            arooms: "Aantal Kamers: " + data.AantalKamers,
                            buildyear: "Bouwjaar: " + data.Bouwjaar,
                            price: "Kost de Koper: " + data.Koopprijs,
                            place: data.Plaats,
                            description: data.VolledigeOmschrijving,
                        },
                        directives = {
                            image: {
                                src: function(params) {
                                    return data.HoofdFoto;
                                }
                            },
                            linkFunda: {
                                href: function(params) {
                                    return data.URL
                                }
                            }
                        }
                    api.storeObject(data.InternalId);
                    Transparency.render(document.getElementById('DetailResult'), Object, directives);
                })
            },

            storeObject: function(id) {
                microAjax("http://funda.kyrandia.nl/feeds/Aanbod.svc/json/detail/e2d60e885b8742d4b0648300e3703bd7/koop/" + id + "/", function(resp) {
                    var data = JSON.parse(resp);
                    localStorage.setItem(id, data);
                })
            }
        } // end of api object


    app.init()


}());