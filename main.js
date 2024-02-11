// Initialization
document.addEventListener('DOMContentLoaded', function() {
    // Other initialization like adjusting layout and font size...
    adjustLayout();
    adjustAnchorTextSize();
    equalizeMenuItemWidths();
    centerSelectedItem();
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
      centerSelectedItem();
      // Re-center the selected item after resizing
      const currentlySelected = document.querySelector('.main-menu .select');
      if (currentlySelected) {
        centerSelectedItem(currentlySelected);
      }
    });
  
    // Ensure the menu items are equally spaced and the selected item is centered on load
    equalizeMenuItemWidths();
    centerSelectedItem(document.querySelector('.main-menu .select'));
  });
  
  // Selects the next link in the menu
  function selectNextLink() {
    const menuContainer = document.getElementById('link-container');
    const links = Array.from(menuContainer.getElementsByClassName('menu-item'));
    const currentIndex = links.findIndex(link => link.classList.contains('select'));
    const nextIndex = (currentIndex + 1) % links.length;
    const nextLink = links[nextIndex];
  
    updateSelectedLink(links[currentIndex], nextLink);
    centerSelectedItem(nextLink);
  }
  
  // Selects the previous link in the menu
  function selectPreviousLink() {
    const menuContainer = document.getElementById('link-container');
    const links = Array.from(menuContainer.getElementsByClassName('menu-item'));
    const currentIndex = links.findIndex(link => link.classList.contains('select'));
    const prevIndex = (currentIndex - 1 + links.length) % links.length;
    const prevLink = links[prevIndex];
  
    updateSelectedLink(links[currentIndex], prevLink);
    centerSelectedItem(prevLink);
  }
  
  function adjustLayout() {
    // Adjust layout based on viewport size or other criteria
    // This is just a placeholder function, you'll need to fill it with your own logic
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

  // Update the selected link class
  function updateSelectedLink(currentSelected, newSelected) {
    if (currentSelected) {
      currentSelected.classList.remove('select');
    }
    if (newSelected) {
      newSelected.classList.add('select');
    }
  }
  
  // Triggers a click event on the currently selected link
  function centerSelectedItem() {
    const menu = document.querySelector('.main-menu');
    const selectedItem = menu.querySelector('.select');
  
    // Ensure selectedItem exists
    if (!selectedItem) return;
  
    // Get the bounding rectangle of the selected item and the menu
    const selectedItemRect = selectedItem.getBoundingClientRect();
    const menuRect = menu.getBoundingClientRect();
  
    // Calculate the scroll position needed to center the selected item
    const scrollLeft = selectedItem.offsetLeft - (menuRect.width / 2) + (selectedItemRect.width / 2);
  
    // Scroll the menu to the calculated position
    menu.scrollLeft = scrollLeft;
  }
  
  // Equalizes the widths of menu items based on the number of items and container width
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

  function adjustAnchorTextSize() {
    // Adjust the font size of anchor tags based on the viewport width or other criteria
    // This is just a placeholder function, you'll need to fill it with your own logic
    const viewportWidth = window.innerWidth;
    const anchors = document.querySelectorAll('a');

    anchors.forEach(anchor => {
        // Apply some font resizing logic depending on your requirements
        // This is a simple example where the font size is set based on the viewport width
        const fontSize = Math.max(16, Math.min(24, viewportWidth / 100));
        anchor.style.fontSize = `${fontSize}px`;
    });
}
  
  // Attach event listeners to all 'trigger' elements
  document.querySelectorAll('.trigger.active.right').forEach(element => {
    element.addEventListener('click', selectNextLink);
  });
  
  document.querySelectorAll('.trigger.active.left').forEach(element => {
    element.addEventListener('click', selectPreviousLink);
  });
  