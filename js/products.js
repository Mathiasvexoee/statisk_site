const productContainer = document.querySelector(".productlist");

fetch("https://kea-alt-del.dk/t7/api/products")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((product) => {
      // TJEK OM PRODUKTET ER UDSOLGT
      let soldOutClass = product.soldout ? "udsolgt" : "";
      let soldOutLabel = product.soldout ? `<div class="sold_out_label">Udsolgt</div>` : "";

      // TJEK OM PRODUKTET ER NEDSAT
      let discountHTML = "";
      if (product.discount) {
        const newPrice = Math.round(product.price - (product.price * product.discount) / 100);

        discountHTML = `
            <p class="old_price">${product.price} kr</p>
            <p class="sale_price">${newPrice} kr</p>`;
      } else {
        discountHTML = `<p class="price">${product.price} kr</p>`;
      }
      productContainer.innerHTML += `
      <a href="produkt.html?id=${product.id}" class="product_card ${soldOutClass}">
          <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="${product.productdisplayname}" />
          <h2>${product.productdisplayname}</h2>
          ${discountHTML}
          ${soldOutLabel}
          </a>
      `;
    });
  });
