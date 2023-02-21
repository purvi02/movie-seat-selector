const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value;
// quey selector helps to take the class or id from the ui. see in selected seats, it gets updated when we interact with ui


container.addEventListener('click', function(e){
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');
    }
    // console.log(e.target);
    updateSelectedCount();
});

// movie select event, not a click but a change event because it is a select list
movieSelect.addEventListener('change', (e) => {
    ticketPrice = +e.target.value;
    updateSelectedCount();

    // localStorage
    setMovieData(e.target.selectedIndex, e.target.value);
})

// now update the #selected seats and price
function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedCount = selectedSeats.length;
    count.innerText = selectedCount;
    total.innerText = selectedCount * ticketPrice;



    // ***** right now we dont know which seats were selected as in no indexing and on refresh it goes away
    // if we want to save it, we need to know the mapping of seats
    // selected seats has the element not the index location
    // copy selected seats in array, map through array and return a new array having indexes
    // USE SPREAD OPERATOR - spread operator concatenates they value to given array and returns array

    const seatIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    localStorage.setItem('selectedSeats', JSON.stringify(seatIndex));

    // BUT NOW AGAIN ON RELAOD, THE SELECTED SEAT WOULD GO. WE WANT TO SHOW THE SELECTED DATA ON UI - handled in movie select
}


// save selected movie index and price
function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// get data from localstorage and populate ui
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    console.log(selectedSeats);

    if(selectedSeats !==null && selectedSeats.length > 0){
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// initial count and total set else on reload the total and total price gets set back to 0
updateSelectedCount();

