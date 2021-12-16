document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("product-list");
    const formProduct = document.getElementById("product");
    const listProduct = document.getElementById("list-product");
  
    const categorySelect = document.getElementById("product-category");
    const btnModal = document.getElementById("btn-modal");
    const btnCheck = document.getElementById("btnCheck");
    
    let listAddProduct = document.getElementById("list");
  
    var paginacion = 1; var paginacionTotal = 100000000000000;
  
    const configureLoader = (screen) => {
      $(document)
          .ajaxStart(() => screen.fadeIn())
          .ajaxStop(() => screen.fadeOut());
    }
  
    // Load
    let screen = $("#screen");
    configureLoader(screen);
  
    $.get("app/listarProd.php", { id_seller: document.getElementById("session").innerText})
      .done((res) => {
        const products = JSON.parse(res);
        let ruta = "img/";
       
        let templateProducts = "";
      
        products.forEach((product) => {
          //console.log(product);
          
          templateProducts += `
          <tr class="cursor-pointer">
            <td scope="row">${product.id_producto}</td>
            <td scope="row">${product.sku}</td>
            <td scope="row"><img src="${ruta + product.img}" width="45"><input type="hidden" value="${product.img}"></td>
            <td>${product.descripcion}</td>
            <input type="hidden" value="${product.id_seller}">
          </tr>
          `;
     
        });
        
        $("#product-list").html(templateProducts);
  
        })
      .fail((err) => console.error(err));
  
    
    let next = document.getElementById('pagNext');
    let prev = document.getElementById('pagPrev');
  
    next.onclick = () => {
     
      paginacion++;
      if(paginacion == paginacionTotal+1) paginacion =paginacionTotal;
  
  $.get("app/listarProd.php", { id_seller: document.getElementById("session").innerText, pag: paginacion})
  .done((res) => {
  const products = JSON.parse(res);
  let templateProducts = "";
  let ruta = "img/";
  products.forEach((product) => {
    templateProducts += `
    <tr class="cursor-pointer">
    <td scope="row">${product.id_producto}</td>
      <td scope="row">${product.sku}</td>
      <td scope="row"><img src="${ruta + product.img}" width="45"><input type="hidden" value="${product.img}"></td>
      <td>${product.descripcion}</td>
      <input type="hidden" value="${product.id_seller}">
    </tr>
    `;
  });
  $("#product-list").html(templateProducts);
  
    });
  
  }
    prev.onclick = () => {
      paginacion--;
      if(paginacion == 0) paginacion =1;
  
  $.get("app/listarProd.php", { id_seller: document.getElementById("session").innerText, pag: paginacion})
  .done((res) => {
  const products = JSON.parse(res);
  let templateProducts = "";
  let ruta = "img/";
  products.forEach((product) => {
    templateProducts += `
    <tr class="cursor-pointer">
    <td scope="row">${product.id_producto}</td>
      <td scope="row">${product.sku}</td>
      <td scope="row"><img src="${ruta + product.img}" width="45"><input type="hidden" value="${product.img}"></td>
      <td>${product.descripcion}</td>
      <input type="hidden" value="${product.id_seller}">
    </tr>
    `;
  });
  $("#product-list").html(templateProducts);
  
    });
  
    }
  
  
    $.get("app/listCategoria.php")
      .done((res) => {
        const categorias = JSON.parse(res);
        let templateCategorias = `<option value="0">--Seleccionar--</option>`;
        categorias
          .filter((categoria) => categoria.level == 1)
          .forEach((categoria) => {
            templateCategorias += `
            <option value="${categoria.id}">${categoria.title}</option>
          `;
          });
        $("#product-category").html(templateCategorias);
      })
      .fail((err) => console.error(err));
  
    $.get("app/listCategoria.php")
      .done((res) => {
        const SubCategorias = JSON.parse(res);
        let templateSubCategorias = `<option value="0">--Seleccionar--</option>`;
        SubCategorias.filter((SubCategoria) => SubCategoria.level == 2).forEach(
          (SubCategoria) => {
            templateSubCategorias += `
            <option class="${SubCategoria.parent_id} subcategoria" value="${SubCategoria.id}">${SubCategoria.title}</option>
          `;
          }
        );
        $("#product-subcategory").html(templateSubCategorias);
      })
      .fail((err) => console.error(err));
  
    productList.addEventListener("click", (e) => {
      const product = e.target.parentNode;
      console.log(product);
      const list = document.getElementById("list");
  
      var id = product.children[0].innerText;
      var cod = product.children[1].innerText;
      var image = product.children[2].children[1].value;
      var title = product.children[3].innerText;
      var idSeller = product.children[4].value;
  
      // usa la funcion para generar la vista en sidebar
      creaVistaProducto(product, id, cod,image, title, idSeller);
    });
  
    formProduct.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const cardCategory = document.getElementById("card-category");
      const categorySelect = document.getElementById("product-category");
      const subcategorySelect = document.getElementById("product-subcategory");
      let listProductLength = listAddProduct.children.length;

      if (categorySelect.value == 0) {
        categorySelect.classList.add("border", "border-danger");
        return;
      }
  
      if (subcategorySelect.value == 0) {
        subcategorySelect.classList.add("border", "border-danger");
        return;
      }

      if(listProductLength == 0){

        listAddProduct.classList.add("border", "border-danger");
        return;
      }
  
      categorySelect.classList.remove("border", "border-danger");
  
      //cardCategory.classList.add("d-none");
      listProduct.classList.remove("d-none");

      for (const product of listAddProduct.childNodes) {
        let postData = {
          id: product.children[0].innerText,
          title: product.children[1].innerText,
          image:  product.children[2].value,
          idSeller: product.children[3].value,
          prod: product.children[4].value,
          category: categorySelect.value,
          categoryText: categorySelect.options[categorySelect.selectedIndex].text,
          subcategoryText:
            subcategorySelect.options[subcategorySelect.selectedIndex].text,
          subcategory: document.getElementById("product-subcategory").value,
        };
        
        const productTable = document.getElementById("product-list-category");
        const tableRow = document.createElement("tr");
  
        tableRow.setAttribute("id", postData.id);
  
        tableRow.innerHTML = `
          <td scope="row">${postData.id}</td>
          <td scope="row"><img id="imgRuta" src="img/${postData.image}" width="100"></td>
          <td scope="row"><input type="text" class="form-control" value="${postData.title}"></td>
          <td scope="row">${postData.category} - ${postData.categoryText}</td>
          <td scope="row">${postData.subcategory} - ${postData.subcategoryText}</td>
          <td scope="row"></td>
          <input type="hidden" id="idSeller" value="${postData.idSeller}">
          <input type="hidden" id="imgExist" value="${postData.image}">
          <input type="hidden" id="idCat" value="${postData.category}">
          <input type="hidden" id="idSubCat" value="${postData.subcategory}">
          <input type="hidden" id="prod" value="${postData.prod}">
        `;
     
        const btnDelete = document.createElement("button");
        btnDelete.classList.add("btn", "btn-danger");
        btnDelete.innerHTML = `
          <i class="fa fa-trash"></i>
        `;
  
        btnDelete.onclick = (e) => {
          $("#modal-product").modal("show");
          $("#modal-id").text(postData.id);
          $("#modal-name").text(postData.title);
        };
        $("#list-product").show();
        tableRow.children[5].appendChild(btnDelete);
        productTable.appendChild(tableRow);
      }
      listAddProduct.innerHTML = "";
  
      $("#product-subcategory").prop("selectedIndex", 0);
      $("#product-category").prop("selectedIndex", 0);
    });
  
    categorySelect.addEventListener("change", (e) => {
      e.preventDefault();
  
      $("#product-subcategory").removeClass("d-none");
      $(".subcategoria").addClass("d-none");
      $("#product-subcategory").prop("selectedIndex", 0);
  
      let categoryCurrent = categorySelect.value;
      subCategoryTarget = document.getElementsByClassName(categoryCurrent);
      for (const subcategory of subCategoryTarget) {
        subcategory.classList.remove("d-none");
      }
    });
  
    // Selección de todos los productos
    $('#selectAll').on("click", function() {
  
      var seleccionarTodo = $('#product-list');
      var elementos = seleccionarTodo.children();
      
      //console.log(elementos);

      for(let i = 0; i < elementos.length; i++) {
          var id = elementos[i].children[0].innerText;
          var cod = elementos[i].children[1].innerText;
          var image = elementos[i].children[2].children[1].value;
          var title = elementos[i].children[3].innerText;
          var idSeller = elementos[i].children[4].value;

          listProduct.classList.add("d-none");
  
          creaVistaProducto(elementos,id,cod,image,title, idSeller);
      }
    })
  
    // funcion para seleccion de productos
    function creaVistaProducto (elementos, id, cod, image, title, idSeller) {
  
      listProduct.classList.add("d-none");
      
      const elementLi = document.createElement("li");
      elementLi.classList.add("list-group-item", "alert", "alert-success");
      //console.log(id);
      elementLi.innerHTML = `
        <span id="product-${cod}">${cod}</span>
        <span id="product-${title}">${title}</span>
        <input type="hidden" id="product-${image}" value="${image}">
        <input type="hidden" id="product-${idSeller}" value="${idSeller}">
        <input type="hidden" id="product-${id}" value="${id}">
      `;
  
      const btnDeleteList = document.createElement("button");
      btnDeleteList.setAttribute("type", "button");
      btnDeleteList.classList.add("close");
      btnDeleteList.innerHTML = `
        <span>&times;</span>
      `;
  
      btnDeleteList.onclick = () => {
        console.log(id);
        const productTable = document.getElementById("product-list");
        const tableRow = document.createElement("tr");
        let ruta = "img/";
        tableRow.classList.add("cursor-pointer");
        tableRow.innerHTML = `
          <td scope="row">${id}</td>
          <td scope="row">${cod}</td>
          <td scope="row"><img src="${ruta + image}" width="45"> <input type="hidden" value="${image}"></td>
          <td scope="row">${title}</td>
          <input type="hidden" value="${idSeller}">
        `;
        productTable.appendChild(tableRow);
        elementLi.remove();
      };
  
      elementLi.appendChild(btnDeleteList);
      list.appendChild(elementLi);
  
      const cardCategory = document.getElementById("card-category");
      //cardCategory.classList.remove("d-none");
      elementos.remove();
  }
  
    $("#subirIMG").click(function (e) {
      e.preventDefault();
      document.getElementById("img-file").click();
    });
    
  
      $('#img-file').change(function(e) {
  
      //let img = $('#img-file');
    let img = document.getElementById('img-file');
      let cantidad = img.files.length;
  
      //console.log(cantidad);
  
        //se genera el campo del nombre y se separa por un id con el numero de imagen
              for (let i = 0; i < cantidad; i++) {
  
                  $('#prevIMG').append('<div id="img'+i+'">');
          //con esta funcion se encarga de la pre-vista
                  previsualizarImg(e, i);

    $('#img'+i).hover(function(){
		$('#img'+i).css("border", "danger");
		}, function(){
			$('#img'+i).css("border", "none");
		});
          
          //Eliminar imagen
          $('#img'+i).on('click', function(){
            
            Swal.fire({
              title: '¿Desea quitar esta imagen?',
              text: "Se quitará esta imagen de las seleccionadas",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              cancelButtonText: 'Cancelar',
              confirmButtonText: 'Si, deseo quitarla'
            }).then((result) => {
              if (result.isConfirmed) {

                console.log('Eliminado '+i);
                $('#img'+i).remove();
                Swal.fire(
                  'Se ha Quitado',
                  'La imagen seleccionado se quito de la lista',
                  'success'
                )
              }
            })

              });
  
              }
  
      });
  
    //esta es la funcion previsualizacion
  function previsualizarImg(e , i){
  
      let file = e.target.files[i];
      
      let lectura = new FileReader();
  
      lectura.onload = function(e){
          
      let result = e.target.result;
          $('#img'+i).append(`<img src="${result}" class="mr-2 ml-2 mb-2" width="260" height="220">`); //Asignamos el src dinámicamente a un img dinámico también
      }
  
      lectura.readAsDataURL(file);     
  }

    btnModal.addEventListener("click", (e) => {
      e.preventDefault;
      const ModalId = document.getElementById("modal-id").innerText;
      const rowProduct = document.getElementById(ModalId);
      
      //console.log(rowProduct);

      let productData = {
       
          cod: rowProduct.children[0].innerText,
          title: rowProduct.children[2].children[0].value,
          ruta:  rowProduct.children[1].children[0].src,
          image: rowProduct.children[7].value,
          id: rowProduct.children[10].value
      };
  
      const rowProductList = document.createElement("tr");
     
      rowProductList.classList.add("cursor-pointer");
      rowProductList.innerHTML = `
        <td scope="row">${productData.id}</td>
        <td scope="row">${productData.cod}</td>
        <td scope="row"><img src="img/${productData.image}" width="45"> <input type="hidden" value="${productData.image}"></td>
        <td scope="row">${productData.title}</td>
        <input type="hidden" value="${productData.idSeller}">
      `;
  
      productList.appendChild(rowProductList);
      rowProduct.remove();

      const productTable = document.getElementById("product-list-category").children;

      if(productTable.length == 0){
      $("#list-product").hide();
      }
      $("#modal-product").modal("hide");
    });
  
    btnCheck.addEventListener("click", (e) => {
      e.preventDefault();
      //let idSubCate = document.getElementById("idSubCat").value;
      //let idCate = document.getElementById("idCat").value;
      //let idSeller = document.getElementById("idSeller").value;
      const productTable = document.getElementById("product-list-category");
      //let imgExist = document.getElementById("imgExist").value;
      //let imgRuta = document.getElementById("imgRuta").src;

      for (const product of productTable.children) {

        //console.log(product);

        let postData = {
          idProd: product.children[0].innerText,
          descProd: product.children[2].children[0].value,
          imgRuta:  product.children[1].children[0].src,
          imgExist: product.children[7].value,
          idCate:  product.children[8].value,
          subCate:  product.children[9].value,
          id: product.children[6].value
        }

        console.log(postData);

      if(product.children[7].value == product.children[0].innerText + ".png" || product.children[7].value == product.children[0].innerText + ".PNG"){
/*        
        console.log(product.children[0].innerText);
        console.log("Subieron los de arriba bien");
 */
         $.post("app/registrar.php", postData)
          .done((resp) => console.log(resp))
          .fail((err) => console.error(err)); 
          
      } else{
        console.log("Subieron los de abajo mal");
      
        console.log(product.children[0].innerText);

        product.classList.add('border', 'danger');

          Swal.fire({
          icon: 'error',
          title: 'No tiene Imagen',
          text:'El producto '+ product.children[0].innerText+' no se pudo registrar',
        })
        
        console.log("No tiene Imagen");
        return;
      } 
     //console.log(postData);
      }
     
    location.reload();
    });
  });