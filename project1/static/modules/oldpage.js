//                    var objectArray = [];
//
//                    for (var i = 0; i < data.Objects.length; i++) {
//                        var object = {
//                            place: data.Objects[i].Woonplaats,
//                            adres: data.Objects[i].Adres,
//							foto: data.Objects[i].FotoLarge,
//                            arooms: "Aantal kamers: " + data.Objects[i].AantalKamers,
//                            since: "Aangeboden sinds: " + data.Objects[i].AangebodenSindsTekst,
//                            price: "$ " + data.Objects[i].Koopprijs,
//							id: data.Objects[i].Id
//                        },
//							directives = {
//								link: {
//									href: function(params) {
//										return "#results/" + this.id;
//									},
//								resultimage: {
//                                	src: function(params) {
//										return this.foto
//                                	}
//								}
//                            }
//                        }
//						console.log(directives.image)
//                        objectArray.push(object);
//                    }
//                    Transparency.render(document.getElementById('SearchResults'), objectArray, directives);