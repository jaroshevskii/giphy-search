var offset = 0; // Variable to track the offset for retrieving new GIFs.

function searchGIFs() {
  var searchQuery = document.getElementById("searchInput").value;
  var apiKey = "ejiQdEnDapCsfuCg97zET8hR7ZbgEr7B";
  var url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchQuery}&offset=${offset}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      var gifContainer = document.getElementById("gifContainer");

      data.data.forEach(gif => {
        var gifImage = document.createElement("img");
        gifImage.src = gif.images.fixed_height.url;
        gifContainer.appendChild(gifImage);
      });

      offset += data.data.length; // Increase the offset by the number of retrieved GIFs.
    })
    .catch(error => console.log(error));
}

// Scroll event listener.
window.addEventListener('scroll', function() {
  // Check if scrolled to the bottom of the page.
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    searchGIFs(); // Call the searchGIFs function when scrolled to the bottom of the page.
  }
});
