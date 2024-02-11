
// Initialization
document.addEventListener('DOMContentLoaded', function() {
    // Clone items for the carousel loop
    cloneMenuItemsForLoop();

    // Adjust layout to fit the viewport height
    adjustLayout();

    // Adjust the font size of anchor tags based on the viewport width
    adjustAnchorTextSize();

    // Equalize the widths of menu items
    equalizeMenuItemWidths();

    // Center the initially selected item
    const initialSelected = document.querySelector('.main-menu .select');
    if (initialSelected) {
        centerSelectedItem(initialSelected);
    }

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

    // Enter full screen mode if needed
    enterFullScreen();
});


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

