(function() {
    'use strict';

    var app = {
        init: function() {
            routes.init();
            console.log('initialized')
        }
    };
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
                'list': function() {
                    api.listStations();
                },
                'home': function() {
                    sections.toggle('#home')
                },
                ':id': function(stationid) {
                    sections.toggle('#detail');
                    api.detailStation(stationid);
                }
            })
        }
    };

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
        listStations: function() {
            document.getElementById('loader').style.display = 'block';
            microAjax("http://api.openweathermap.org/data/2.5/box/station?cluster=no&cnt=200&format=json&bbox=8.87,49.07,65.21,61.26,6&APPID=c680ce8bf66f2607453af41493091874", function(resp) {
                document.getElementById('loader').style.display = 'none';
                var data = JSON.parse(resp);
                var stationArray = [];
                for (var i = 0; i < data.list.length; i++) {
                    var weatherstation = {
                            name: data.list[i].name,
                            id: data.list[i].id
                        },
                        directives = {
                            link: {
                                href: function(params) {
                                    return "#" + this.id;
                                }
                            }
                        }
                    stationArray.push(weatherstation);
                }
                Transparency.render(document.getElementById('list'), stationArray, directives);
                sections.toggle('#list')
            });
        },

        detailStation: function(stationid) {
            microAjax("http://api.openweathermap.org/data/2.5/station?id=" + stationid + "&APPID=c680ce8bf66f2607453af41493091874", function(resp) {
                var data = JSON.parse(resp);
                var detailStation = {
                    stationname: "Station Name: " + data.station.name,
                    stationtemp: "Temperature station in C: " + (data.last.main.temp - 273.15)
                }
                Transparency.render(document.getElementById('detail'), detailStation);
            });
        }
    }
     var hitElement = document.getElementById('detail');
                var mc = new Hammer(hitElement);
                mc.on("swipeleft", function(ev) {
                    var newId = parseInt(window.location.hash.substring(1))
                    window.location.hash = (newId+10);
                });
                mc.on("swiperight", function(ev) {
                                var newId = parseInt(window.location.hash.substring(1))
                                window.location.hash = (newId-10);
                            });
    app.init();
}());
