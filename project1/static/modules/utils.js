var utils = {
        spinner: document.getElementById('spinner'),

        events: function() {
            document.getElementById("searchButton").addEventListener('click', Api.run);
            document.getElementById("newHouseButton").addEventListener('click', Api.run);
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
