class Movie {
    constructor(title, genre, rating){
        this.title = title;
        this.genre = genre;
        this.rating = rating;
    }
}
class UXActions {
    constructDiv(movie){
        const columnDiv = createDivElement();
        const cardBodyDiv = createDivElement();
        const textOverDiv = createDivElement();
        const footerDiv = createDivElement();
        const img = document.createElement("img");
        const row = document.getElementById("moviesAppend");
        columnDiv.className = "col-md-6 col-lg-4 col-xl-3 img-display mb-3";
        cardBodyDiv.className = "card-body p-0 text-center";
        img.className = "img-fluid";
        textOverDiv.className = "text-over text-white";
        textOverDiv.innerHTML = `${movie.rating} <br> ${movie.genre}`;        
        img.setAttribute("src", "https://images.unsplash.com/photo-1536895878856-6738f6d20051?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80");
        footerDiv.className = "card-footer d-flex justify-content-between";
        footerDiv.innerHTML = `${movie.title} <button class="btn btn-link"><i class="fas fa-trash"></i></button>`;
        row.appendChild(columnDiv);
        columnDiv.appendChild(cardBodyDiv);
        columnDiv.appendChild(footerDiv);
        cardBodyDiv.appendChild(textOverDiv);
        cardBodyDiv.appendChild(img);
    }
    removeDiv(target){
        target.remove();
    }
    clearFields(){
        document.getElementById("title").value = "";
        document.getElementById("genre").value = "";
        document.getElementById("rating").value = "";
    }
    checkStorage(){
        let moviesArr;
        if(localStorage.getItem("movies") === null){
            moviesArr = [];
        } else {
            moviesArr = JSON.parse(localStorage.getItem("movies"));
        }
        return moviesArr;
    }
    storeMovie(movie){
        const uxAction = new UXActions();
        let moviesArr = uxAction.checkStorage();
        moviesArr.push(movie);
        localStorage.setItem("movies", JSON.stringify(moviesArr));
    }
    removeMovie(target){
        const uxAction = new UXActions();
        let moviesArr = uxAction.checkStorage();
        moviesArr.forEach(function(movieObj, index){
            if(movieObj.title === target){
                moviesArr.splice(index, 1);
            }
            localStorage.setItem("movies", JSON.stringify(moviesArr));
        });
    }
    displayMovies(){
        const uxAction = new UXActions();
        let moviesArr = uxAction.checkStorage();
        moviesArr.forEach(function(movieObj){
            uxAction.constructDiv(movieObj);
        });
    }
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