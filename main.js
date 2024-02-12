document.addEventListener('DOMContentLoaded', function() {
  adjustAnchorTextSize();
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
   updateMenuItemsClasses();
});


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

function equalizeMenuItemWidths() {
  const menuContainer = document.querySelector('.main-menu');
  const menuItems = document.querySelectorAll('.main-menu .menu-item');
  const selectIndicator = document.querySelectorAll('.selection-indicator');
  if (menuContainer && menuItems.length > 0) {
      const totalWidth = menuContainer.offsetWidth;
      const equalWidth = totalWidth / menuItems.length;

      menuItems.forEach(item => {
          item.style.width = `${equalWidth}px`;
      });
      selectIndicator.forEach(item => {
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
  updateMenuItemsClasses();
}

// Function to move the last item to the beginning of the menu
function rotatePrevious() {
  const menu = document.querySelector('.main-menu');
  const lastItem = menu.children[menu.children.length - 1];
  menu.insertBefore(lastItem, menu.firstChild);  // Move the last item to the start
  updateSelectedLink(); // Implement this function to update the 'select' class
  centerSelectedItem(); // Center the new selected item
  updateMenuItemsClasses();
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
  updateMenuItemsClasses();
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
  updateMenuItemsClasses();
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

//update menu items classes so i can create a perspective
function updateMenuItemsClasses() {
  const menuItems = document.querySelectorAll('.main-menu .menu-item');
  const selectedIndex = Array.from(menuItems).findIndex(item => item.classList.contains('select'));
  const itemCount = menuItems.length;

  menuItems.forEach((item, index) => {
      // Clear previous classes and transform
      item.className = 'menu-item';
      item.style.transform = '';

      // Calculate distance from the selected index
      const distance = Math.abs(index - selectedIndex);
      const leftOrRightClass = index < selectedIndex ? 'left' : 'right';

      // Add classes based on the position relative to selectedIndex
      if (index !== selectedIndex) {
          item.classList.add(`${leftOrRightClass}-${distance}`);
      }

      // Calculate and set translateY for curved appearance
      const translateYValue = calculateTranslateY(distance, itemCount);
      item.style.transform = `translateY(${translateYValue}vw)`;
  });
}

function calculateTranslateY(distance, itemCount) {
  // Adjust the intensity and max curvature as needed
  const curveIntensity = 0.5; // Adjust this value for more/less curve
  const maxCurve = 180; // Max curve angle, adjust as needed
  const angleStep = maxCurve / itemCount;

  return curveIntensity * Math.sin(angleStep * distance * Math.PI / 180);
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
  adjustAnchorTextSize();
  equalizeMenuItemWidths();
  centerSelectedItem(); // Center the new selected item
  updateSelectedLink(); // Implement this function to update the 'select' class
  adjustLayout();
  equalizeMenuItemWidths();

});