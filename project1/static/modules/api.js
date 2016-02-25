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
					var saved = JSON.parse(localStorage.getItem('houses'));
					saved = saved || [];

					saved.push(data);
					console.log(saved);
					localStorage.setItem('houses', JSON.stringify(saved));


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
                    Transparency.render(document.getElementById('DetailResult'), Object, directives);
                })
            },
        } // end of api object
