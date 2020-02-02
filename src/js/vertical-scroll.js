function VerticalScrollSections(obj) {
    this.sectionNow = obj.sectionNow;
    this.shiftSection = obj.shiftSection;
    this.sectionCount = document.querySelector(obj.sectionCount);
    this.btnsList = document.querySelector(obj.btnsList);
    this.index = Array.prototype.slice.call(this.btnsList.children);
    this.navBtn = document.querySelectorAll(obj.navBtn);
    this.translateHeight = document.querySelector(obj.translateHeight);
    this.cssStyle = window.getComputedStyle(this.translateHeight);
    this.clickEvent = obj.clickEvent;
    this.wheelEvent = obj.wheelEvent;
    this.init(obj);
}

VerticalScrollSections.prototype = {
    init() {
        const self = this;
        let navBtnIndex = 0;
        const duration = 0.9;
        const step = 1;
        let current;
        self.btnsList.addEventListener(self.clickEvent, ev => {
            current = ev.target;
            if (current === self.btnsList)
                ev.preventBubbling();

            navBtnIndex = self.index.indexOf(current);

            _getDotMarker(current, self.navBtn);

            if (navBtnIndex + step != self.slideNow) {
                const baseHeight = parseInt(self.cssStyle.getPropertyValue('height')) * navBtnIndex;
                self.shiftSection = - baseHeight;

                _getTranslate(self.shiftSection, duration);
                self.sectionNow = navBtnIndex + step;
            }
        });

        self.sectionCount.addEventListener(self.wheelEvent, ev => {
            const baseHeight = parseInt(self.cssStyle.getPropertyValue('height'));
            const countOfPages = [...self.sectionCount.children].length - step;

            const delta = ev.deltaY;
            if (delta > 0) {
                self.shiftSection -= baseHeight;

                if (self.shiftSection < - baseHeight * countOfPages) {
                    self.shiftSection = 0;
                    _getDotDown(self.navBtn);
                    self.navBtn[0].classList.add('active');
                    _getTranslate(self.shiftSection, duration);
                    self.sectionNow = 1;

                } else {
                    _getTranslate(self.shiftSection, duration);
                    _getDotDown(self.navBtn);
                    self.sectionNow++;
                }
            } else {
                self.shiftSection += baseHeight;
                if (self.shiftSection > 0 || self.sectionNow <= 1) {
                    self.shiftSection = - baseHeight * countOfPages;
                    self.sectionNow = self.sectionCount.children.length + 1;
                }
                _getTranslate(self.shiftSection, duration);
                self.sectionNow--;
                _getDotUp(self.navBtn);
            }
            ev.preventDefault();
        });
        function _getDotMarker(...args) {
            const [current, navBtn] = args;
            for (let i = 0; i < navBtn.length; i++) {
                if (navBtn[i] !== current)
                    navBtn[i].classList.remove('active');
                else
                    navBtn[i].classList.add('active');

            }
        }
        function _getDotDown(navBtn) {
            for (let i = 0; i < navBtn.length; i++) {
                navBtn[i].classList.remove('active');
                if (i === self.sectionNow)
                    navBtn[i].classList.add('active');
            }
        }
        function _getDotUp(navBtn) {
            for (let i = 0; i < navBtn.length; i++) {
                navBtn[i].classList.remove('active');
                if (i + 1 === self.sectionNow)
                    navBtn[i].classList.add('active');
            }
        }

        function _getTranslate(value, duration) {
            self.sectionCount.style.transform = `translate(0, ${value}px)`;
            self.sectionCount.style.transition = `${duration}s`;
            if (value === 0)
                self.sectionCount.style.transform = 'translate(0,0)';
        }
    }
};
export default VerticalScrollSections;
