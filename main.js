
// Initialization
document.addEventListener('DOMContentLoaded', function() {
    // Adjust layout to fit the viewport height
    adjustLayout();

    // Adjust the font size of anchor tags based on the viewport width
    adjustAnchorTextSize();

    // Equalize the widths of menu items
    equalizeMenuItemWidths();
    centerSelectedItem();

    // // Center the initially selected item
    // const initialSelected = document.querySelector('.main-menu .select');
    // if (initialSelected) {
    //     centerSelectedItem(initialSelected);
    // }

    // Add event listeners to 'select-button' and resize event
    document.getElementById('select-button').addEventListener('click', clickSelectedLink);
    window.addEventListener('resize', function() {
        adjustLayout();
        adjustAnchorTextSize();
        equalizeMenuItemWidths();
        // Re-center the selected item after resizing
        const currentlySelected = document.querySelector('.main-menu .select');
        if (currentlySelected) {
            centerSelectedItem(currentlySelected);
        }
    });

    
});

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
// Assuming selectNewItem is a function that sets the 'select' class on the new item
function selectNewItem(newSelectedElement) {
    // Remove 'select' class from currently selected element, if it exists
    const currentlySelected = document.querySelector('.main-menu .select');
    if (currentlySelected) {
        currentlySelected.classList.remove('select');
    }
    // Add 'select' class to the new selected element
    newSelectedElement.classList.add('select');
    
    // Center the new selected item
    centerSelectedItem();
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

function selectNextLink() {
    const menuContainer = document.getElementById('link-container');
    const links = Array.from(menuContainer.getElementsByClassName('menu-item'));
    const currentIndex = links.findIndex(link => link.classList.contains('select'));
    const nextIndex = (currentIndex + 1) % links.length;
    const nextLink = links[nextIndex];

    updateSelectedLink(links[currentIndex], nextLink);
    shiftCarouselItem('next');
    centerSelectedItem(nextLink);
}




function selectPreviousLink() {
    const menuContainer = document.getElementById('link-container');
    const links = Array.from(menuContainer.getElementsByClassName('menu-item'));
    const currentIndex = links.findIndex(link => link.classList.contains('select'));
    const prevIndex = (currentIndex - 1 + links.length) % links.length;
    const prevLink = links[prevIndex];

    updateSelectedLink(links[currentIndex], prevLink);
    shiftCarouselItem('prev');
    centerSelectedItem(prevLink);
}

function shiftCarouselItem(direction) {
    const menu = document.querySelector('.main-menu');
    if (direction === 'next') {
        const firstItem = menu.children[0];
        menu.appendChild(firstItem);  // Move the first item to the end
    } else {
        const lastItem = menu.children[menu.children.length - 1];
        menu.insertBefore(lastItem, menu.children[0]);  // Move the last item to the start
    }
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

// // update Menu Position
// function centerSelectedItem(selectedItem) {
//     const menuContainer = document.querySelector('.main-menu');
//     const selectedItemOffset = selectedItem.offsetLeft;
//     const selectedItemWidth = selectedItem.offsetWidth;
//     const menuContainerWidth = menuContainer.offsetWidth;

//     // Calculate the scroll position to center the selected item
//     const scrollPosition = selectedItemOffset - (menuContainerWidth / 2) + (selectedItemWidth / 2);

//     // Smooth scroll to the new position
//     menuContainer.scrollTo({
//         left: scrollPosition,
//         behavior: 'smooth'
//     });
// }

// This function will center the selected menu item within the main-menu div.
function centerSelectedItem() {
    const menu = document.querySelector('.main-menu');
    const selectedItem = menu.querySelector('.select');

    // Calculate center position of the selected item
    const selectedItemRect = selectedItem.getBoundingClientRect();
    const menuRect = menu.getBoundingClientRect();

    // Calculate the offset needed to center the item
    const scrollLeft = selectedItemRect.left + (selectedItemRect.width / 2) - (menuRect.width / 2) - menuRect.left;
    
    // Apply the scroll
    menu.scrollLeft = scrollLeft;
}

function equalizeMenuItemWidths() {
    const menuContainer = document.querySelector('.main-menu');
    const menuItems = document.querySelectorAll('.menu-item');

    if (!menuContainer || menuItems.length === 0) return;

    // Calculate the width for each item
    const menuItemWidth = menuContainer.offsetWidth / menuItems.length;

    // Apply the calculated width to each menu item
    menuItems.forEach(item => {
        item.style.width = `${menuItemWidth}px`;
    });
}

// Call this function on DOMContentLoaded and on window resize
document.addEventListener('DOMContentLoaded', equalizeMenuItemWidths);
window.addEventListener('resize', equalizeMenuItemWidths);


// Add click event listener to a specific button to trigger clickSelectedLink
document.getElementById('select-button').addEventListener('click', clickSelectedLink);


// Add resize event listener to adjust layout and font size when window is resized
window.addEventListener('resize', function() {
    adjustLayout();
    adjustAnchorTextSize();
    centerSelectedItem();
    equalizeMenuItemWidths();
});


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

});

// Attach event listeners to all 'trigger' elements
document.querySelectorAll('.trigger.active.right').forEach(element => {
    element.addEventListener('click', selectNextLink);
});

document.querySelectorAll('.trigger.active.left').forEach(element => {
    element.addEventListener('click', selectPreviousLink);
});
