const apiKey = "ejiQdEnDapCsfuCg97zET8hR7ZbgEr7B";
let offset = 0;
let isLoading = false;

// Function to fetch GIFs from the GIPHY API
function fetchGIFs(searchQuery) {
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchQuery}&offset=${offset}`;

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      offset += data.data.length;
      return data.data;
    });
}

// Function to display the fetched GIFs in the GIF container
function displayGIFs(gifs) {
  const gifContainer = document.getElementById("gifContainer");
  gifs.forEach(gif => {
    const gifImage = document.createElement("img");
    gifImage.src = gif.images.fixed_height.url;
    gifContainer.appendChild(gifImage);
  });
}

// Function to handle the search for GIFs
function searchGIFs() {
  const searchQuery = document.getElementById("searchInput").value.trim();
  if (!searchQuery) return; // Exit if search query is empty

  offset = 0; // Reset offset for new search
  isLoading = true;
  const gifContainer = document.getElementById("gifContainer");
  gifContainer.innerHTML = ""; // Clear previous search results.

  fetchGIFs(searchQuery)
    .then(gifs => {
      displayGIFs(gifs);
      isLoading = false;
    })
    .catch(error => {
      console.error(error);
      isLoading = false;
    });
}

// Keypress event listener on the search input field
document.getElementById("searchInput").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    searchGIFs();
  }
});

// Scroll event listener.
window.addEventListener("scroll", function() {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight && !isLoading) {
    isLoading = true;
    searchGIFs();
  }
});

// Click event listener on the search button
document.getElementById("searchButton").addEventListener("click", function() {
  searchGIFs();
});
