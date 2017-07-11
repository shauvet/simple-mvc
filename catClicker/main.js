/**
 * Created by xiaowei on 2017/7/8.
 */

(function () {
  // model
  const model = {
    curCat: null,
    cats: [
      {name: 'cat1', count: 0, src: 'statics/cat1.jpg'},
      {name: 'cat2', count: 0, src: 'statics/cat2.jpg'},
      {name: 'cat3', count: 0, src: 'statics/cat3.jpg'},
      {name: 'cat4', count: 0, src: 'statics/cat4.jpg'},
      {name: 'cat5', count: 0, src: 'statics/cat5.jpg'}
    ]
  };
  // controller
  const octopus = {
    init: () => {
      model.curCat = model.cats[0];

      listView.init();
      catView.init();
      adminView.init();
    },
    getCurCat: () => model.curCat,
    getCats: () => model.cats,
    setCurrentCat: (cat) => model.curCat = cat,
    incrementCount: () => {
      model.curCat.count++;
      catView.renderCat();
    }
  };

  const adminView = {
    init: () => {
      let adminBtn = document.getElementById('admin');
      this.adminArea = document.getElementById('admin-area');

      this.catName = document.getElementById('cat-name');
      this.catSrc = document.getElementById('cat-src');
      this.catCount = document.getElementById('cat-count');
      this.adminSave = document.getElementById('admin-save');
      this.adminCancel = document.getElementById('admin-cancel');
      this.showAdmin = false;

      adminBtn.addEventListener('click', () => {
        this.showAdmin = !this.showAdmin;
        adminView.render();
      });

      this.adminSave.addEventListener('click', () => {
        adminView.updateCat();
      });

      this.adminCancel.addEventListener('click', () => {
        this.showAdmin = false;
        adminView.render();
      });

      adminView.render();
    },

    updateCat: () => {
      let curCat = octopus.getCurCat();
      curCat.name = this.catName.value;
      curCat.src = this.catSrc.value;
      curCat.count = this.catCount.value;

      this.showAdmin = false;
      adminView.render();

      listView.render();
      catView.renderCat();
    },

    render: () => {
      if (this.showAdmin) {
        let curCat = octopus.getCurCat();
        this.adminArea.classList.remove('invisible');
        this.catName.value = curCat.name;
        this.catSrc.value = curCat.src;
        this.catCount.value = curCat.count;
      } else {
        this.adminArea.classList.add('invisible');
      }
    }
  };
  // view
  const listView = {
    init: () => {
      this.listContainer = document.getElementById('list-container');
      this.elems = this.listContainer.getElementsByTagName('li');

      listView.render();
    },
    render: () => {
      let cats = octopus.getCats();

      this.listContainer.innerHTML = '';

      for (let i = 0; i < cats.length; i++) {
        let cat = cats[i];
        let elem = document.createElement('li');
        elem.textContent = cat.name;
        elem.classList.add('list-group-item');

        elem.addEventListener('click', () => {
          octopus.setCurrentCat(cat);
          listView.setActive();
          catView.renderCat();
        });

        this.listContainer.appendChild(elem);
      }
      listView.setActive();
    },
    setActive: () => {
      let curCat = octopus.getCurCat();
      for (let i = this.elems.length - 1; i >= 0; i--) {
        this.elems[i].classList.remove('active');
        if (curCat.name === this.elems[i].textContent) {
          this.elems[i].classList.add('active');
        }
      }
    }
  };
  const catView = {
    init: () => {
      this.picElem = document.getElementById('pic');
      this.picDescElem = document.getElementById('pic-desc');
      this.picCountElem = document.getElementById('pic-count');

      this.picElem.addEventListener('click', function () {
        octopus.incrementCount();
      });

      catView.renderCat();
    },

    renderCat: () => {
      let curCat = octopus.getCurCat();

      this.picCountElem.textContent = curCat.count;
      this.picElem.src = curCat.src;
      this.picDescElem.textContent = curCat.name;
    }
  };

  octopus.init();
})();