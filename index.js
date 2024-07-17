function fetchFilms() {
  // Fetch films data from the API endpoint
  fetch('https://api.npoint.io/0b2aef194151f5771a43/films/')
    .then(res => {
      // Check if the response is successful (status code 200)
      if (res.ok) {
        // Parse the response body as JSON and return the data
        return res.json();
      } else {
        // If response is not successful, throw an error
        throw new Error('Unable to fetch film data');
      }
    })
    .then(data => {
      // If successful, render the films data
      renderFilms(data);
    })
    .catch(error => {
      // Catch any errors that occur during fetching or rendering
      console.log(error);
      renderErrorMessage();
    });
}

function renderFilms(data) {
  // Get references to DOM elements where films will be rendered
  const div = document.getElementById('card');
  const ul = document.getElementById('films');

  // Iterate through each movie in the data array
  data.forEach(movie => {
    // Create a list item for each movie title
    const li = document.createElement('li');
    li.classList.add('pointer', 'bold-italic-text');
    li.innerHTML = movie.title;

    // Create a film card with detailed movie information
    const filmCard = document.createElement("div");
    filmCard.classList.add('film-card');
    filmCard.innerHTML = `
      <img src="${movie.poster}" height="500px" width="300px"/>
      <h2 class="bold-text">${movie.title}</h2>
      <p class="bold-text">${movie.description}</p>
      <p class="highlight bold-text">Made by ABDALLA</p>
      <p><span class="highlight bold-text">Runtime: ${movie.runtime}</span></p>
      <p><span class="highlight bold-text">Showtime: ${movie.showtime}</span></p>
      <p class="bold-italic-text">Available tickets: ${(movie.capacity) - (movie.tickets_sold)}</p>
      <button class="buy-button">Buy ticket</button>
    `;

    // Add click event listener to each list item
    li.addEventListener('click', () => {
      // Clear existing content in div#card and display filmCard
      div.innerHTML = "";
      div.appendChild(filmCard);
      if (!filmCard.classList.contains('active')) {
        filmCard.classList.add('active');
        div.appendChild(filmCard);
      }
    });

    // Append each list item to the films list (ul#films)
    ul.appendChild(li);
  });
}

function renderErrorMessage() {
  // Display an error message if fetching or rendering films fails
  const div = document.getElementById('card');
  div.innerText = "Unable to fetch film data. Please try again later.";
}

// Initialize the process by fetching films when the script loads
fetchFilms();
