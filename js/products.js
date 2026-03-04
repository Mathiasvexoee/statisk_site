const productContainer = document.querySelector(".productlist");
const heading = document.querySelector("main h2");

// HENT KATEGORI FRA URL
const params = new URLSearchParams(window.location.search);
const selectedCategory = params.get("category");

// ÆNDR H2 HVIS DER ER VALGT KATEGORI
if (selectedCategory) {
  heading.textContent = selectedCategory;
} else {
  heading.textContent = "Alle produkter";
}

// BYG URL (med eller uden kategori)
const url = selectedCategory ? `https://kea-alt-del.dk/t7/api/products?category=${selectedCategory}&limit=25` : "https://kea-alt-del.dk/t7/api/products";

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    productContainer.innerHTML = "";

    if (data.length === 0) {
      productContainer.innerHTML = "<p>Ingen produkter fundet.</p>";
      return;
    }

    data.forEach((product) => {
      let soldOutClass = product.soldout ? "udsolgt" : "";
      let soldOutLabel = product.soldout ? `<div class="sold_out_label">Udsolgt</div>` : "";

      let discountHTML = "";

      if (product.discount) {
        const newPrice = Math.round(product.price - (product.price * product.discount) / 100);

        discountHTML = `
          <p class="old_price">${product.price} kr</p>
          <p class="sale_price">${newPrice} kr</p>
        `;
      } else {
        discountHTML = `<p class="price">${product.price} kr</p>`;
      }

      productContainer.innerHTML += `
        <a href="produkt.html?id=${product.id}" class="product_card ${soldOutClass}">
          <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp"
               alt="${product.productdisplayname}" />
          <h2>${product.productdisplayname}</h2>
          ${discountHTML}
          ${soldOutLabel}
        </a>
      `;
    });
  })
  .catch((error) => {
    productContainer.innerHTML = "<p>Der skete en fejl ved hentning af produkter.</p>";
    console.error("Fejl:", error);
  });
