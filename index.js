let model = {
  init: function() {
    if (!localStorage.cats) {
      localStorage.cats = JSON.stringify([
        {
          name: "aaaa",
          image: "cat0.jpg",
          count: 0
        },
        {
          name: "bbbb",
          image: "cat1.jpg",
          count: 0
        },
        {
          name: "cccc",
          image: "cat2.jpg",
          count: 0
        },
        {
          name: "dddd",
          image: "cat3.jpg",
          count: 0
        },
        {
          name: "eeee",
          image: "cat4.jpg",
          count: 0
        }
      ]);
    }
  },

  getCats: function() {
    return JSON.parse(localStorage.cats);
  },

  setCats: function(data) {
    localStorage.cats = JSON.stringify(data);
  },

  updateCount: function(index) {
    let cats = this.getCats();
    let count = cats[index]["count"];
    count += 1;
    cats[index]["count"] = count;
    this.setCats(cats);
    return count;
  }
};

let controller = {
  init: function() {
    model.init();
    view.init();
    this.showCat(0);
  },
  getCats: function() {
    return model.getCats();
  },

  showCat: function(i) {
    let cats = this.getCats();
    let name = cats[i]["name"];
    let image = cats[i]["image"];
    let count = cats[i]["count"];
    view.displayCat(name, image, count, i);
  },

  updateCount: function(i) {
    let count = model.updateCount(i);
    view.displayCount(count);
  }
};

let view = {
  init: function() {
    this.showList();
  },

  showList: function() {
    let catList = document.getElementById("catList");
    let cats = controller.getCats();
    cats.map(function(cat, i) {
      let catItem = document.createElement("li");
      catItem.textContent = cat.name;
      catItem.addEventListener(
        "click",
        function() {
          controller.showCat(i);
        },
        false
      );
      catList.appendChild(catItem);
    });
  },

  displayCat: function(name, image, count, i) {
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
    catCount.id = "catCount";

    bigCat.appendChild(catImage);
    bigCat.appendChild(catName);
    bigCat.appendChild(catCount);

    bigCat.addEventListener(
      "click",
      function() {
        controller.updateCount(i);
      },
      false
    );

    bigPic.appendChild(bigCat);
  },

  displayCount: function(count) {
    let catCount = document.getElementById("catCount");
    let parent = catCount.parentNode;

    let newCount = document.createElement("div");
    newCount.textContent = count;
    newCount.id = "catCount";
    parent.replaceChild(newCount, catCount);
  }
};

controller.init();
