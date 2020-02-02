export default function Slider(obj) {
    this.slideNow = obj.slideNow;
    this.shiftSlide = obj.shiftSlide;
    this.slideCount = document.querySelector(obj.slideCount);
    this.btnsList = document.querySelector(obj.btnsList);
    this.index = Array.prototype.slice.call(this.btnsList.children);
    this.navBtn = document.querySelectorAll(obj.navBtn);
    this.translateWidth = document.querySelector(obj.translateWidth);
    this.prev = document.querySelector(obj.prev);
    this.next = document.querySelector(obj.next);
    this.cssStyle = window.getComputedStyle(this.translateWidth);
    this.init(obj);
}

Slider.prototype = {
    init() {
        let self = this;
        self.btnsList.addEventListener('click', ev => {
            let current = ev.target;

            if (ev.target === this.btnsList)
                ev.preventBubbling();

            let navBtnIndex = self.index.indexOf(current);
            let navBtn = self.navBtn;

            for (let i = 0; i < navBtn.length; i++) {
                if (navBtn[i] !== current) {
                    navBtn[i].classList.remove('active');
                } else
                    navBtn[i].classList.add('active');
            }

            if (navBtnIndex + 1 != self.slideNow) {
                let baseWidth = parseInt(self.cssStyle.getPropertyValue('width')) * navBtnIndex;
                self.shiftSlide = - baseWidth;

                self.slideCount.style.transform = 'translate(' + self.shiftSlide + 'px,0)';
                self.slideNow = navBtnIndex + 1;
            }
        });
        self.prev.addEventListener('click', () => {
            let self = this;

            if (self.slideNow <= 1)
                self.slideNow = self.slideCount.children.length + 1;

            let baseWidth = parseInt(self.cssStyle.getPropertyValue('width')) * (self.slideNow - 2);
            self.shiftSlide = - baseWidth;

            self.slideCount.style.transform = 'translate(' + self.shiftSlide + 'px,0)';
            self.slideNow--;
            for (let i = 0; i < self.navBtn.length; i++) {
                self.navBtn[i].classList.remove('active');
                if (i + 1 == self.slideNow)
                    self.navBtn[i].classList.add('active');
            }
        });
        self.next.addEventListener('click', () => {
            let self = this;

            for (let i = 0; i < self.navBtn.length; i++) {
                self.navBtn[i].classList.remove('active');
                if (i == self.slideNow)
                    self.navBtn[i].classList.add('active');
            }
            if (self.slideNow == self.slideCount || self.slideNow <= 0 || self.slideNow > (self.slideCount.children.length - 1)) {
                self.slideCount.style.transform = 'translate(0,0)';
                self.slideNow = 1;
                self.navBtn[0].classList.add('active');
            } else {
                let baseWidth = parseInt(self.cssStyle.getPropertyValue('width')) * (self.slideNow);
                self.shiftSlide = - baseWidth;

                self.slideCount.style.transform = 'translate(' + self.shiftSlide + 'px,0)';
                self.slideNow++;
            }
        });
    }
};
