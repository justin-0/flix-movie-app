// Tells us what page we are on so we can run specific tasks for that path only
const state = {
  currentPage: window.location.pathname,
  search: {
    term: '',
    type: '',
    page: 1,
    totalPages: 1,
    totalResults: 0,
  },
  api: {
    apiKey: 'cab1ed21ea8769f5477ba7f9c6271b4d',
    apiUrl: 'https://api.themoviedb.org/3/',
  },
};

// Show popular movies
async function displayPopularMovies() {
  // It returns an object called results, destructure to return array of objects
  const { results } = await getAPIData('/movie/popular');
  results.map((movie) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <a href="movie-details.html?id=${movie.id}">
    ${
      /* Ternary - show movie poster if available otherwise show no image jpeg */ ''
    }
      ${
        movie.poster_path
          ? `<img
      src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
      class="card-img-top"
      alt="${movie.title}"
    />`
          : `<img
            src="images/no-image.jpg"
            class="card-img-top"
            alt="${movie.title}"
          />`
      }
    </a>
    <div class="card-body">
      <h5 class="card-title">${movie.title}</h5>
      <p class="card-text">
        <small class="text-muted">Release: ${movie.release_date}</small>
      </p>
    </div>`;
    document.querySelector('#popular-movies').appendChild(div);
  });
}

// Display Movie Details based on ID
async function displayMovieDetails() {
  // Split at equals sign from url to get just the ID
  const movieID = window.location.search.split('=')[1];
  const movie = await getAPIData(`/movie/${movieID}`);
  console.log(movie);

  const parent = document.querySelector('#movie-details');

  parent.innerHTML = `<div class="details-top">
    <div>
    ${
      movie.poster_path
        ? `<img
    src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
    class="card-img-top"
    alt="${movie.title}"
  />`
        : `<img
          src="images/no-image.jpg"
          class="card-img-top"
          alt="${movie.title}"
        />`
    }
    </div>
    <div>
      <h2>${movie.title}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${Number(movie.vote_average).toFixed(2)} / 10
      </p>
      <p class="text-muted">Release Date: ${movie.release_date}</p>
      <p>
        ${movie.overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
       ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
      </ul>
      <a href="${
        movie.homepage
      }" target="_blank" class="btn">Visit Movie Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Movie Info</h2>
    <ul>
      <li><span class="text-secondary">Budget:</span> $${Number(
        movie.budget
      ).toLocaleString()}</li>
      <li><span class="text-secondary">Revenue:</span> $${Number(
        movie.revenue
      ).toLocaleString()}</li>
      <li><span class="text-secondary">Runtime:</span> ${
        movie.runtime
      } minutes</li>
      <li><span class="text-secondary">Status:</span> ${movie.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">${movie.production_companies
      .map((company) => `<span>${company.name}</span>`)
      .join('')}
    </div>
  </div>`;
  displayBackgroundImage('movie', movie.backdrop_path);
}

async function displayShowDetails() {
  // Split at equals sign from url to get just the ID
  const showID = window.location.search.split('=')[1];
  const show = await getAPIData(`/tv/${showID}`);
  console.log(show);

  const parent = document.querySelector('#show-details');

  parent.innerHTML = `<div class="details-top">
  <div>
  ${
    show.poster_path
      ? `
  <img
    src="https://image.tmdb.org/t/p/w500${show.poster_path}"
    class="card-img-top"
    alt="Show Name"
  />`
      : `
  <img
    src="images/no-image.jpg"
    class="card-img-top"
    alt="Show Name"
  />`
  }
  </div>
  <div>
    <h2>Show Name</h2>
    <p>
      <i class="fas fa-star text-primary"></i>
      ${show.vote_average.toFixed(2)} / 10
    </p>
    <p class="text-muted">Release Date: ${show.first_air_date}</p>
    <p>
      ${show.overview}
    </p>
    <h5>Genres</h5>
    <ul class="list-group">
      ${show.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
    </ul>
    <a href="${
      show.homepage
    }" target="_blank" class="btn">Visit Show Homepage</a>
  </div>
</div>
<div class="details-bottom">
  <h2>Show Info</h2>
  <ul>
    <li><span class="text-secondary">Number Of Episodes:</span> ${
      show.number_of_episodes
    }</li>
    <li>
      <span class="text-secondary">Last Episode To Air:</span> ${
        show.last_episode_to_air.name
      }
    </li>
    <li><span class="text-secondary">Status:</span> ${show.status}</li>
  </ul>
  <h4>Production Companies</h4>
  <div class="list-group">${show.production_companies
    .map((company) => `<span>${company.name}</span>`)
    .join('')}</div>
</div>
</div>
</section>

<!-- Footer -->
<footer class="main-footer">
<div class="container">
<div class="logo"><span>FLIXX</span></div>
<div class="social-links">
  <a href="https://www.facebook.com" target="_blank"
    ><i class="fab fa-facebook-f"></i
  ></a>
  <a href="https://www.twitter.com" target="_blank"
    ><i class="fab fa-twitter"></i
  ></a>
  <a href="https://www.instagram.com" target="_blank"
    ><i class="fab fa-instagram"></i
  ></a>
</div>`;
  displayBackgroundImage('show', show.backdrop_path);
}

// Display backdrop of image on details page movie/tv
function displayBackgroundImage(type, imagePath) {
  const overlayDiv = document.createElement('div');
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${imagePath})`;
  overlayDiv.style.backgroundSize = 'cover';
  overlayDiv.style.backgroundPosition = 'center';
  overlayDiv.style.backgroundRepeat = 'no-repeat';
  overlayDiv.style.height = '100vh';
  overlayDiv.style.width = '100vw';
  overlayDiv.style.position = 'absolute';
  overlayDiv.style.top = '0';
  overlayDiv.style.left = '0';
  overlayDiv.style.zIndex = '-1';
  overlayDiv.style.opacity = '0.1';

  if (type === 'movie') {
    document.querySelector('#movie-details').appendChild(overlayDiv);
  } else {
    document.querySelector('#show-details').appendChild(overlayDiv);
  }
}

// Fetch data from API using our search term
async function search() {
  // Grab query string from submit
  const queryString = window.location.search;
  // use url object to use methods on query
  const urlParams = new URLSearchParams(queryString);
  // use get method to get values for term and type
  state.search.type = urlParams.get('type');
  state.search.term = urlParams.get('search-term');
  // If term isn't empty and null
  if (state.search.term !== '' && state.search.term != null) {
    // Display results
    const { results, total_pages, page, total_results } = await searchAPIData();
    console.log(results);
    state.search.page = page;
    state.search.totalPages = total_pages;
    state.search.totalResults = total_results;

    results.map((result) => {
      // Create div
      const div = document.createElement('div');
      // Add card class
      div.classList.add('card');
      // Amend HTML
      div.innerHTML = ` <a href=${
        state.search.type === 'movie'
          ? `movie-details.html?id=${result.id}`
          : `tv-details.html?id=${result.id}`
      }>
      ${
        result.poster_path
          ? `
      <img
        src="https://image.tmdb.org/t/p/w500${result.poster_path}"
        class="card-img-top"
        alt="Show Name"
      />`
          : `
      <img
        src="images/no-image.jpg"
        class="card-img-top"
        alt="Show Name"
      />`
      }
    </a>
    <div class="card-body">
      ${
        result.title
          ? `<h5 class="card-title">${result.title}</h5>`
          : `
          <h5 class="card-title">${result.name}</h5>
        `
      }
      <p class="card-text">
      ${
        result.release_date
          ? `<small class="text-muted">Release: ${result.release_date}</small>`
          : `<small class="text-muted">Release: ${result.first_air_date}</small>`
      }
      </p>
    </div>`;

      document.querySelector('#search-results-heading').innerHTML = `
        <h2>${results.length} of ${state.search.totalResults} Results for ${state.search.term}</h2>
      `;
      document.querySelector('#search-results').appendChild(div);
    });
  } else {
    // Show alert
    showAlert('Please enter a movie or show to search');
  }
  displayPagination();
}

// Create and display pagination for search
function displayPagination() {
  const div = document.createElement('div');
  div.classList.add('pagination');
  div.innerHTML = `<button class="btn btn-primary" id="prev">Prev</button>
  <button class="btn btn-primary" id="next">Next</button>
  <div class="page-counter">Page ${state.search.page} of ${state.search.totalPages}</div>`;
  document.querySelector('#pagination').appendChild(div);
  // Disable prev on first page
  if (state.search.page === 1) {
    document.querySelector('#prev').style.display = 'none';
  }
  // Disable next on last page
  if (state.search.page === state.search.totalPages) {
    document.querySelector('#next').style.display = 'none';
  }
  // Next page
  // const nextBtn = document.querySelector('#next');
  // nextBtn.addEventListener('click', async () => {
  //   state.search.page++;
  //   const { results, total_pages } = await search();
  // });
}

// Function to add swiper library functionality
async function displaySlider() {
  const { results } = await getAPIData('movie/now_playing');
  console.log(results);
  results.map((movie) => {
    const div = document.createElement('div');
    div.classList.add('swiper-slide');
    div.innerHTML = `<a href="movie-details.html?id=${movie.id}">
                 <img src="https://image.tmdb.org/t/p/w500${
                   movie.poster_path
                 }" alt="${movie.name}" />
               </a>
               <h4 class="swiper-rating">
                 <i class="fas fa-star text-secondary"></i> ${movie.vote_average.toFixed()} / 10
               </h4>`;
    document.querySelector('.swiper-wrapper').appendChild(div);
  });
  startSwiper();
}

function startSwiper() {
  const swiper = new Swiper('.swiper', {
    sliderPerView: 1,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 1500,
    },
    breakpoints: {
      // when window width is >= 500px
      500: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      // when window width is >= 480px
      700: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      // when window width is >= 640px
      1000: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1400: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
  });
}

// Display popular tv shows
async function displayPopularShows() {
  const { results } = await getAPIData('/tv/top_rated');
  console.log(results);
  results
    .map((show) => {
      const div = document.createElement('div');
      div.classList.add('card');
      div.innerHTML = `<a href="tv-details.html?id=${show.id}">
      ${
        show.poster_path
          ? `<img
      src="https://image.tmdb.org/t/p/w500${show.poster_path}"
      class="card-img-top"
      alt="${show.name}"
    />`
          : `<img
    src="../images/no-image.jpg"
    class="card-img-top"
    alt="${show.name}"
  />`
      }

  </a>
  <div class="card-body">
    <h5 class="card-title">${show.name}</h5>
    <p class="card-text">
      <small class="text-muted">Aired: ${show.first_air_date}</small>
    </p>
  </div>`;
      document.querySelector('#popular-shows').appendChild(div);
    })
    .join('');
}

// Fetch Data from TMDB API
async function getAPIData(endpoint) {
  const API_KEY = state.api.apiKey;
  const API_URL = state.api.apiUrl;
  showSpinner();
  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );

  const data = await response.json();
  hideSpinner();
  return data;
}

