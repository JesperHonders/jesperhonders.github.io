(function () {
    'use strict';
    
//    function handleList(data) {
//        var weerData = data.buienradarnl[0].weergegevens[0].actueel_weer[0].weerstations[0].weerstation;
//        var stationArray = [];
//        for (var i = 0; i < weerData.length; i += 1) {
//        
//            var weatherstation = {
//                name: weerData[i].stationnaam[0]._text,
//                temp: "Temperatuur: "+weerData[i].temperatuurGC[0]._text,
//                humid: "Luchtvochtigheid in %: "+weerData[i].luchtvochtigheid[0]._text,
//                pressure: "luchtdruk: "+weerData[i].luchtdruk[0]._text,
//                stationID: weerData[i].stationcode[0]._text,
//            }
//            stationArray.push(weatherstation);
//        }
//        
//            var directives = {
//                link: {
//                    href: function(params) {
//                        return "#" + this.stationID;
//                    }
//                }
//            };
//        Transparency.render(document.getElementById('list'), stationArray, directives);
//    }    
//	var xmlhttp = new XMLHttpRequest();
//
//	
//	xmlhttp.onreadystatechange = function() {
//		if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
//			handleResponse(xmlhttp.response);
//		}
//	}
//	
//	
//	xmlhttp.open('GET', 'http://xml.buienradar.nl/', true);
//	xmlhttp.send();
	
//	function handleResponse(xmlResponse) {
//        
//		xmlResponse = xmlhttp.responseXML;
//		var root = xmlResponse.documentElement;
//        console.log(root);
//		var weatherstations = root.getElementsByTagName('weerstation');
//        var stationArray = [];
//        
//		for(var i = 0; i < weatherstations.length; i++) {
//            
//            var weatherstation = {
//                
//                    name: weatherstations[i].children.item(1).textContent,
//                    temp: "Temperatuur: " + weatherstations[i].children.item(6).textContent,
//                    humid: weatherstations[i].children.item(5).textContent + "% Luchtvochtigheid",
//                    pressure: weatherstations[i].children.item(11).textContent + " Bar luchtdruk",
//                    stationID: weatherstations[i].children.item(0).textContent
//                
//                };
//            
//            stationArray.push(weatherstation);
//		}
//        
//        var directives = {
//            link: {
//                href: function(params) {
//                    return "#" + this.stationID;
//                }
//            }
//        };
//		Transparency.render(document.getElementById('list'), stationArray, directives);
//	}
    

    var app = {
        init: function () {
            routes.init();
            console.log('initialized')
        }
    };
    var select = {
        one: function (selector) {
            return document.querySelector(selector);
        },
        all: function (selector) {
            return document.querySelectorAll(selector);
        }
    }

    var routes = {
        init: function () {
			routie({
				'list': function() {
					sections.toggle('#list');
                    api.init();
				},
				'home': function() {
				   	sections.toggle('#home')
				},
                ':id' : function (stationid) {
                    
                }
			})
        }
    };
    
    var api = {
        init: function () {
            microAjax("https://api.soundcloud.com/playlists/87719494?client_id=4f0d8f453e62eb81e19a616cb8ef6e44", function(resp){
                var data = JSON.parse(resp);
                var trackData = data.tracks;
                
                console.log(trackData)
                
                var track = {
                    username: trackData.title,
                    genre: trackData.genre,
                    description: trackData.description
                }
                
                console.log(track)
                
                Transparency.render(document.getElementById('list'), track);
                
            });
        }
    }

    var sections = {
        toggle: function (hash) {
            var content = select.all('.content')
            for (var i = 0; i < content.length; i++) {
                content[i].classList.add('none')
            }
            select.one(hash).classList.remove('none')
        }
    }
    app.init();
}());
