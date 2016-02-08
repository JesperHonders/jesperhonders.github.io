(function () {
    'use strict';

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
            window.addEventListener("hashchange", function (HashChangeEvent) {
                var hash = location.hash
                sections.toggle(hash);
            }, false);
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
