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

function selectPreviousLink() {
    console.log("selectPreviousLink called");
    const linksContainer = document.getElementById('link-container');
    const links = linksContainer.getElementsByTagName('a');
    const selected = linksContainer.querySelector('.select');

    // If the first link is selected, find the last link
    const isFirstLinkSelected = selected && selected === links[0];

    let previousLink = isFirstLinkSelected ? links[links.length - 1] : findAdjacentAnchor(selected, false);

    // If no link is selected or the first link was selected, select the last link
    if (!selected || isFirstLinkSelected) {
        updateSelectedLink(selected, previousLink);
    } else {
        // Find and select the previous link
        previousLink = findAdjacentAnchor(selected, false);
        updateSelectedLink(selected, previousLink);
    }
      moveAndCenterSelectedItem(previousLink);

}

// Selects the next link in the list
function selectNextLink() {
    console.log("selectNextLink called");
    const linksContainer = document.getElementById('link-container');
    const links = linksContainer.getElementsByTagName('a');
    const selected = linksContainer.querySelector('.select');

    // Check if the last link is selected
    const isLastLinkSelected = selected && selected === links[links.length - 1];

    let nextLink = isLastLinkSelected ? links[0] : findAdjacentAnchor(selected, true);

    // If no link is selected or the last link was selected, select the first link
    if (!selected || isLastLinkSelected) {
        updateSelectedLink(selected, nextLink);
    } else {
        // Find and select the next link
        nextLink = findAdjacentAnchor(selected, true);
        updateSelectedLink(selected, nextLink);
    }
    moveAndCenterSelectedItem(nextLink);
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

// This function would be called in the event that triggers the selection of the next link
// For example:
document.querySelector('#trigger-right').addEventListener('click', selectNextLink);
// Handles key down events for navigation and selection

  
document.addEventListener('DOMContentLoaded', function() {
    cloneMenuItemsForLoop();
    const initialSelected = document.querySelector('.main-menu .select');
    if (initialSelected) {
        moveAndCenterSelectedItem(initialSelected);
    }
    adjustLayout();
    adjustAnchorTextSize();
});