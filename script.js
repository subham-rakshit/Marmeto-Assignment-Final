async function getData() {
  try {
    const apiUrl =
      "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json";
    const response = await fetch(apiUrl);

    if (response.status) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(`Error! Reasone: ${response.status}`);
    }
  } catch (e) {
    console.log(`Error message: ${e}`);
  }
}

async function main() {
  let data = await getData();
  //   console.log(data.categories.length);

  //Creating Tab Items -->
  data.categories.map((eachItem) => {
    let tabContainerElm = document.getElementById("tabContainer");
    let tabItemElm = document.createElement("li");
    tabItemElm.className = "tab-item-style";
    tabContainerElm.appendChild(tabItemElm);

    let tabBtnElm = document.createElement("button");
    tabBtnElm.className = "tab-btn-style";
    tabBtnElm.dataset.tab = eachItem.category_name;
    tabBtnElm.textContent = eachItem.category_name;
    tabBtnElm.type = "button";
    tabItemElm.appendChild(tabBtnElm);
  });

  // Creating Product Lists -->
  data.categories.map((eachItem) => {
    let categoryProductList = eachItem.category_products;
    let listMainContainer = document.getElementById("listContainer");

    //Creating List Container for each category -->
    let listCateroyContainer = document.createElement("li");
    listCateroyContainer.className = "list-by-category";
    listCateroyContainer.id = eachItem.category_name;
    listMainContainer.appendChild(listCateroyContainer);
    // console.log(categoryProductList);

    //Creating Product Lists for each category -->
    categoryProductList.map((eachProduct) => {
      // console.log(eachProduct);

      //Creating each Product card -->
      let listElm = document.createElement("div");
      listElm.className = "list-card";
      listCateroyContainer.appendChild(listElm);

      //Creating Image Container -->
      let imgContainer = document.createElement("div");
      imgContainer.className = "img-container";
      listElm.appendChild(imgContainer);

      //Creating each Product Img inside that card -->

      let listImgElm = document.createElement("img");
      listImgElm.className = "list-img-style";
      listImgElm.src = eachProduct.image;
      listImgElm.alt = eachProduct.title;
      imgContainer.appendChild(listImgElm);

      //Creating badge text -->
      if (eachProduct.badge_text !== null) {
        let badgeText = document.createElement("p");
        badgeText.className = "badge-text";
        badgeText.textContent = eachProduct.badge_text;
        imgContainer.appendChild(badgeText);
      }

      //Creating title container inside that card -->
      let titleContainer = document.createElement("div");
      titleContainer.className = "title-container";
      listElm.appendChild(titleContainer);

      //Creating title name of each product -->
      let listTitleElm = document.createElement("p");
      listTitleElm.className = "title";
      let titleValue =
        eachProduct.title.length > 10
          ? `${eachProduct.title.slice(0, 10)}...`
          : eachProduct.title;
      listTitleElm.textContent = titleValue;
      titleContainer.appendChild(listTitleElm);

      //Creating vendor name of each product -->
      let vendorElm = document.createElement("p");
      vendorElm.className = "vendor-name";
      vendorElm.textContent = eachProduct.vendor;
      titleContainer.appendChild(vendorElm);

      //Creating price container of each product -->
      let priceContainer = document.createElement("div");
      priceContainer.className = "price-container";
      listElm.appendChild(priceContainer);

      //Creating price new amount of each product -->
      let priceValue = document.createElement("p");
      priceValue.className = "price-value";
      priceValue.textContent = `Rs ${eachProduct.price}.00`;
      priceContainer.appendChild(priceValue);

      //Creating compare price amount of each product -->
      let comparePriceValue = document.createElement("p");
      comparePriceValue.className = "compare-price-value";
      comparePriceValue.textContent = `${eachProduct.compare_at_price}.00`;
      priceContainer.appendChild(comparePriceValue);

      //Creating discount amount of each product -->
      let priceComparision = document.createElement("p");
      priceComparision.className = "price-compare";
      let discount = Math.floor(
        ((parseInt(eachProduct.compare_at_price) -
          parseInt(eachProduct.price)) /
          eachProduct.compare_at_price) *
          100
      );
      // console.log(discount);
      priceComparision.textContent = `${discount}% Off`;
      priceContainer.appendChild(priceComparision);

      //Button -->
      let btnElm = document.createElement("button");
      btnElm.type = "button";
      btnElm.textContent = "Add to Cart";
      btnElm.className = "btn-style";
      listElm.appendChild(btnElm);
    });
  });

  let tabBtnArr = document.querySelectorAll(".tab-btn-style");
  // console.log(tabBtnArr);

  //Ittration btw all button array -->
  for (let i = 0; i < tabBtnArr.length; i++) {
    //Add click event for each btn -->
    tabBtnArr[i].addEventListener("click", function () {
      //Get data-tab attribute value when btn clicks-->
      let tabName = this.dataset.tab;
      //Get tabContent related to which btn is clicked -->
      let tabContent = document.getElementById(tabName);

      //Getting all tabContent and tabBtn array -->
      let allTabContent = document.querySelectorAll(".list-by-category");
      let allBtn = document.querySelectorAll(".tab-btn-style");

      //Initiate all tabContent visibility none -->
      for (let j = 0; j < allTabContent.length; j++) {
        allTabContent[j].style.display = "none";
      }

      //Initiate all tabBtn initial style -->
      for (let k = 0; k < allBtn.length; k++) {
        allBtn[k].style.backgroundColor = "transparent";
        allBtn[k].style.color = "rgb(51, 50, 50)";
      }

      //Getting tabContent visible according to which btn is clicked -->
      tabContent.style.display = "flex";

      //Getting tabBtn style changed aacording to its click event -->
      this.style.backgroundColor = "black";
      this.style.color = "white";
    });
  }

  document.querySelector(".tab-btn-style").click();
}

main();
