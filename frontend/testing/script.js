$(window).on("load", function() {

    var $landingWrapper = $(".landing-wrapper"),
        $landingInnerContent = $(".container");
  
    // set initial container to half of .landing-inner-content width
    //TweenMax.set($landingWrapper, {scrollTo: {x: $landingInnerContent.width()/4}, ease: Power2.easeOut});
    
    // scroll left and right
    $landingInnerContent.on("mousemove touchmove", function(e) {
      if (e.clientX > $landingWrapper.width() / 2) {
        TweenMax.to($landingWrapper, 2, {
          scrollTo: {
            x: "+=175"
          },
          ease: Power2.easeOut
        });
      } else {
        TweenMax.to($landingWrapper, 2, {
          scrollTo: {
            x: "-=175"
          },
          ease: Power2.easeOut
        });
      }
    });
  
  });
  fetch("http://localhost:5000/popular")
  .then(response => response.json())
  .then(data => {
    images = data; // Store fetched images
  })
  .catch(error => console.error("Error fetching images:", error));
  let images = []; // Store images from the database
  let currentIndex = 0; 
document.querySelector(".container").addEventListener("click", function(event) {
  if (event.target.closest(".card")) {
    if (currentIndex < images.length) {
      let newCard = document.createElement("div");
      newCard.classList.add("card");

      let newImg = document.createElement("img");
      newImg.src = images[currentIndex]; // Get the next image
      newImg.alt = "Movie Poster";

      newCard.appendChild(newImg);
      document.querySelector(".container").appendChild(newCard);

      currentIndex++; // Move to the next image
    } else {
      console.log("No more images available");
    }
  }
});