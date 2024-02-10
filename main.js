// update Menu Position
function centerSelectedItem() {
    const menuContainer = document.querySelector('.main-menu');
    const selectedItem = menuContainer.querySelector('.select');

    // Ensure selectedItem is defined before trying to use it
    if (selectedItem) {
        const scrollPosition = selectedItem.offsetLeft - (menuContainer.offsetWidth / 2) + (selectedItem.offsetWidth / 2);
        menuContainer.scrollLeft = scrollPosition;
    }
}

// Clone Menu Items to create an infinite loop effect
function cloneMenuItemsForLoop() {
    const menu = document.querySelector('.main-menu');
    const firstItem = menu.children[0].cloneNode(true);
    firstItem.classList.remove('select');
    const lastItem = menu.children[menu.children.length - 1].cloneNode(true);
    lastItem.classList.remove('select');

    menu.insertBefore(lastItem, menu.firstChild);
    menu.appendChild(firstItem);
}
    


// Finds the adjacent anchor tag (previous or next based on `isNext` flag)
function findAdjacentAnchor(element, isNext) {
    // Start with either the next or previous sibling element
    let sibling = isNext ? element.nextElementSibling : element.previousElementSibling;

    // Loop until an anchor tag is found or there are no more sibling elements
    while (sibling && sibling.tagName !== 'A') {
        sibling = isNext ? sibling.nextElementSibling : sibling.previousElementSibling;
    }
    return sibling;
}

  function scrollToElement(element) {
    const menuContainer = document.querySelector('.main-menu');
    const scrollPosition = element.offsetLeft - (menuContainer.offsetWidth / 2) + (element.offsetWidth / 2);
    menuContainer.scrollLeft = scrollPosition;
}
  
function updateSelectedLink(currentSelected, newSelected) {
    const links = document.querySelectorAll('.menu-item');
    links.forEach(link => link.classList.remove('select')); // Remove 'select' from all links
    if (newSelected) {
        newSelected.classList.add('select'); // Add 'select' to the new link
    }
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
      centerSelectedItem();

}

// Selects the next link in the list
function selectNextLink() {
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
     centerSelectedItem();
}


// Handles key down events for navigation and selection
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

document.addEventListener('keydown', handleKeyDown);


// Attach event listeners to all 'trigger' elements
document.querySelectorAll('.trigger.active.right').forEach(element => {
    element.addEventListener('click', selectNextLink);
});


document.querySelectorAll('.trigger.active.left').forEach(element => {
    element.addEventListener('click', selectPreviousLink);
});


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



// Add click event listener to a specific button to trigger clickSelectedLink
document.getElementById('select-button').addEventListener('click', clickSelectedLink);


// Add resize event listener to adjust layout and font size when window is resized
window.addEventListener('resize', function() {
    adjustLayout();
    adjustAnchorTextSize();
    centerSelectedItem();
});
  
  function enterFullScreen() {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.webkitRequestFullscreen) { // Safari
        document.documentElement.webkitRequestFullscreen();
    }
}

  
document.addEventListener('DOMContentLoaded', function() {
    cloneMenuItemsForLoop(); // Call this function to clone items
    centerSelectedItem(); // Center the initially selected item
    
    const menu = document.querySelector('.main-menu');
    // Clone first and last items only if necessary
    if (menu) {
        const firstItem = menu.children[0].cloneNode(true);
        firstItem.classList.remove('select');
        const lastItem = menu.children[menu.children.length - 1].cloneNode(true);
        lastItem.classList.remove('select');
    
        menu.insertBefore(lastItem, menu.firstChild);
        menu.appendChild(firstItem);
    }



    adjustLayout();
    adjustAnchorTextSize();
});
