document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const searchParam = urlParams.get("search");
  const recipeList = document.getElementById("recipe-list");
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("apply-search");
  const overlay = document.getElementById("overlay");
  const popup = document.getElementById("search-popup");


  const suggestionsBox = document.createElement("ul");
  suggestionsBox.id = "suggestions-box";
  suggestionsBox.style.listStyle = "none";
  suggestionsBox.style.padding = "0";
  suggestionsBox.style.marginTop = "8px";
  suggestionsBox.style.backgroundColor = "#fff";
  suggestionsBox.style.border = "1px solid #ccc";
  suggestionsBox.style.borderRadius = "6px";
  suggestionsBox.style.maxHeight = "180px";
  suggestionsBox.style.overflowY = "auto";
  suggestionsBox.style.fontFamily = "Nunito, sans-serif";
  suggestionsBox.style.fontSize = "16px";
  suggestionsBox.style.position = "absolute";
  suggestionsBox.style.width = "100%";
  suggestionsBox.style.display = "none"; 
  searchInput.insertAdjacentElement("afterend", suggestionsBox);

  const MAX_INITIAL_DISPLAY = 6;
  let currentRecipes = [];
  let displayedCount = 0;

  const showMoreButton = document.createElement("button");
  showMoreButton.textContent = "Show More";
  showMoreButton.className = "btn-outline";
  showMoreButton.style.margin = "30px auto 60px";
  showMoreButton.style.display = "none";

  showMoreButton.addEventListener("click", () => {
    displayRecipes(currentRecipes, displayedCount);
  });

  if (recipeList) {
    recipeList.insertAdjacentElement("afterend", showMoreButton);
  }

  const recipes = [
    { name: "Pumpkin Muffin", image: "images/pumpkin_muffin.jpg", link: "pumpkin_muffin.html" },
    { name: "Banana Biscuit", image: "images/banana_biscuit.jpg", link: "banana_biscuit.html" },
    { name: "Apple Tart", image: "images/apple_tart.jpg", link: "apple_tart.html" },
    { name: "Sweet Potato Cheese Biscuit", image: "images/sweet_potato_cheese.jpg", link: "sweet_potato_cheese.html" },
    { name: "Carrot Apple Biscuit", image: "images/carrot_apple_biscuit.jpg", link: "carrot_apple_biscuit.html" },
    { name: "Blueberry Oat Muffin", image: "images/blueberry_oat_muffin.jpg", link: "blueberry_oat_muffin.html" },
    { name: "Cranberry Banana Cookie", image: "images/cranberry_banana_cookie.jpg", link: "cranberry_banana_cookie.html" },
    { name: "Mango Coconut Tart", image: "images/mango_coconut_tart.jpg", link: "mango_coconut_tart.html" },
    { name: "Peanut Pumpkin Cookie", image: "images/peanut_pumpkin_cookie.jpg", link: "peanut_pumpkin_cookie.html" }
  ];

  function displayRecipes(recipeArray, start = 0) {
    if (!recipeList) return;

    const end = start + MAX_INITIAL_DISPLAY;
    const toDisplay = recipeArray.slice(start, end);
    displayedCount = end;

    toDisplay.forEach(recipe => {
      const item = document.createElement("div");
      item.className = "recipe-item";
      item.innerHTML = `
        <a href="${recipe.link}">
          <img src="${recipe.image}" alt="${recipe.name}" />
          <h3>${recipe.name}</h3>
        </a>
      `;
      recipeList.appendChild(item);
    });

    if (displayedCount < recipeArray.length) {
      showMoreButton.style.display = "block";
    } else {
      showMoreButton.style.display = "none";
    }
  }

  function searchRecipes(keyword) {
    const filtered = recipes.filter(recipe =>
      recipe.name.toLowerCase().includes(keyword.toLowerCase())
    ).sort((a, b) => a.name.localeCompare(b.name));

    recipeList.innerHTML = "";
    displayedCount = 0;
    currentRecipes = filtered;

    if (filtered.length === 0) {
      recipeList.innerHTML = "<p style='text-align:center;'>No recipes found.</p>";
      showMoreButton.style.display = "none";
    } else {
      displayRecipes(filtered);
    }
  }

  if (searchParam && searchInput && recipeList) {
    searchInput.value = searchParam;
    searchRecipes(searchParam);
  } else if (!searchParam && recipeList) {
    currentRecipes = [...recipes].sort((a, b) => a.name.localeCompare(b.name));
    displayRecipes(currentRecipes);
  }

  searchButton?.addEventListener("click", function () {
    const keyword = searchInput.value.trim().toLowerCase();
    if (keyword) {
      window.location.href = `recipes.html?search=${encodeURIComponent(keyword)}`;
    }
  });

  searchInput?.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      searchButton.click();
    }
  });

  overlay?.addEventListener("click", function (e) {
    if (e.target === overlay) {
      overlay.style.display = "none";
      popup.style.display = "none";
    }
  });


  searchInput?.addEventListener("input", function () {
    const inputValue = this.value.toLowerCase();
    suggestionsBox.innerHTML = "";

    if (inputValue.length === 0) {
      suggestionsBox.style.display = "none";
      return;
    }

    const matches = recipes.filter(recipe =>
      recipe.name.toLowerCase().includes(inputValue)
    );

    if (matches.length === 0) {
      suggestionsBox.style.display = "none";
      return;
    }

    suggestionsBox.style.display = "block";

    matches.forEach(recipe => {
      const suggestionItem = document.createElement("li");
      const suggestionLink = document.createElement("a");
      suggestionLink.href = recipe.link;
      suggestionLink.textContent = recipe.name;
      suggestionLink.style.display = "block";
      suggestionLink.style.padding = "10px";
      suggestionLink.style.textDecoration = "none";
      suggestionLink.style.color = "#4B1E0E";
      suggestionLink.addEventListener("mouseover", () => {
        suggestionLink.style.backgroundColor = "#f0f0f0";
      });
      suggestionLink.addEventListener("mouseout", () => {
        suggestionLink.style.backgroundColor = "#fff";
      });

      suggestionItem.appendChild(suggestionLink);
      suggestionsBox.appendChild(suggestionItem);
    });
  });
});


