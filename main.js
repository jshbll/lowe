function moveAndCenterSelectedItem(newSelectedElement) {
    const menuContainer = document.querySelector('.main-menu');
    const indicator = document.querySelector('.selection-indicator');
    const menuContainerRect = menuContainer.getBoundingClientRect();
    const selectedElementRect = newSelectedElement.getBoundingClientRect();

    if (!newSelectedElement || !menuContainer || !indicator) return;

    // Calculate the center position of the selected item relative to the menu container
    const selectedItemCenterPosition = selectedElementRect.left - menuContainerRect.left + (selectedElementRect.width / 2);
    const centerOffset = menuContainerRect.width / 2;
    const scrollPosition = selectedItemCenterPosition - centerOffset;

    // Set the new position of the indicator to the selected item
    // It's relative to the menu container, not the viewport
    const indicatorNewLeftPosition = selectedElementRect.left - menuContainerRect.left + menuContainer.scrollLeft;
    
    indicator.style.left = `${indicatorNewLeftPosition}px`;
    indicator.style.width = `${selectedElementRect.width}px`;

    // Smoothly scroll the menu container to center the selected item
    menuContainer.scroll({
        left: scrollPosition,
        behavior: 'smooth'
    });
}

function centerSelectedItem(selectedItem) {
    const menu = document.querySelector('.main-menu');
    const menuRect = menu.getBoundingClientRect();
    const selectedItemRect = selectedItem.getBoundingClientRect();

    // Calculate the center position of the menu and the selected item
    const menuCenter = menuRect.width / 2;
    const selectedItemCenter = selectedItemRect.left + selectedItemRect.width / 2;

    // Calculate the new scroll position
    const scrollLeft = selectedItemCenter - menuCenter + menu.scrollLeft;

    // Scroll the menu to center the selected item
    menu.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
    });
}

// Clone Menu Items to create an infinite loop effect
function cloneMenuItemsForLoop() {
    const menu = document.querySelector('.main-menu');

    // Remove previous clones to avoid duplicating clones
    menu.querySelectorAll('.clone').forEach(clone => clone.remove());

    // Clone only the menu items, not the selection indicator
    const menuItems = Array.from(menu.children).filter(child => !child.classList.contains('selection-indicator'));
    
    if (menuItems.length > 0) {
        const firstItem = menuItems[0].cloneNode(true);
        firstItem.classList.remove('select');
        firstItem.classList.add('clone'); // Add a class to identify clones

        const lastItem = menuItems[menuItems.length - 1].cloneNode(true);
        lastItem.classList.remove('select');
        lastItem.classList.add('clone'); // Add a class to identify clones

        menu.insertBefore(lastItem, menu.firstChild);
        menu.appendChild(firstItem);
    }
}

// Helper function to find the next or previous anchor element
function findAdjacentAnchor(element, isNext) {
    let sibling = isNext ? element.nextElementSibling : element.previousElementSibling;
    while (sibling && sibling.tagName !== 'A') {
        sibling = isNext ? sibling.nextElementSibling : sibling.previousElementSibling;
    }
    return sibling;
}

function updateSelectionIndicator(newSelectedElement) {
    const indicator = document.querySelector('.selection-indicator');

    if (!indicator || !newSelectedElement) return;

    // Update the width of the indicator to match the new selected element
    indicator.style.width = `${newSelectedElement.offsetWidth}px`;
}

 function clickSelectedLink() {
    var selectedLink = document.querySelector('#link-container a.select');
    if (selectedLink) {
        selectedLink.click();
    }
}

// Ensure the selection indicator stays centered
function centerSelectionIndicator() {
    const menuContainer = document.querySelector('.main-menu');
    const indicator = document.querySelector('.selection-indicator');
    const menuContainerRect = menuContainer.getBoundingClientRect();

    // Keep the indicator centered in the menu container
    indicator.style.left = `${menuContainerRect.width / 2 - indicator.offsetWidth / 2}px`;
}

