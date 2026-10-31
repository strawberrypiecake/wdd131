const steps = ["one", "two", "three"];
function listTemplate(step) {
  return '<li>${step}</li>'; 
}
const stepsHtml = steps.map(listTemplate); // use map to convert the list from strings to HTML
document.querySelector("#myList").innerHTML = stepshtml.join("");// set the innerHTML

const grades = ["A", "B", "C"];

function convertToPoints(grades) {
  switch(grades) {
    case "A":
      return 4;
    case "B":
      return 3;
    case "C": 
      return 2;
    default: 
      return 0;

  }
}
const gpaPoints = grades.map(convertToPoints); 
console.log(gpaPoints);

const fruit = ['watermelon', 'peach', 'apple', 'tomato', 'grape']

function testLength(item) {
  if(item.length < 6) {
    return true;
  } else return false;

  // return item.length < 6 ? true : false;
}
const shortFruit = fruit.filter(testLength);