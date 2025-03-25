document.addEventListener("DOMContentLoaded", function () {
  const recipeList = document.getElementById("recipe-list");
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("apply-search");

  // 레시피 데이터 목록
const recipes = [
  {
    name: "Pumpkin Muffin",
    image: "images/pumpkin_muffin.jpg",
    link: "pumpkin_muffin.html"
  },
  {
    name: "Banana Biscuit",
    image: "images/banana_biscuit.jpg",
    link: "banana_biscuit.html"
  },
  {
    name: "Apple Tart",
    image: "images/apple_tart.jpg",
    link: "apple_tart.html"
  },
  {
    name: "Sweet Potato Cheese Biscuit",
    image: "images/sweet_potato_cheese.jpg",
    link: "sweet_potato_cheese.html"
  },
  {
    name: "Carrot Apple Biscuit",
    image: "images/carrot_apple_biscuits.jpg",
    link: "carrot_apple_biscuits.html"
  }
];


  // 레시피를 화면에 출력하는 함수
  function displayRecipes(filtered) {
    recipeList.innerHTML = ""; // 기존 내용 제거

    if (filtered.length === 0) {
      recipeList.innerHTML = `<p style="text-align:center; font-family:'Nunito';">No recipes found.</p>`;
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

  // 검색 버튼 클릭 시 실행
  searchButton.addEventListener("click", function () {
    const keyword = searchInput.value.toLowerCase();
    const filtered = recipes.filter(recipe =>
      recipe.name.toLowerCase().includes(keyword)
    );
    displayRecipes(filtered);

    // 팝업 닫기
    document.getElementById("overlay").style.display = "none";
    document.getElementById("search-popup").style.display = "none";
  });

  // Enter 키로 검색 작동
  searchInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      searchButton.click();
    }
  });

  // 페이지 처음 열릴 때 전체 레시피 출력
  displayRecipes(recipes);
});

// 검색 버튼 누르면 팝업 열기
document.getElementById("search-btn").addEventListener("click", function () {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("search-popup").style.display = "block";
});
