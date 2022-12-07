
function selectFiles() {
    var name = document.getElementById('fileInput'); 
    console.log(name.files)
    //alert('Selected file: ' + name.files.item(0).name);
    
}

const productForm = document.getElementById("addProdForm");

productForm.addEventListener("click", () => {
    let productName = document.getElementById("prd-name").value;
    let productQty = document.getElementById("prd-qty").value;
    let productBrand = document.getElementById("prd-brd").value;
    let productGender = document.getElementById("prd-gender").value;
    let productPrice = document.getElementById("prd-price").value;
    let productRedPrice = document.getElementById("prd-redprice").value;

    console.log(productBrand, productGender, productName, productPrice, productRedPrice, productQty);

    if (productName == "") {
        alert("Product Name must be filled out")
        return false;
    }
    if (productGender == "") {
        alert("Product Ideal For must be filled out")
        return false;
    }
    if (productBrand == "") {
        alert("Product Brand must be filled out")
        return false;
    }

    if (productQty == "" || productQty == "0") {
        alert("Product Quantity must be valid")
        return false;
    }

    if (productPrice == "" || productPrice == "0") {
        alert("Product Quantity must be valid")
        return false;
    }

    if (productRedPrice == "" || productRedPrice == "0") {
        alert("Product Quantity must be valid")
        return false;
    }
    
})