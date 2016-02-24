(function() {

	 var app = {
        init: function() {
			document.getElementById("searchButton").addEventListener('click', api.searchObject)
            routes.init();
            console.log('initialized')
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
                'results': function() {
					sections.toggle('#SearchResults')
                },
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


    var api = {

            searchObject: function() {
                var searchTerm = document.getElementById("search").value;
                microAjax("http://funda.kyrandia.nl/feeds/Aanbod.svc/json/e2d60e885b8742d4b0648300e3703bd7/?type=koop&zo=/" + searchTerm + "&page=1&pagesize=25", function(resp) {
					window.location.hash = "#results"
                    var data = JSON.parse(resp);
                    console.table(data);
                    console.table(data)
                    var objectArray = [];

                    for (var i = 0; i < data.Objects.length; i++) {
                        var object = {
                            place: data.Objects[i].Woonplaats,
                            adres: data.Objects[i].Adres,
                            arooms: "Aantal kamers: " + data.Objects[i].AantalKamers,
                            since: "Aangeboden sinds: " + data.Objects[i].AangebodenSindsTekst,
                            price: "$ " + data.Objects[i].Koopprijs
                        },
							directives = {
                            link: {
                                href: function() {
                                    return "#results/" + this.Id;
                                }
                            }
                        }
						
                        objectArray.push(object);
                    }
                    Transparency.render(document.getElementById('SearchResults'), objectArray, directives);
                });
            }, // end of searchObject function
		
		
			detailObject: function(id) {
				microAjax("http://funda.kyrandia.nl/feeds/Aanbod.svc/json/detail/e2d60e885b8742d4b0648300e3703bd7/koop/"+id+"/", function(resp) {
					var data = JSON.parse(resp);
					console.log(data);
					
					
					var Object = {
						adres: data.Adres,
						arooms: data.AantalKamers,
						buildyear: data.Bouwjaar,
						price: data.Koopprijs,
						place: data.Plaats
					},
						directives = {
							image: {
                                src: function(params) {
                                    return data.HoofdFoto;
                                }
                            }
						}
					console.log(directives.link)
					Transparency.render(document.getElementById('DetailResult'), Object, directives);
				})
			}
        } // end of api object

	
	app.init()


}());