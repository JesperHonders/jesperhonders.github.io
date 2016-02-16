(function () {
    'use strict';
    
    
	
	var xmlhttp = new XMLHttpRequest();

	
	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			handleResponse(xmlhttp.response);
			handleList(xmlhttp.response);
		}
	};
	
	
	xmlhttp.open('GET', 'http://xml.buienradar.nl/', true);
	xmlhttp.send();
	
	
	function handleList(xmlResponse) {
		var stationId = window.location.hash;
		console.log(stationId)
		xmlResponse = xmlhttp.responseXML;
		var root = xmlResponse.documentElement;
		console.log(root);
		
		var weatherstation = document.getElementById(stationId)
		console.log(weatherstation);
	
		
	}
	
	function handleResponse(xmlResponse) {
        
		xmlResponse = xmlhttp.responseXML;
		var root = xmlResponse.documentElement;
		var weatherstations = root.getElementsByTagName('weerstation');
        var stationArray = [];
        
		for(var i = 0; i < weatherstations.length; i++) {
            
            var weatherstation = {
                
                    name: weatherstations[i].children.item(1).textContent,
                    temp: "Temperatuur: " + weatherstations[i].children.item(6).textContent,
                    humid: weatherstations[i].children.item(5).textContent + "% Luchtvochtigheid",
                    pressure: weatherstations[i].children.item(11).textContent + " Bar luchtdruk",
                    stationID: weatherstations[i].children.item(0).textContent
                
                };
            
            stationArray.push(weatherstation);
		}
        
        var directives = {
            link: {
                href: function(params) {
                    return "#" + this.stationID;
                }
            }
        };
		Transparency.render(document.getElementById('list'), stationArray, directives);
	}
    

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
        init: function (xmlhttp) {
			routie({
				'list': function() {
					sections.toggle('#list')
				},
				'home': function() {
				   	sections.toggle('#home')
				},
                ':id' : function (stationid) {
                    alert("Station id: "+stationid+ " - Data : "+ this.params.id);
					console.log(this)
                }
			})
        }
    };

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
