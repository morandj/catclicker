let model = {
  showAdmin: false,
  currentCat: null,
  cats: [
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
  ]
};

//===================================================

let controller = {
  init: function() {
    model.currentCat = model.cats[0];
    listView.init();
    catView.init();
    adminView.init();
  },

  getCurrentCat: function() {
    return model.currentCat;
  },

  getCats: function() {
    return model.cats;
  },

  setCurrentCat: function(cat) {
    model.currentCat = cat;
  },

  updateCount: function() {
    model.currentCat.count += 1;
    console.log("mcc", model.currentCat.count);
    catView.displayCount(model.currentCat.count);
  },

  showAdmin: function() {
    model.showAdmin = true;
    adminView.render(model.showAdmin);
  },

  cancelAdmin: function() {
    model.showAdmin = false;
    adminView.render(model.showAdmin);
  },

  saveAdmin: function() {
    let fName = document.getElementById("f-cat-name").value;
    let fImgUrl = document.getElementById("f-img-url").value;
    let fClickCount = document.getElementById("f-click-count").value;
    model.currentCat.name = fName;
    model.currentCat.image = fImgUrl;
    model.currentCat.count = Number.parseInt(fClickCount);
    console.log(Number.isInteger(model.currentCat.count));
    model.showAdmin = false;
    adminView.render(model.showAdmin);
    catView.render();
  }
};

//=====================================================================

let catView = {
  init: function() {
    this.catName = document.getElementById("cat-name");
    this.catCount = document.getElementById("cat-count");
    this.catImage = document.getElementById("cat-image");

    this.catImage.addEventListener(
      "click",
      function() {
        controller.updateCount();
      },
      false
    );

    this.render();
  },

  render: function() {
    let currentCat = controller.getCurrentCat();
    this.catName.textContent = currentCat.name;
    this.catCount.textContent = currentCat.count;
    this.catImage.src = currentCat.image;
  },

  displayCount: function(count) {
    console.log(count);
    this.catCount.textContent = count;
  }
};

//---------------------------------------------------------------

let listView = {
  init: function() {
    this.catList = document.getElementById("cat-list");
    this.render();
  },

  render: function() {
    let catList = document.getElementById("cat-list");
    let cats = controller.getCats();
    cats.map(function(cat) {
      let catItem = document.createElement("li");
      catItem.textContent = cat.name;
      catItem.addEventListener(
        "click",
        function() {
          controller.setCurrentCat(cat);
          catView.render();
          adminView.render();
        },
        false
      );
      catList.appendChild(catItem);
    });
  }
};

//------------------------------------------------------------------

let adminView = {
  init: function() {
    this.adminForm = document.getElementById("admin-form");
    this.fName = document.getElementById("f-cat-name");
    this.fImgUrl = document.getElementById("f-img-url");
    this.fClickCount = document.getElementById("f-click-count");

    let adminBtn = document.getElementById("admin-btn");
    adminBtn.addEventListener("click", function() {
      controller.showAdmin();
    });

    let cancelBtn = document.getElementById("cancel-btn");
    cancelBtn.addEventListener("click", function() {
      controller.cancelAdmin();
    });

    let saveBtn = document.getElementById("save-btn");
    saveBtn.addEventListener("click", function() {
      controller.saveAdmin();
    });
  },

  render: function(show) {
    if (show) {
      let currentCat = controller.getCurrentCat();
      this.fName.value = currentCat.name;
      this.fImgUrl.value = currentCat.image;
      this.fClickCount.value = currentCat.count;
      this.adminForm.style.display = "block";
    } else {
      this.adminForm.style.display = "none";
    }
  }
};

controller.init();
