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
    },
    getCurCat: () => model.curCat,
    getCats: () => model.cats,
    setCurrentCat: (cat) => model.curCat = cat,
    incrementCount: () => {
      model.curCat.count++;
      catView.renderCat();
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
          listView.setActive(elem);
          catView.renderCat();
        });

        this.listContainer.appendChild(elem);
      }
      this.elems[0].classList.add('active');
    },
    setActive: (elem) => {
      for (let i = this.elems.length - 1; i >= 0; i--) {
        this.elems[i].classList.remove('active');
      }
      elem.classList.add('active');
    }
  };
  const catView = {
    init: () => {
      this.picElem = document.getElementById('pic');
      this.picDescElem = document.getElementById('cat-desc');
      this.picCountElem = document.getElementById('cat-count');

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