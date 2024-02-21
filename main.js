//main js
document.addEventListener('DOMContentLoaded', function() {
  console.log('we good')
  adjustAnchorTextSize();
  equalizeMenuItemWidths();
  adjustVH();

  // Select all menu items
  var menuItems = document.querySelectorAll('.menu-item');

  // Calculate the median index
  var medianIndex = Math.floor(menuItems.length / 2);

  // Add 'selected-item' class to the median item
  if(menuItems.length > 0) {
      menuItems[medianIndex].classList.add('selected-item');
  }

  updateMenuItemsClasses(); // Update the menu items classes for the curved appearance

// Center the initially selected item
  const initialSelected = document.querySelector('.main-menu .selected-item');
  if (initialSelected) {
    centerSelectedItem(initialSelected);
  }

});

//adjust the anchor text
function adjustAnchorTextSize() {
  // Adjust the font size of anchor tags based on the viewport width or other criteria
  const viewportWidth = window.innerWidth;
  const anchors = document.querySelectorAll('.menu-item');


  anchors.forEach(anchor => {
      // This is where the font size is set based on the viewport width
      const fontSize = Math.max(16, Math.min(24, viewportWidth / 100));
      anchor.style.fontSize = `${fontSize}px`;
  });
  selectedItem.forEach(anchor => {
    // This is where the font size is set based on the viewport width
    const fontSize = Math.max(32, Math.min(48, viewportWidth / 100));
    anchor.style.fontSize = `${fontSize}px`;
});
}

//updates the width of each menu item to be the same so it properly fits
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

//fix the ios issue regarding viewport height
function adjustVH() {
  // Adjust layout based on viewport size or other criteria
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Function to move the first item to the end of the menu
function rotateNext() {
  const menu = document.querySelector('.main-menu');
  const firstItem = menu.children[0];
  menu.appendChild(firstItem);  // Move the first item to the end
  selectNextLink(); // Implement this function to update the 'select' class
  updateMenuItemsClasses();
  adjustAnchorTextSize();
  centerSelectedItem(); // Center the new selected item

}

// Function to move the last item to the beginning of the menu
function rotatePrevious() {
  const menu = document.querySelector('.main-menu');
  const lastItem = menu.children[menu.children.length - 1];
  menu.insertBefore(lastItem, menu.firstChild);  // Move the last item to the start
  selectPreviousLink(); // Implement this function to update the 'select' class  
  updateMenuItemsClasses();
  adjustAnchorTextSize();
  centerSelectedItem(); // Center the new selected item
}

 // Selects the next link in the menu
function selectNextLink() {
  const menuContainer = document.getElementById('link-container');
  const links = Array.from(menuContainer.getElementsByClassName('menu-item'));
  const currentIndex = links.findIndex(link => link.classList.contains('selected-item'));
  const nextIndex = (currentIndex + 1) % links.length;
  const nextLink = links[nextIndex];

  if (currentIndex !== -1) {
    links[currentIndex].classList.remove('selected-item');
  }
  nextLink.classList.add('selected-item');

  updateMenuItemsClasses();
  centerSelectedItem(nextLink);

}

// Selects the previous link in the menu
function selectPreviousLink() {
  const menuContainer = document.getElementById('link-container');
  const links = Array.from(menuContainer.getElementsByClassName('menu-item'));
  const currentIndex = links.findIndex(link => link.classList.contains('selected-item'));
  const prevIndex = (currentIndex - 1 + links.length) % links.length;
  const prevLink = links[prevIndex];

  if (currentIndex !== -1) {
    links[currentIndex].classList.remove('selected-item');
  }
  prevLink.classList.add('selected-item');

  updateMenuItemsClasses();
  centerSelectedItem(prevLink);

}


// Update Menu Position to center the selected item
function centerSelectedItem(selectedItem) {
  const menuContainer = document.querySelector('.main-menu');
  const menuItems = document.querySelectorAll('.main-menu .menu-item');
  const selectedItem = document.querySelectorAll('.selected-item');
  const selectedItemOffset = selectedItem.offsetLeft;
  const selectedItemWidth = selectedItem.offsetWidth;
  const menuContainerWidth = menuContainer.offsetWidth;

  // Calculate the scroll position to center the selected item
  let scrollPosition = selectedItemOffset - (menuContainerWidth / 2) + (selectedItemWidth / 2);

    // Adjust for even number of menu items
    if (menuItems.length % 2 === 0) {
      scrollPosition -= selectedItemWidth / 2;
    }

  // Smooth scroll to the new position
  menuContainer.scrollTo({
    left: scrollPosition,
    behavior: 'smooth'
  });
}




//update menu items classes so i can create a perspective
function updateMenuItemsClasses() {
  
  const menuItems = document.querySelectorAll('.main-menu .menu-item');
  console.log(menuItems);
  const selectedIndex = Array.from(menuItems).findIndex(item => item.classList.contains('selected-item'));
  const itemCount = menuItems.length;
  console.log(itemCount);

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
      } else {
        //Ensure the selected itme does not have left or right classes
        item.classList.add('selected-item');
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
   // updateMenuItemsClasses();

  selectNextLink(); // This will update the selection based on the new order
  });
});

document.querySelectorAll('.trigger.active.left').forEach(element => {
  element.addEventListener('click', function() {
    rotatePrevious();     // This will move the first item to the end
   // updateMenuItemsClasses();

  selectPreviousLink(); // This will update the selection based on the new order
  });
});
window.addEventListener('resize', function() {
  console.log('resize-fired!');

  // Call the first function
  adjustAnchorTextSize();
  equalizeMenuItemWidths();
  updateSelectedLink(); // Implement this function to update the 'select' class
  centerSelectedItem(); // Center the new selected item
  adjustVH();
  equalizeMenuItemWidths();

});