// Scroll to center the selected item
function centerSelectedItem(selectedItem) {
    const menu = document.querySelector('.main-menu');
    const selectedItemRect = selectedItem.getBoundingClientRect();
    const menuRect = menu.getBoundingClientRect();

    // Calculate the center position of the menu and the selected item
    const scrollLeft = selectedItemRect.left + selectedItemRect.width / 2 - menuRect.width / 2;

    // Adjust for the current scroll position of the menu
    menu.scrollLeft = scrollLeft + menu.scrollLeft;
}

// Call this function whenever a new item is selected to center it
function selectNewItem(newSelectedElement) {
    const currentSelected = document.querySelector('.main-menu .select');
    updateSelectedLink(currentSelected, newSelectedElement);
    centerSelectedItem(newSelectedElement);
}

// This function is triggered when the "next" or "previous" navigation is activated
function selectNextLink() {
    const currentSelected = document.querySelector('.main-menu .select');
    const nextLink = findAdjacentAnchor(currentSelected, true) || currentSelected; // Loop back to current if no next
    selectNewItem(nextLink);
}

function selectPreviousLink() {
    const currentSelected = document.querySelector('.main-menu .select');
    const prevLink = findAdjacentAnchor(currentSelected, false) || currentSelected; // Loop back to current if no prev
    selectNewItem(prevLink);
}

// Helper function to update the selected link class
function updateSelectedLink(currentSelected, newSelected) {
    if (currentSelected) {
        currentSelected.classList.remove('select');
    }
    if (newSelected) {
        newSelected.classList.add('select');
    }
}

function handleKeyDown(event) {
    // Map of keys to their corresponding actions
    const keyActionMap = {
        'ArrowDown': selectNextLink,
        'ArrowRight': selectNextLink,
        'ArrowUp': selectPreviousLink,
        'ArrowLeft': selectPreviousLink,
        'Enter': clickSelectedLink
    };

    // Execute the corresponding function if a key is mapped
    if (keyActionMap[event.key]) {
        keyActionMap[event.key]();
    }
}

// Adjusts layout to the viewport height
function adjustLayout() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Adjusts the font size of anchor tags based on the viewport width
function adjustAnchorTextSize() {
    const viewportWidth = window.innerWidth;
    const fontSize = Math.min(Math.max((viewportWidth / 100) * 2, 21), 64);
    document.querySelectorAll('a').forEach(anchor => {
        anchor.style.fontSize = `${fontSize}px`;
    });
}

// Triggers a click event on the currently selected link
function clickSelectedLink() {
    const selectedLink = document.querySelector('#link-container a.select');
    if (selectedLink) {
        selectedLink.click();
    }
}

function enterFullScreen() {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.webkitRequestFullscreen) { // Safari
        document.documentElement.webkitRequestFullscreen();
    }
}

document.addEventListener('keydown', handleKeyDown);

// Add click event listener to a specific button to trigger clickSelectedLink
document.getElementById('select-button').addEventListener('click', clickSelectedLink);

// Attach event listeners to all 'trigger' elements
document.querySelectorAll('.trigger.active.right').forEach(element => {
    element.addEventListener('click', selectNextLink);
});

document.querySelectorAll('.trigger.active.left').forEach(element => {
    element.addEventListener('click', selectPreviousLink);
});

// Add resize event listener to adjust layout and font size when window is resized
window.addEventListener('resize', function() {
    adjustLayout();
    adjustAnchorTextSize();
    centerSelectedItem();
});

// Initial setup to center the selection indicator and selected item
document.addEventListener('DOMContentLoaded', function() {
    centerSelectionIndicator();

    const initialSelected = document.querySelector('.main-menu .select');
    if (initialSelected) {
        centerSelectedItem(initialSelected);
    }

    cloneMenuItemsForLoop();
    adjustLayout();
    adjustAnchorTextSize();
});