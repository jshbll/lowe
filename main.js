document.addEventListener('DOMContentLoaded', function() {
  // Select all menu items
  var menuItems = document.querySelectorAll('.menu-item');

  // Calculate the median index
  var medianIndex = Math.floor(menuItems.length / 2);
    equalizeMenuItemWidths();

  // Remove 'select' class from all items, just in case there's one already set
  menuItems.forEach(function(item) {
      item.classList.remove('select');
  });
    equalizeMenuItemWidths();

  // Add 'select' class to the median item
  // This also checks if the menuItems collection is not empty
  if(menuItems.length > 0) {
      menuItems[medianIndex].classList.add('select');
  }
   // Center the initially selected item
   const initialSelected = document.querySelector('.main-menu .select');
   if (initialSelected) {
     centerSelectedItem(initialSelected);
   
       equalizeMenuItemWidths();
 }
   centerSelectedItem(); // Center the new selected item
   updateSelectedLink(); // Implement this function to update the 'select' class
   adjustLayout();

});

function equalizeMenuItemWidths() {
  const menuContainer = document.querySelector('.main-menu');
  const menuItems = document.querySelectorAll('.main-menu .menu-item');

  if (menuContainer && menuItems.length > 0) {
      const totalWidth = menuContainer.offsetWidth;
      const equalWidth = totalWidth / menuItems.length;

      menuItems.forEach(item => {
          item.style.width = `${equalWidth}px`;
      });
  }
}

function adjustLayout() {
  // Adjust layout based on viewport size or other criteria
  // This is just a placeholder function, you'll need to fill it with your own logic
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
// Define Functions 

// Function to move the first item to the end of the menu
function rotateNext() {
  const menu = document.querySelector('.main-menu');
  const firstItem = menu.children[0];
  menu.appendChild(firstItem);  // Move the first item to the end
  updateSelectedLink(); // Implement this function to update the 'select' class
  centerSelectedItem(); // Center the new selected item
}

// Function to move the last item to the beginning of the menu
function rotatePrevious() {
  const menu = document.querySelector('.main-menu');
  const lastItem = menu.children[menu.children.length - 1];
  menu.insertBefore(lastItem, menu.firstChild);  // Move the last item to the start
  updateSelectedLink(); // Implement this function to update the 'select' class
  centerSelectedItem(); // Center the new selected item
}


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

  // Update the selected link class
  function updateSelectedLink(currentSelected, newSelected) {
    if (currentSelected) {
      currentSelected.classList.remove('select');
    }
    if (newSelected) {
      newSelected.classList.add('select');
    }
  }

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

  
// Attach event listeners to all 'trigger' elements
 document.querySelectorAll('.trigger.active.right').forEach(element => {
  element.addEventListener('click', function() {
    rotateNext();     // This will move the first item to the end
    selectNextLink(); // This will update the selection based on the new order
  });
});

document.querySelectorAll('.trigger.active.left').forEach(element => {
  element.addEventListener('click', function() {
    rotatePrevious();     // This will move the first item to the end
    selectPreviousLink(); // This will update the selection based on the new order
  });
});
window.addEventListener('resize', function() {
  console.log('resize-fired!');

  // Call the first function
  equalizeMenuItemWidths();
  centerSelectedItem(); // Center the new selected item
  updateSelectedLink(); // Implement this function to update the 'select' class
  adjustLayout();
  equalizeMenuItemWidths();

});