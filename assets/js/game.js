$(function(){

  // Variables
  let displayedScore;
  const gems = ["aqua", "blue", "emerald", "orange", "purple", "red"];

  // Functions
  const generateGems = (array) => {
    for (let i = 0; i < array.length; i++) {
      let template = `
        <li class="gem-container col-4 d-flex flex-column justify-content-center my-5 text-center">
          <a href="#" class="gem" data-score=1>
            <img src="assets/images/${array[i]}.svg">
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
  const randomPoints = () => {

  }

  // Display Score
  displayedScore = randomInt(23, 86);
  $("#randomScore").text(displayedScore);

  // Call Functions
  generateGems(gems);

  $(".gem").on("click", (event) => {
    event.preventDefault();
    console.log(event.currentTarget.dataset.score);
  });
});