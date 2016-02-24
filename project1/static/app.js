(function() {

	 var app = {
        init: function() {
            routes.init();
			utils.events();
            console.log('initialized');
			console.log(utils.random());
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
	
	var utils = {
		events: function() {
			document.getElementById("searchButton").addEventListener('click', api.searchObject);
			document.getElementById("backButton").addEventListener('click', utils.backToResults);
		},
		backToResults: function() {
			window.location.hash = "#results"
		},
		random: function() {
			return Math.floor(Math.random() * (24 - 0) + 0);
		}
		
	}


    var api = {

            searchObject: function() {
                var searchTerm = document.getElementById("search").value;
                microAjax("http://funda.kyrandia.nl/feeds/Aanbod.svc/json/e2d60e885b8742d4b0648300e3703bd7/?type=koop&zo=/" + searchTerm + "&page=1&pagesize=25", function(resp) {
					window.location.hash = "#results"
                    var data = JSON.parse(resp);
                    console.table(data);
                    var objectArray = [];

                    for (var i = 0; i < data.Objects.length; i++) {
                        var object = {
                            place: data.Objects[i].Woonplaats,
                            adres: data.Objects[i].Adres,
							foto: data.Objects[i].FotoLarge,
                            arooms: "Aantal kamers: " + data.Objects[i].AantalKamers,
                            since: "Aangeboden sinds: " + data.Objects[i].AangebodenSindsTekst,
                            price: "$ " + data.Objects[i].Koopprijs,
							id: data.Objects[i].Id
                        },
							directives = {
								link: {
									href: function(params) {
										return "#results/" + this.id;
									},
								resultimage: {
                                	src: function(params) {
										return this.foto
                                	}
								}
                            }
                        }
						console.log(directives.image)
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
				})}
        } // end of api object
	

	app.init()


}());
