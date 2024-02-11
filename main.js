




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

// update Menu Position
function centerSelectedItem(selectedItem) {
    const menuContainer = document.querySelector('.main-menu');
    const selectedItemOffset = selectedItem.offsetLeft;
    const selectedItemWidth = selectedItem.offsetWidth;
    const menuContainerWidth = menuContainer.offsetWidth;

    // Calculate the scroll position to center the selected item
    const scrollPosition = selectedItemOffset - (menuContainerWidth / 2) + (selectedItemWidth / 2);

    // Smooth scroll to the new position
    menuContainer.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
    });
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

  

