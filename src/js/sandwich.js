const sidebarBox = document.getElementById('menu__nav');
const sidebarSandwichNav = document.getElementById('sandwich__nav');

sidebarSandwichNav.addEventListener('click', () => {
    sidebarBox.classList.toggle('sandwich__active');
    sidebarSandwichNav.classList.toggle('sandwich__active');
});

export {sidebarBox, sidebarSandwichNav};
