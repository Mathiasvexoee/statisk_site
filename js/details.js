const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const productContainer = document.querySelector(".product_page");

fetch(`https://kea-alt-del.dk/t7/api/products/${id}`)
  .then((response) => response.json())
  .then((product) => {
    // TJEK OM PRODUKTET ER UDSOLGT
    let soldOutLabel = product.soldout ? `<div class="sold_out_label">Udsolgt</div>` : "";

    // TJEK OM PRODUKTET ER NEDSAT
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

    // INDSÆT HELE PRODUKTET
    productContainer.innerHTML = `
      <h2>${product.productdisplayname}</h2>

      <div class="product_content">
        <div class="product_image">
          <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" 
               alt="${product.productdisplayname}" />
        </div>

        <div class="product_info">
        <p><strong>Type:</strong> ${product.subcategory}</p>
          <p><strong>Brand:</strong> ${product.brandname}</p>
          <p><strong>Kategori:</strong> ${product.articletype}</p>
          <p>${product.description}</p>

          ${discountHTML}
          ${soldOutLabel}

          <button>Læg i kurv</button>
        </div>
      </div>
    `;
  });
