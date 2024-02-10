// update Menu Position
function centerSelectedItem() {
    const menu = document.querySelector('.main-menu');
    const selectedItem = menu.querySelector('.select');

    if (!selectedItem) return;

    const selectedItemOffset = selectedItem.offsetLeft + selectedItem.offsetWidth / 2;
    const menuHalfWidth = menu.offsetWidth / 2;
    const scrollPosition = selectedItemOffset - menuHalfWidth;
    
    // Smooth scroll to the new position
    menu.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
    });
}
function moveSelectionIndicator(newSelectedElement) {
    const indicator = document.querySelector('.selection-indicator');

    const newLeft = newSelectedElement.offsetLeft;
    const newWidth = newSelectedElement.offsetWidth;

    // Move the indicator to the new item
    indicator.style.left = `${newLeft}px`;
    indicator.style.width = `${newWidth}px`; // Adjust the width to match the new item
}





// Clone Menu Items to create an infinite loop effect
function cloneMenuItemsForLoop() {
    const menu = document.querySelector('.main-menu');
    // Remove previous clones if any to avoid duplicating clones
    menu.querySelectorAll('.clone').forEach(clone => clone.remove());

    const firstItem = menu.children[0].cloneNode(true);
    firstItem.classList.remove('select');
    firstItem.classList.add('clone'); // Add a class to identify clones
    const lastItem = menu.children[menu.children.length - 1].cloneNode(true);
    lastItem.classList.remove('select');
    lastItem.classList.add('clone'); // Add a class to identify clones

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
    const links = Array.from(linksContainer.getElementsByTagName('a')); // Convert to array for easy manipulation
    const currentIndex = links.findIndex(link => link.classList.contains('select')); // Get current index
    const nextIndex = currentIndex >= 0 && currentIndex < links.length - 1 ? currentIndex + 1 : 0; // Calculate next index
    const newSelected = links[nextIndex]; // Get the new selected link based on nextIndex
    
    // Update the 'select' class for the new selected link
    links.forEach(link => link.classList.remove('select')); // Remove 'select' from all links
    newSelected.classList.add('select'); // Add 'select' to the new link
    
    // Move the selection indicator to the new selected link
    moveSelectionIndicator(newSelected);
}

// This function moves the selection indicator to the selected link
function moveSelectionIndicator(selectedLink) {
    const indicator = document.querySelector('.selection-indicator');
    const leftPosition = selectedLink.offsetLeft;
    const width = selectedLink.offsetWidth;
    
    indicator.style.left = `${leftPosition}px`;
    indicator.style.width = `${width}px`;
}

// This function would be called in the event that triggers the selection of the next link
// For example:
document.querySelector('#trigger-right').addEventListener('click', selectNextLink);



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
    const selected = document.querySelector('.main-menu .select');
    if (selected) {
        moveSelectionIndicator(selected);
    }
    
    cloneMenuItemsForLoop(); // Call this function to clone items
    centerSelectedItem(); // Center the initially selected item
    adjustLayout();
    adjustAnchorTextSize();
    // No need to clone again here as it's already done above
});
