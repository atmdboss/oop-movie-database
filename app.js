//
//PROTOTYPES
//
function Movie(title, genre, rating){
    this.title = title;
    this.genre = genre;
    this.rating = rating;
}
function UXActions(){}//ALL ACTIONS PERTAINING TO THE USER EXPERIENCE(HENCE UX PREFIX)
UXActions.prototype.constructDiv = function(movie){
    let divContainer = 
        `<div class="col-md-6 col-lg-4 col-xl-3 img-display">
            <div class="card-body p-0 text-center">
                <div class="text-over text-white">${movie.rating} <br> ${movie.genre}</div>
                <img class="img-fluid" src="https://images.unsplash.com/photo-1536895878856-6738f6d20051?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80">
                <div class="card-footer d-flex justify-content-between">${movie.title} <button class="btn btn-link"><i class="fas fa-trash"></i></button></div>
            </div>
        </div>`;
        const row = document.getElementById("moviesAppend");
        row.innerHTML += divContainer;
}
UXActions.prototype.removeDiv = function(target){
    target.remove();
}
UXActions.prototype.clearFields = function(){
    document.getElementById("title").value = "";
    document.getElementById("genre").value = "";
    document.getElementById("rating").value = "";
}
UXActions.prototype.checkStorage = function(){
    let moviesArr;
    if(localStorage.getItem("movies") === null){
        moviesArr = [];
    } else {
        moviesArr = JSON.parse(localStorage.getItem("movies"));
    }
    return moviesArr;
}
UXActions.prototype.storeMovie = function(movie){
    const uxAction = new UXActions();
    let moviesArr = uxAction.checkStorage();
    moviesArr.push(movie);
    localStorage.setItem("movies", JSON.stringify(moviesArr));
}
UXActions.prototype.displayMovies = function(){
    const uxAction = new UXActions();
    let moviesArr = uxAction.checkStorage();
    moviesArr.forEach(function(movieObj){
        uxAction.constructDiv(movieObj);
    })
}
UXActions.prototype.removeMovie = function(target){
    const uxAction = new UXActions();
    let moviesArr = uxAction.checkStorage();
    moviesArr.forEach(function(movieObj, index){
        if(movieObj.title === target){
            moviesArr.splice(index, 1);
        }
        localStorage.setItem("movies", JSON.stringify(moviesArr));
    });
}
//
//EVENT LISTENERS
//
document.querySelector("form").addEventListener("submit", function(e){
    e.preventDefault();
    const title = document.getElementById("title").value,
          genre = document.getElementById("genre").value,
          rating = document.getElementById("rating").value;
    const uxAction = new UXActions();
    const newMovie = new Movie(title, genre, rating);
    if(title === "" || genre === "" || rating === ""){
        alert("input something")
    } else {
        uxAction.constructDiv(newMovie);
        uxAction.clearFields();
        uxAction.storeMovie(newMovie);
    }

});
document.addEventListener("click", function(e){
    if(e.target.className === "fas fa-trash"){
        // e.target.parentElement.preventDefault();
        const uxAction = new UXActions();
        uxAction.removeDiv(e.target.parentElement.parentElement.parentElement);
        uxAction.removeMovie(e.target.parentElement.parentElement.textContent.trim());
    }
});
document.addEventListener("DOMContentLoaded", function(){
    const uxAction = new UXActions();
    uxAction.displayMovies();
});
function createDivElement(){
    return document.createElement("div");
}