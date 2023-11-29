// Lấy đối tượng DOM của danh sách sản phẩm
const productsDom = document.getElementById("result");

// Hàm tạo HTML cho mỗi sản phẩm
const createProductHTML = (product) => {
  return `
      <div class="card" style="width: 18rem;">
        <img src="${product.image}" class="card-img-top" alt="${product.title}">
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
        </div>
        <div class="card-footer text-body-secondary d-flex justify-content-between align-items-center">
          <div><strong>Price: </strong>${product.price}đ</div>
          <div><button class="btn btn-dark" onclick="editProductModalOpen(${product.id})">Edit</button></div>
        </div>
      </div>
    `;
};

// Hiển thị danh sách sản phẩm trên trang
const renderProducts = (productList) => {
  // Sử dụng map để tạo HTML cho từng sản phẩm và join chúng thành một chuỗi
  const productsHTML = productList.map(createProductHTML).join("");
  // Gán chuỗi HTML vào phần tử DOM
  productsDom.innerHTML = productsHTML;
};

const resultElement = document.getElementById("result");

function printProducts() {
  renderProducts(arr);
}

// Sort product by price
function sortProductByPrice() {
  function sortPrice(a, b) {
    // sort price theo thu tu tang dan
    if (a.price < b.price) return -1;
    if (a.price > b.price) return 1;
    return 0;
  }
  const arrSortPrice = arr.sort(sortPrice);

  renderProducts(arrSortPrice);
}

// Sort product by name
function sortProductByName() {
  function sortName(a, b) {
    //sort name theo thu tu giam dan
    if (a.title.length > b.title.length) return -1;
    if (a.title.length < b.title.length) return 1;
    return 0;
  }
  const arrSortName = arr.sort(sortName);
  renderProducts(arrSortName);
}

function addProductToHeadArr() {
  // unshift: Add product vao head of array
  arr.unshift({
    title: "New product to head of the list",
    image:
      "https://m.media-amazon.com/images/I/61fdrEuPJwL._AC_UF1000,1000_QL80_.jpg",
    price: 9000000,
  });

  renderProducts(arr);
}

function addProductToTailArr() {
  // push: Add product vao tail of array
  arr.push({
    title: "New product to tail of the list",
    image:
      "https://m.media-amazon.com/images/I/61fdrEuPJwL._AC_UF1000,1000_QL80_.jpg",
    price: 10000000,
  });

  renderProducts(arr);
}

// Hàm tìm sản phẩm theo tên
const searchProductByName = () => {
    const productName = document.getElementById("searchInput").value;
    let productSearch = [];
    let noProductsFound = true;
  
    // Kiểm tra xem có tên sản phẩm được nhập không
    if (!productName) {
        // Hiển thị danh sách sản phẩm gốc
      renderProducts(arr);
      // Hiển thị modal thông báo khi tên sản phẩm không được nhập
      alert("Opps!", "Please enter the product name");
      
    } else {
      // Duyệt qua mảng sản phẩm để tìm kiếm
      arr.forEach((v, i) => {
        if (v.title.includes(productName)) {
          // Nếu tìm thấy, thêm vào mảng tìm kiếm và đặt flag không tìm thấy là false
          productSearch.push(v);
          noProductsFound = false;
        }
      });
  
      // Kiểm tra nếu không có sản phẩm nào được tìm thấy (noProductsFound = true)
      if (noProductsFound) {
        // Hiển thị modal thông báo khi không có sản phẩm nào được tìm thấy
        alert("Opps!", "No products found!");
      } else {
        // Hiển thị danh sách sản phẩm được tìm thấy
        renderProducts(productSearch);
      }
    }
  };

// Hàm xóa sản phẩm theo ID
const removeProductById = () => {
  // Lấy giá trị ID từ trường nhập liệu
  const productId = document.getElementById("removeProductById").value;
  if (!productId) {
    setDynamicModal("Opps!", "Please enter the product id.");
    return;
  }
  // Sử dụng filter để tạo mảng mới không chứa sản phẩm có ID cần xóa
  const deleteProductResult = arr.filter((e) => e.id != productId);
  // Hiển thị danh sách sản phẩm sau khi xóa
  renderProducts(deleteProductResult);
};



// Hàm mở modal chỉnh sửa thông tin sản phẩm
const editProductModalOpen = (productId) => {
    // Tìm index của sản phẩm trong mảng dựa trên productId
    const productIndex = arr.findIndex(
      (product) => product.id === productId
    );
  
    // Lấy chi tiết của sản phẩm cần chỉnh sửa
    const productDetail = arr[productIndex];
  
    // Hiển thị modal chỉnh sửa với thông tin của sản phẩm
    document.getElementById(
      "editProductModal"
    ).innerHTML = `<div class="modal-dialog">
      <div class="modal-content text-dark">
        <div class="modal-header">
          <h5 class="modal-title">${productDetail.title}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div>
            <!-- Form chỉnh sửa thông tin sản phẩm -->
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon2">Product Name</span>
              <input id="edit-p-name" type="text" class="form-control" value="${productDetail.title}">
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon2">Price</span>
              <input id="edit-p-price" type="text" class="form-control" value="${productDetail.price}">
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon2">Image</span>
              <input id="edit-p-image" type="text" class="form-control" value="${productDetail.image}">
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <!-- Nút đóng modal -->
          <button
            type="button"
            class="btn btn-danger"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <!-- Nút lưu thông tin chỉnh sửa -->
          <button
            type="button"
            class="btn btn-success"
            onclick="editProductById(${productIndex})"
            data-bs-dismiss="modal"
          >
            Save
          </button>
        </div>
      </div>
    </div>`;
  
    // Tạo một đối tượng Modal và hiển thị nó
    new bootstrap.Modal(document.getElementById("editProductModal")).show();
  };
  
  // Hàm chỉnh sửa thông tin sản phẩm dựa trên index của sản phẩm
  const editProductById = (productIndex) => {
    // Lấy giá trị từ các trường input trong modal chỉnh sửa
    const editPName = document.getElementById("edit-p-name").value;
    const editPPrice = document.getElementById("edit-p-price").value;
    const editPImage = document.getElementById("edit-p-image").value;
  
    // Kiểm tra nếu các trường không rỗng trước khi cập nhật thông tin sản phẩm
    if (editPName && editPPrice && editPImage) {
      // Cập nhật thông tin sản phẩm trong mảng
      arr[productIndex] = {
        ...arr[productIndex],
        title: editPName,
        price: editPPrice,
        image: editPImage,
      };
      // Hiển thị lại danh sách sản phẩm sau khi cập nhật
      renderProducts(arr);
    } else {
      // Xử lý trường hợp nếu một hoặc nhiều trường input trống
      alert("Vui lòng điền đầy đủ thông tin.");
    }
  };
  