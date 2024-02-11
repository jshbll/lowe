// Equalize the widths of menu items based on the total width of the menu container
function equalizeMenuItemWidths() {
    const menuContainer = document.querySelector('.main-menu');
    const menuItems = document.querySelectorAll('.menu-item');
    const menuItemWidth = menuContainer.offsetWidth / menuItems.length;

    menuItems.forEach(item => {
        item.style.width = `${menuItemWidth}px`;
    });
}

// Centers the selected menu item in the carousel
function centerSelectedItem(selectedItem) {
    const menuContainer = document.querySelector('.main-menu');
    const scrollPosition = selectedItem.offsetLeft - (menuContainer.offsetWidth / 2) + (selectedItem.offsetWidth / 2);
    menuContainer.scrollTo({ left: scrollPosition, behavior: 'smooth' });
}

// Selects the next link in the carousel
function selectNextLink() {
    const menuContainer = document.querySelector('.main-menu');
    const links = Array.from(menuContainer.getElementsByClassName('menu-item'));
    const currentIndex = links.findIndex(link => link.classList.contains('select'));
    const nextIndex = (currentIndex + 1) % links.length;
    const nextLink = links[nextIndex];

    updateSelectedLink(links[currentIndex], nextLink);
    centerSelectedItem(nextLink);
}

// Selects the previous link in the carousel
function selectPreviousLink() {
    const menuContainer = document.querySelector('.main-menu');
    const links = Array.from(menuContainer.getElementsByClassName('menu-item'));
    const currentIndex = links.findIndex(link => link.classList.contains('select'));
    const prevIndex = (currentIndex - 1 + links.length) % links.length;
    const prevLink = links[prevIndex];

    updateSelectedLink(links[currentIndex], prevLink);
    centerSelectedItem(prevLink);
}

// Update the selected link's appearance
function updateSelectedLink(currentSelected, newSelected) {
    if (currentSelected) {
        currentSelected.classList.remove('select');
    }
    newSelected.classList.add('select');
}

// Initialization on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    equalizeMenuItemWidths();

    const initialSelected = document.querySelector('.main-menu .select');
    if (initialSelected) {
        centerSelectedItem(initialSelected);
    }

    document.getElementById('select-button').addEventListener('click', clickSelectedLink);

    window.addEventListener('resize', function() {
        adjustLayout();
        adjustAnchorTextSize();
        equalizeMenuItemWidths();
        const selectedLink = document.querySelector('.main-menu .select');
        centerSelectedItem(selectedLink);
    });

    enterFullScreen();
});
