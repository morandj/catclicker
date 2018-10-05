let pics = document.getElementById("pics");
let clicks = document.getElementById("clicks");
let cat = document.getElementById("cat");
let cats = [
  {
    name: "aaaa",
    img: "cat0.jpg"
  },
  {
    name: "bbbb",
    img: "cat1.jpg"
  }
];

cats.map(function(cat) {
  insertCat(cat);
});

function insertCat(cat) {
  let catPic = document.createElement("div");
  let image = document.createElement("img");
  let catName = document.createElement("div");
  let catCount = document.createElement("div");
  catCount.textContent = 0;
  let counter = 0;
  image.src = cat.img;
  // image.width = 200;
  image.addEventListener(
    "click",
    function() {
      counter += 1;
      catCount.textContent = counter;
    },
    false
  );
  catName.textContent = cat.name;
  catName.className = "name";
  catPic.appendChild(image);
  catPic.appendChild(catName);
  catPic.appendChild(catCount);
  pics.appendChild(catPic);
}
