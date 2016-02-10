(function () {
    'use strict';
	
	var xmlhttp = new XMLHttpRequest();

	
	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			handleResponse(xmlhttp.response);
		}
	}
	
	
	xmlhttp.open("GET", "http://xml.buienradar.nl/", true);
	xmlhttp.send();
	
	function handleResponse(xmlResponse) {
		xmlResponse = xmlhttp.responseXML;
		var root = xmlResponse.documentElement;
        console.log(root);
		var weatherstations = root.getElementsByTagName('weerstation');
		for(var i = 0; i < weatherstations.length; i++) {
			var name = weatherstations[i].children.item(1).textContent;
			var temp = weatherstations[i].children.item(6).textContent;
			var para = document.createElement("p")
			var node = document.createTextNode(name + " - Temperatuur: " + temp);
			para.appendChild(node);
			var list = document.getElementById('list');
			list.appendChild(para);
		}
		
	}
	

    var app = {
        init: function () {
            routes.init();
            console.log("initialized")
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
					sections.toggle('#list')
				},
				'home': function() {
				   	sections.toggle('#home')
				 }
			})
        }
    };

    var sections = {
        toggle: function (hash) {
            var content = select.all('.content')
            for (var i = 0; i < content.length; i++) {
                content[i].classList.add("none")
            }
            select.one(hash).classList.remove("none")
        }
    }
    app.init();
}());
