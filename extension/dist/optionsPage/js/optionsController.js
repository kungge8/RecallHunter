// var dummyList = [{
// 	id: "1",
// 	name: "prod1",
// 	desc: "a foot"
// },{
// 	id: "2",
// 	name: "prod2",
// 	desc: "a leg"
// },{
// 	id: "3",
// 	name: "prod3",
// 	desc: "I'm not really sure what this is..."
// }]

var dummyList = [];

var currUser = {};

//Get User
function getUser(){
	return new Promise(function(res, rej){
		chrome.storage.sync.get("recallUser", function(items){
			if(!chrome.runtime.error){
				// console.log("getUser: ", items);
				res(items);
			} else {
				rej();
			}
		});
	});
}

//render wishlist
function renderList(prodArr){
	$('#listHolder').empty();
	prodArr.map(function (n){
		let temp = $(`
			<div class="card">
				<div class="card-header">
					<h3 class="card-title">${n}</h3>
				</div>
				<div class="card-body">
					<p class="card-text">${n}</p>
					<div class="row justify-content-end">
						<button class="deleteButton btn btn-primary justify-content-end" prodId="${n}">Remove</button>
					</div>
				</div>
			</div>
		`);

		temp.data("id", n.id);

		$('#listHolder').append(temp);
	});

	$('.deleteButton').on("click", delProduct);
}

//Query DB for user's wishlist
function getWatchLi(user){
	console.log("getASDad: ", currUser.recallUser);
	$.ajax({
        method: "POST",
        url: "https://shielded-retreat-77848.herokuapp.com/api/watchlists",
        data: {
          _id: currUser.recallUser
        }
      }).done(
        function(res){
        	dummyList = res.watchlist;
          console.log("getWatchLi Ran: ", res);
          renderList(dummyList);
        }
      )
}

//Query DB to remove product from user's wishlist
function delProduct(user){
	console.log("delete ran: " + $(this).attr("prodId"));

	$.ajax({
        method: "POST",
        url: "https://shielded-retreat-77848.herokuapp.com/api/watchlists-delete",
        data: {
          _id: currUser.recallUser,
          product: $(this).attr("prodId")
        }
      }).done(
        function(res){
          console.log("delProduct Ran: ", res);
        }
      )
}

function renderUserSet(user){
	$('#listHolder').empty();
}

function renderCreateAccount(){
	$('#listHolder').empty();
}

$('document').ready(function(){
	renderList(dummyList);
	let p = getUser();
	p.then(function (items){
		console.log('document ready: ', items)
		currUser = {
			"recallUser": "5a0472af0d8e040012f06317"
		};
		getWatchLi(currUser);
	});
	// window.setTimeout(function(){console.log(currUser)},3000);
	$('#watchList').on("click", getWatchLi);
	$('#userOptions').on("click", renderUserSet);
});