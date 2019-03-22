$(function(){

  // Variables (Game Settings)
  let displayedScore, losses, wins;
  const min = 12;
  const max = 86;
  const gems = ["aqua", "blue", "emerald", "orange", "purple", "red"];

  // Helper Functions
  // Randomize Integers with inclusive scope
  const randomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  // Shuffle Array
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

  // Game Functions
  const buildGems = (array, min, max) => {
    // Shuffle per call of the function
    shuffle(array);
    let randomPoints = [];
    let difference = Math.round(max - min);
    difference = Math.round(difference/gems.length);
    /*
      The display score will pick an integer
      from const `min` - `max`. The difference
      will be divided by the gems.length
      
      Then distribute random points to each gem blindly

      Note: Will tweak the point distribution after
      testing gameplay
    */
    // Build points array 
    for (let i = 0; i < gems.length; i++) {
      let points = randomInt(1, difference);
      randomPoints.push(points);
    }
    //  Build gems template
    for (let j = 0; j < randomPoints.length; j++) {
      let template = `
          <li class="gem-container col-4 d-flex flex-column justify-content-center my-5 text-center">
            <a href="#" class="gem" data-hp=${randomPoints[j]}>
              <img src="assets/images/${array[j]}.svg">
              <span class="badge badge-pill badge-danger">– ${randomPoints[j]}</span>
            </a>
          </li>`;
      $("#gems").append(template);
    }
  }
  // Update Score
  const updateScore = (hp) => {
    displayedScore = displayedScore - hp;
    $("#randomScore").text(displayedScore);
  }

  // Display Score
  displayedScore = randomInt(min, max);
  $("#randomScore").text(displayedScore);

  // Call Functions
  buildGems(gems, min, max);

  // Click Handler
  $(".gem").on("click", (event) => {
    event.preventDefault();
    $(event.currentTarget).addClass("active");
    setTimeout(() => {
      $(event.currentTarget).removeClass("active");
    }, 501);
    let hp = event.currentTarget.dataset.hp;
    updateScore(hp);
    console.log(hp);
  });
  
});