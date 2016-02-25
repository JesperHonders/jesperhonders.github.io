requirejs.config({
	baseUrl: 'static',
	paths: {
		routie: 'lib/routie',
		microAjax: 'lib/microajax',
		transparency: 'lib/transparency.min',
		sections: 'modules/section',
	}
});


require(['modules/api'], function(api){
})

require(['modules/routes'], function(routes){
	routes.init()
})