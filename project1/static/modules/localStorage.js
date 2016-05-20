function lsTest(){
    var test = 'test';
    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch(e) {
        return false;
    }
}

if(lsTest() === true){
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
                                    },
									alt: function(params) {
										return 'Foto van ' + this.adres
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
   console.log("Localstorage works, history panel enabled")
   
}else{
	document.getElementById('historieButton').style.display = "none";
	console.log("Localstorage doesn't work, History panel disabled")
}

