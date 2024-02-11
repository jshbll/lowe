document.addEventListener('DOMContentLoaded', function() {
    adjustLayout();
    adjustAnchorTextSize();
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
        const currentlySelected = document.querySelector('.main-menu .select');
        if (currentlySelected) {
            centerSelectedItem(currentlySelected);
        }
    });

    enterFullScreen();
});

// ... [Keep all other existing functions the same]

function selectNextLink() {
    const menuContainer = document.getElementById('link-container');
    const links = Array.from(menuContainer.getElementsByClassName('menu-item'));
    const currentIndex = links.findIndex(link => link.classList.contains('select'));
    const nextIndex = (currentIndex + 1) % links.length;
    const nextLink = links[nextIndex];

    updateSelectedLink(links[currentIndex], nextLink);
    centerSelectedItem(nextLink);
}

function selectPreviousLink() {
    const menuContainer = document.getElementById('link-container');
    const links = Array.from(menuContainer.getElementsByClassName('menu-item'));
    const currentIndex = links.findIndex(link => link.classList.contains('select'));
    const prevIndex = (currentIndex - 1 + links.length) % links.length;
    const prevLink = links[prevIndex];

    updateSelectedLink(links[currentIndex], prevLink);
    centerSelectedItem(prevLink);
}

// ... [Rest of your script]

// Attach event listeners to all 'trigger' elements
document.querySelectorAll('.trigger.active.right').forEach(element => {
    element.addEventListener('click', selectNextLink);
});

document.querySelectorAll('.trigger.active.left').forEach(element => {
    element.addEventListener('click', selectPreviousLink);
});
