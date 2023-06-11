function searchGIFs() {
  var searchQuery = document.getElementById("searchInput").value;
  var apiKey = "ejiQdEnDapCsfuCg97zET8hR7ZbgEr7B";
  var url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchQuery}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      var gifContainer = document.getElementById("gifContainer");
      gifContainer.innerHTML = "";

      data.data.forEach(gif => {
        var gifImage = document.createElement("img");
        gifImage.src = gif.images.fixed_height.url;
        gifContainer.appendChild(gifImage);
      });
    })
    .catch(error => console.log(error));
}
