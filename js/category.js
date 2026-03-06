const categoryContainer = document.querySelector(".category_list_container");

// const categories = ["Accessories", "Apparel", "Footwear", "Free Items", "Personal Care", "Sporting Goods"];

// console.log("category:", categories[0]);

document.querySelector(".back_btn").addEventListener("click", goBack);
function goBack() {
  history.back();
}

fetch("https://kea-alt-del.dk/t7/api/categories")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((category) => {
      categoryContainer.innerHTML += `
        <a href="produktliste.html?category=${category.category}" 
           class="category_card">
          ${category.category}
        </a>
      `;
    });
  });
