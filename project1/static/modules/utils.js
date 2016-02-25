var utils = {
        spinner: document.getElementById('spinner'),

        events: function() {
            document.getElementById("searchButton").addEventListener('click', api.searchObject);
            document.getElementById("newHouseButton").addEventListener('click', api.searchObject);
        },

        listLocalStorage: function() {
            var items = [],
                keys = Object.keys(localStorage),
                i = keys.length;
            while (i--) {
                items.push(localStorage.getItem(keys[i]));
            }
            return items;
        }
    }
