(function() {

	// just place a div at top right
	// $(".bucketDivider").prepend($("<div style='height:150px;background-color:blue;'></div>"));
	var div = document.createElement('div');
	div.style.backgroundColor = 'blue';
	// div.style.height = '150px';
	// div.style.position = 'fixed';
	// div.style.top = 0;
	// div.style.right = 0;
	div.textContent = 'Injected!';
	var target = document.getElementsByClassName("bucketDivider");
	console.log(target);
	// document.body.appendChild(div);
	target[0].parentElement.prepend(div);

	alert('inserted self... giggity');

})();