document.getElementById("search-btn").addEventListener("click", function () {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("search-popup").style.display = "block";



  const feedbackInput = document.getElementById("feedback-text");
  const feedbackBtn = document.getElementById("submit-feedback");
  const feedbackList = document.getElementById("feedback-list");

  const pageId = window.location.pathname.split("/").pop().replace(".html", "");
  const storageKey = `myFeedback_${pageId}`;
  const saved = localStorage.getItem(storageKey);

  if (saved && feedbackList) {
    const li = document.createElement("li");
    li.textContent = saved;
    feedbackList.appendChild(li);
  }

  feedbackBtn?.addEventListener("click", () => {
    const text = feedbackInput.value.trim();
    if (text && feedbackList) {
      localStorage.setItem(storageKey, text);
      feedbackList.innerHTML = "";
      const li = document.createElement("li");
      li.textContent = text;
      feedbackList.appendChild(li);
      feedbackInput.value = "";
    }
  });


});
document.addEventListener("DOMContentLoaded", () => {
  const stars = document.querySelectorAll("#star-rating span");
  const output = document.getElementById("rating-output");
  const pageId = window.location.pathname.split("/").pop().replace(".html", "");
  const ratingKey = `myRating_${pageId}`;

  const savedRating = localStorage.getItem(ratingKey);
  if (savedRating) {
    updateStars(savedRating);
    output.textContent = `You rated this recipe: ${savedRating} / 5 🐾`;
  }

  stars.forEach(star => {
    star.addEventListener("click", () => {
      const rating = star.getAttribute("data-value");
      localStorage.setItem(ratingKey, rating);
      updateStars(rating);
      output.textContent = `You rated this recipe: ${rating} / 5 🐾`;
    });
  });

  function updateStars(rating) {
    stars.forEach(star => {
      const value = star.getAttribute("data-value");
      if (value <= rating) {
        star.textContent = "🐾";
        star.classList.add("active");
      } else {
        star.textContent = "☆";
        star.classList.remove("active");
      }
    });
  }
});

