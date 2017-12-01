$(function(){
	if($('.article-title').html().indexOf('playground')!=-1){
		var article = $('.article-entry');
		$.getScript("/js/"+article.find('p')[0].innerHTML+".js", function(data, status, jqxhr) {
			if(typeof init == 'function'){
				init(article[0]);
			}
		});
	}
})