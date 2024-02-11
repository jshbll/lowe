// Initialization
document.addEventListener('DOMContentLoaded', function() {
    // Other initialization like adjusting layout and font size...
    adjustLayout();
    adjustAnchorTextSize();
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
  function clickSelectedLink() {
    const selectedLink = document.querySelector('#link-container a.select');
    if (selectedLink) {
      selectedLink.click();
    }
  }
  
  // Update Menu Position to center the selected item
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
  
  // Attach event listeners to all 'trigger' elements
  document.querySelectorAll('.trigger.active.right').forEach(element => {
    element.addEventListener('click', selectNextLink);
  });
  
  document.querySelectorAll('.trigger.active.left').forEach(element => {
    element.addEventListener('click', selectPreviousLink);
  });
  