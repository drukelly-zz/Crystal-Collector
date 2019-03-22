$(function(){

  // Variables (Game Settings)
  let displayedScore;
  const min = 23;
  const max = 86;
  const gems = ["aqua", "blue", "emerald", "orange", "purple", "red"];

  // Functions
  // Shuffle color array
  // Based on the Fisher-Yates shuffle algorithm
  // https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
  const shuffle = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    // Need to convert output into an actual array
    Array.from(array);
    return array;
  }
  const buildGems = (array, min, max) => {
    // Shuffle per call of the function
    shuffle(array);
    let randomPoints = [];
    let difference = Math.round(max - min);
    difference = Math.round(difference/gems.length);
    /*
      The display score will pick an integer
      from 23 - 86. The difference of that is 63.
      When divided by gems.length, the result is 10.5.
      
      Assign a random number from 1 to 11.
      Then distribute random points to each gem blindly

      Note: Will tweak the point distribution after
      testing gameplay
    */
   for (let i = 0; i < gems.length; i++) {
     let points = randomInt(1, difference);
     randomPoints.push(points);
   }
   for (let j = 0; j < randomPoints.length; j++) {
      let template = `
        <li class="gem-container col-4 d-flex flex-column justify-content-center my-5 text-center">
          <a href="#" class="gem" data-hp=${randomPoints[j]}>
            <img src="assets/images/${array[j]}.svg">
          </a>
        </li>`;
      $("#gems").append(template);
    }
  }
  const randomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  // Display Score
  displayedScore = randomInt(min, max);
  $("#randomScore").text(displayedScore);

  // Call Functions
  buildGems(gems, min, max);

  // Click Handler
  $(".gem").on("click", (event) => {
    event.preventDefault();
    console.log(event.currentTarget.dataset.hp);
  });
});