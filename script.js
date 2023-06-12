var offset = 0; // Variable to track the offset for retrieving new GIFs.
var isLoading = false; // Variable to track if data is currently being loaded.

function searchGIFs() {
  var searchQuery = document.getElementById("searchInput").value;
  var apiKey = "ejiQdEnDapCsfuCg97zET8hR7ZbgEr7B";
  var url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchQuery}&offset=${offset}`;

  var gifContainer = document.getElementById("gifContainer");

  if (offset === 0) {
    gifContainer.innerHTML = ""; // Clear previous search results only when starting a new search.
  }

  fetch(url)
    .then(response => response.json())
    .then(data => {
      data.data.forEach(gif => {
        var gifImage = document.createElement("img");
        gifImage.src = gif.images.fixed_height.url;
        gifContainer.appendChild(gifImage);
      });

      offset += data.data.length; // Increase the offset by the number of retrieved GIFs.
      isLoading = false; // Reset isLoading flag.
    })
    .catch(error => console.log(error));
}

// Keypress event listener on the search input field
document.getElementById("searchInput").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    offset = 0; // Reset the offset when performing a new search.
    searchGIFs(); // Call the searchGIFs function on pressing the Enter key.
    event.preventDefault(); // Prevent the default form behavior.
  }
});

// Scroll event listener.
window.addEventListener("scroll", function () {
  // Check if scrolled to the bottom of the page and data is not currently being loaded.
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight && !isLoading) {
    isLoading = true; // Set the isLoading flag to true to prevent multiple requests at the same time.
    searchGIFs(); // Call the searchGIFs function when scrolled to the bottom of the page.
  }
});

// Click event listener on the search button
document.getElementById("searchButton").addEventListener("click", function () {
  offset = 0; // Reset the offset when performing a new search.
  var gifContainer = document.getElementById("gifContainer");
  gifContainer.innerHTML = "";
  searchGIFs(); // Call the searchGIFs function on clicking the search button.
});
