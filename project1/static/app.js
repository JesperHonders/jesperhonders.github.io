(function () {
	
	

	var api = {
		
		searchObject: function() {
			var searchTerm = document.getElementById("search").value;
			microAjax("http://funda.kyrandia.nl/feeds/Aanbod.svc/json/e2d60e885b8742d4b0648300e3703bd7/?type=koop&zo=/"+searchTerm+"&page=1&pagesize=25", function (resp) {
				var data = JSON.parse(resp);
				console.table(data);

				var objectArray = [];

				for (var i = 0; i < data.Objects.length; i++) {
							var object = {
									place: data.Objects[i].Woonplaats,
									adres: data.Objects[i].Adres,
									arooms: "Aantal kamers: " + data.Objects[i].AantalKamers,
									since: "Aangeboden sinds: " + data.Objects[i].AangebodenSindsTekst,
									price: "$ " + data.Objects[i].Koopprijs

								}
							
							var directives = {
								
							}

							objectArray.push(object);
						}
				console.table(data)
				Transparency.render(document.getElementById('SearchResults'), objectArray);
			});
		}, // end of searchObject function
		
		
		detailObject: function() {
			microAjax("http://funda.kyrandia.nl/feeds/Aanbod.svc/json/detail/e2d60e885b8742d4b0648300e3703bd7/koop/"+objectId+"/"), function (resp) {
				
			}
		}
		
	} // end of api object
		
	
		
	
	document.getElementById("searchButton").addEventListener('click', api.searchObject)
	
	
	
}());
