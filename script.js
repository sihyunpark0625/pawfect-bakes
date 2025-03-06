document.addEventListener("DOMContentLoaded", function() {
  
  // Ensure search popup exists globally and is identical on all pages
  function createSearchPopup() {
    if (!document.getElementById("search-popup")) {
      const popupHtml = `
        <div id="overlay"></div>
        <div id="search-popup">
          <h3>Search & Filter Recipes</h3>
          <input type="text" id="search-input" placeholder="Type to search...">
          <h4>Category</h4>
          <div class="filter-options">
            <label><input type="checkbox" class="filter-category" value="Bread"> Bread</label>
            <label><input type="checkbox" class="filter-category" value="Cookie"> Cookie</label>
            <label><input type="checkbox" class="filter-category" value="Frozen"> Frozen</label>
            <label><input type="checkbox" class="filter-category" value="All" checked> All</label>
          </div>
          <h4>Exclude Ingredients</h4>
          <div class="filter-options scrollable">
            <label><input type="checkbox" class="filter-without" value="Whole wheat flour"> Whole wheat flour</label>
            <label><input type="checkbox" class="filter-without" value="Oat flours"> Oat flours</label>
            <label><input type="checkbox" class="filter-without" value="Greek yogurt"> Greek yogurt</label>
            <label><input type="checkbox" class="filter-without" value="Cottage cheese"> Cottage cheese</label>
            <label><input type="checkbox" class="filter-without" value="Low-fat cheese"> Low-fat cheese</label>
            <label><input type="checkbox" class="filter-without" value="Eggs"> Eggs</label>
            <label><input type="checkbox" class="filter-without" value="Peanut butter"> Peanut butter</label>
            <label><input type="checkbox" class="filter-without" value="Chicken"> Chicken</label>
            <label><input type="checkbox" class="filter-without" value="Chicken powder"> Chicken powder</label>
            <label><input type="checkbox" class="filter-without" value="Beef"> Beef</label>
            <label><input type="checkbox" class="filter-without" value="Soy"> Soy</label>
            <label><input type="checkbox" class="filter-without" value="Corn"> Corn</label>
          </div>
          <h4>Use</h4>
          <div class="filter-options">
            <label><input type="checkbox" class="filter-equipment" value="Oven"> Oven</label>
            <label><input type="checkbox" class="filter-equipment" value="Microwave"> Microwave</label>
            <label><input type="checkbox" class="filter-equipment" value="Air Fryer"> Air Fryer</label>
            <label><input type="checkbox" class="filter-equipment" value="Freezer"> Freezer</label>
            <label><input type="checkbox" class="filter-equipment" value="All" checked> All</label>
          </div>
          <button id="apply-search">Apply & Close</button>
        </div>
      `;
      document.body.insertAdjacentHTML("beforeend", popupHtml);
    }
  }

  createSearchPopup();

  const searchPopup = document.getElementById("search-popup");
  const overlay = document.getElementById("overlay");
  const searchBtn = document.getElementById("search-btn");
  const applyBtn = document.getElementById("apply-search");

  // Open Search Popup globally on all pages
  function openSearch() {
    searchPopup.style.display = "block";
    overlay.style.display = "block";
  }

  // Close Search Popup when clicking outside
  function closeSearch(event) {
    if (!searchPopup.contains(event.target) && event.target !== searchBtn) {
      searchPopup.style.display = "none";
      overlay.style.display = "none";
    }
  }

  document.addEventListener("click", closeSearch);

  // Attach event listeners
  if (searchBtn) searchBtn.addEventListener("click", openSearch);
  if (applyBtn) applyBtn.addEventListener("click", closeSearch);
});

