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
                'results': function() {},
                'results/:id': function(id) {
                    api.detailObject(id);
                    sections.toggle('#DetailResult');
                },
				'seenHouses': function() {
					sections.toggle('#SeenHouses')
					seen.display()
				}})
            
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