// Make request and fetch data from search query
async function searchAPIData() {
  const API_KEY = state.api.apiKey;
  const API_URL = state.api.apiUrl;
  showSpinner();
  const response = await fetch(
    `${API_URL}search/${state.search.type}?api_key=${API_KEY}&language=en-US&query=${state.search.term}`
  );

  const data = await response.json();
  hideSpinner();
  return data;
}

function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}
function hideSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

// Highlight active link
function hightlightActiveLink() {
  const links = document.querySelectorAll('.nav-link');
  links.forEach((link) => {
    // If link href equals current page add the style
    if (link.getAttribute('href') === state.currentPage) {
      link.classList.add('active');
    }
  });
}

// Show Alert
function showAlert(message, className) {
  const alertEl = document.createElement('div');
  alertEl.classList.add('alert', className);
  alertEl.appendChild(document.createTextNode(message));
  document.querySelector('#alert').appendChild(alertEl);

  setTimeout(() => {
    alertEl.remove();
  }, 2500);
}

// Initialise App
function init() {
  // Run check for page currently loaded
  // Then run function for that case
  switch (state.currentPage) {
    case '/':
    case '/index.html':
      // Run functions when on home page only
      displayPopularMovies();
      displaySlider();
      break;
    case '/movie-details.html':
      displayMovieDetails();
      console.log('Movie Details');
      break;
    case '/shows.html':
      displayPopularShows();
      console.log('TV Shows');
      break;
    case '/tv-details.html':
      displayShowDetails();
      console.log('TV Details');
      break;
    case '/search.html':
      search();
      console.log('Search');
      break;
    default:
      console.log('Not Found');
      break;
  }
  hightlightActiveLink();
}

init();
