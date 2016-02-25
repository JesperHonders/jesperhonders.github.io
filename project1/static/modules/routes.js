(function(){
	define(['routie', 'microAjax', 'sections'], function(){
		
		 var routes = {
        init: function(xmlhttp) {
            routie({
                'results': function() {
					sections.toggle('#SearchResults')
                },
                'results/:id': function(id) {
					api.detailObject(id);
                    sections.toggle('#DetailResult');
                }
            })
        }
    };
		return routes;
	}
)}())
	