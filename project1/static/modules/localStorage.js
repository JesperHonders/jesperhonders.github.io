var seen = {
	display: function(){
		var data = localStorage.getItem('houses');
		var house = JSON.parse(data);
		house.reverse();
		var houseArray = []
		
		console.log(house)
		
		for (var i = 0 ;i < house.length; i++){
			var object = {
                                adres: house[i].Adres,
                                id: house[i].InternalId,
								foto: house[i].HoofdFoto
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
					houseArray.push(object)
		}

		console.log(houseArray)
		Transparency.render(document.getElementById('SeenHouses'), houseArray, directives);
		
	}
}