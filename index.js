let pics = document.getElementById("pics");
let cats = [
  {
    name: "aaaa",
    img: "cat0.jpg",
    count: 0
  },
  {
    name: "bbbb",
    img: "cat1.jpg",
    count: 0
  },
  {
    name: "cccc",
    img: "cat2.jpg",
    count: 0
  },
  {
    name: "dddd",
    img: "cat3.jpg",
    count: 0
  },
  {
    name: "eeee",
    img: "cat4.jpg",
    count: 0
  }
];
cats.map(function(cat, i) {
  insertCat(cat, i);
});

function insertCat(cat, i) {
  let catPic = document.createElement("li");
  let catImage = document.createElement("img");
  catImage.src = cat.img;
  catPic.appendChild(catImage);
  catPic.addEventListener("click", showCat, false);
  pics.appendChild(catPic);

  function showCat() {
    displayCat(cat.img, cat.name, cat.count, i);
  }
}

function displayCat(image, name, count, index) {
  let bigPic = document.getElementById("bigPic");
  if (bigPic.childElementCount) {
    bigPic.removeChild(bigPic.firstChild);
  }

  let bigCat = document.createElement("div");
  let catImage = document.createElement("img");
  let catName = document.createElement("div");
  let catCount = document.createElement("div");
  catImage.src = image;
  catName.textContent = name;
  catCount.textContent = count;

  bigCat.appendChild(catImage);
  bigCat.appendChild(catName);
  bigCat.appendChild(catCount);
  bigCat.addEventListener(
    "click",
    function() {
      count += 1;
      catCount.textContent = count;
      cats[index]["count"] = count;
    },
    false
  );

  bigPic.appendChild(bigCat);
}
