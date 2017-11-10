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
					<div class="${n.replace(/\s/g,'')}">

					</div>
					<div class="row justify-content-end">
						<button class="searchButton btn btn-primary justify-content-end" prodId="${n.replace(/\s/g,'')}">Search</button>
						<button class="deleteButton btn btn-primary justify-content-end" prodId="${n.replace(/\s/g,'')}">Remove</button>
					</div>
				</div>
			</div>
		`);

		temp.data("id", n.id);

		$('#listHolder').append(temp);
	});

	$('.deleteButton').on("click", delProduct);
	$('.searchButton').on("click", searchRecall);
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
    function(resp){
      console.log("delProduct Ran: ", resp);
      location.reload();
    }
  )
}

function searchRecall(e){
	$.ajax({
    method: "GET",
    url: `https://www.saferproducts.gov/RestWebServices/Recall?ProductName=${e.target.getAttribute("prodId")}&Format=json`
  }).done(
    function(resp){
      console.log("searchRecall Ran: ", resp);
      // console.log("ASDasd: ", e.target.getAttribute("prodId"));
      $(`.${e.target.getAttribute("prodId")}`).empty();
      	console.log('resp.length: ', resp.length);
	      if (resp.length > 0) {
		      resp.map((n) => {
		      	$(`.${e.target.getAttribute("prodId")}`).append(`
							<div>
								<p>${n.Description}</p>
								<a href="${n.URL}" target="_blank">Link</a>
							</div>
		      	`);
		      })
		    }
		    else {
		    	console.log('e.target.getAttribute("prodId")', e.target.getAttribute("prodId"));
		    	$(`.${e.target.getAttribute("prodId")}`).append(`
						<div>
							<p>No results found.</p>
						</div>
		     `);
		    }
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
		// currUser = {
		// 	"recallUser": "5a0472af0d8e040012f06317"
		// };
		currUser = items;
		getWatchLi(currUser);
	});
	// window.setTimeout(function(){console.log(currUser)},3000);
	$('#watchList').on("click", getWatchLi);
	$('#userOptions').on("click", renderUserSet);
});