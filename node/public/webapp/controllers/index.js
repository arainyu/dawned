define(['modelIndex', 'text!views/index.hbs', 'handlebars'], function(modelIndex, indexHtml, handlebars) {
	var template = handlebars.compile(indexHtml);

	modelIndex.excute(function(data) {
		document.body.innerHTML = template(data);
		document.title = 'webapp ' + data.title;
	});


});