// Define Functions 


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


// Attach event listeners to all 'trigger' elements
 document.querySelectorAll('.trigger.active.right').forEach(element => {
  element.addEventListener('click', selectNextLink);
});

document.querySelectorAll('.trigger.active.left').forEach(element => {
  element.addEventListener('click', selectPreviousLink);
});