
document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const searchParam = urlParams.get("search");
  const recipeList = document.getElementById("recipe-list");
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("apply-search");
  const overlay = document.getElementById("overlay");
  const popup = document.getElementById("search-popup");


  // 자동완성 영역 생성
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
  searchInput.insertAdjacentElement("afterend", suggestionsBox);

  const recipes = [
    { name: "Pumpkin Muffin", image: "images/pumpkin_muffin.jpg", link: "pumpkin_muffin.html" },
    { name: "Banana Biscuit", image: "images/banana_biscuit.jpg", link: "banana_biscuit.html" },
    { name: "Apple Tart", image: "images/apple_tart.jpg", link: "apple_tart.html" },
    { name: "Sweet Potato Cheese Biscuit", image: "images/sweet_potato_cheese.jpg", link: "sweet_potato_cheese.html" },
    { name: "Carrot Apple Biscuit", image: "images/carrot_apple_biscuits.jpg", link: "carrot_apple_biscuits.html" }
  ];

  function displayRecipes(filtered) {
    if (!recipeList) return;
    recipeList.innerHTML = "";
    if (filtered.length === 0) {
      recipeList.innerHTML = "<p style='text-align:center;'>No recipes found.</p>";
    }
    filtered.forEach(recipe => {
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
  }

// ✅ 검색어가 있는 경우에만 검색 실행
if (searchParam && searchInput && recipeList) {
  searchInput.value = searchParam;

  const filtered = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchParam.toLowerCase())
  );
  displayRecipes(filtered);
}
if (!searchParam && recipeList) {
  displayRecipes(recipes);
}

  // 🔴 아래는 전체 레시피 표시 제거됨 (검색어 없는 경우엔 아무것도 안 보여줌)
  // else {
  //   displayRecipes(recipes);
  // }

  searchButton.addEventListener("click", function () {
    const keyword = searchInput.value.trim().toLowerCase();
    if (keyword) {
      window.location.href = `recipes.html?search=${encodeURIComponent(keyword)}`;
    }
  });

  searchInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      searchButton.click();
    }
  });

  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) {
      overlay.style.display = "none";
      popup.style.display = "none";
    }
  });

  searchInput.addEventListener("input", function () {
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

// 팝업 열기
document.getElementById("search-btn").addEventListener("click", function () {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("search-popup").style.display = "block";
});
