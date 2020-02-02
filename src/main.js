import './main.scss';
import './js/sandwich';
import {initSmoothScrolling} from './js/scroller';
import Slider from './js/slider';
import VerticalScrollSections from './js/vertical-scroll';

window.addEventListener('DOMContentLoaded', () => {
    new Slider({
        slideNow: 1,
        shiftSlide: 0,
        slideCount: '.slider__slides',
        btnsList: '.btns__one',
        navBtn: '.slider__one-nav',
        translateWidth: '.slider',
        prev: '.slider__prev',
        next: '.slider__next'
    });
    new VerticalScrollSections({
        sectionNow: 1,
        shiftSection: 0,
        sectionCount: '.vertical-slider__wrapper',
        btnsList: '.pagination__list',
        navBtn: '.pagination__item',
        translateHeight: '.vertical-slider__wrapper',
        clickEvent: 'click'
    });
});

window.addEventListener('load', () =>{
    initSmoothScrolling();
});
