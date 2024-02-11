document.addEventListener('DOMContentLoaded', function() {
  // Select all menu items
  var menuItems = document.querySelectorAll('.menu-item');

  // Calculate the median index
  var medianIndex = Math.floor(menuItems.length / 2);

  // Remove 'select' class from all items, just in case there's one already set
  menuItems.forEach(function(item) {
      item.classList.remove('select');
  });

  // Add 'select' class to the median item
  // This also checks if the menuItems collection is not empty
  if(menuItems.length > 0) {
      menuItems[medianIndex].classList.add('select');
  }
});


// Define Functions 


 // Selects the next link in the menu
 function selectNextLink() {
  const menuContainer = document.getElementById('link-container');
  const links = Array.from(menuContainer.getElementsByClassName('menu-item'));
  const currentIndex = links.findIndex(link => link.classList.contains('select'));
  const nextIndex = (currentIndex + 1) % links.length;
  const nextLink = links[nextIndex];
  updateSelectedLink(links[currentIndex], nextLink);

}

// Selects the previous link in the menu
function selectPreviousLink() {
  const menuContainer = document.getElementById('link-container');
  const links = Array.from(menuContainer.getElementsByClassName('menu-item'));
  const currentIndex = links.findIndex(link => link.classList.contains('select'));
  const prevIndex = (currentIndex - 1 + links.length) % links.length;
  const prevLink = links[prevIndex];
  updateSelectedLink(links[currentIndex], prevLink);
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

  
// Attach event listeners to all 'trigger' elements
 document.querySelectorAll('.trigger.active.right').forEach(element => {
  element.addEventListener('click', selectNextLink);
});

document.querySelectorAll('.trigger.active.left').forEach(element => {
  element.addEventListener('click', selectPreviousLink);
});