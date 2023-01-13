/* Pagination fields */
let ctr = 0;
let page = 0;
let items = 0;
let limit = 0;

/* Material Fields */
var table_selected = 1;
const product_code_input = document.getElementById("product_code");
const product_category_input = document.getElementById("product_category");
const product_name_input = document.getElementById("product_name");
const product_description_input = document.getElementById("product_description");
const product_unit_input = document.getElementById("product_unit");
const product_quantity_input = document.getElementById("product_quantity");
const product_location_input = document.getElementById("product_location");
const product_person_incharge_input = document.getElementById("product_person_incharge");
const product_inventory_date_input = document.getElementById("product_inventory_date");
const product_recieved_date_input = document.getElementById("product_recieved_date");
const product_remarks_input = document.getElementById("product_remarks");
const product_status_input = document.getElementById("product_status");


function onSelectLimit() {
  page = 0;
  ctr  = 0;
  document.getElementById("page_number").innerText = page+1;

  if(table_selected == 1){
    onViewMaterialList(1);
  }else if(table_selected == '2'){
    onViewMaterialList(2);
  }
}
function onSearch() {
  ctr =0;
  page = 0;
  if(table_selected == 1){
    onViewMaterialList(1);
  }else if(table_selected == '2'){
    onViewMaterialList(2);
  }
}
function onPage(params) {
  limit =  $('#page_limit').val();
  setPage = items / limit
  totalPage = Math.trunc(items / limit)
  if( setPage % 1){
      totalPage = totalPage +1
  }
  if(params == 1){
      if(totalPage > page+1){
          page +=1;
          ctr = (ctr-1) + 1;
          document.getElementById("page_number").innerText = page+1;
          document.getElementById("prev").style.display = "block";
      }
  }else{
      ctr--;
      if(page != 0){
          page -= 1;
          ctr -= limit;
          if(page == 0){
              ctr = 0;
          }
          document.getElementById("page_number").innerText = page+1;
          document.getElementById("prev").style.display = "block";
      }
  }
  if(table_selected == 1){
    onViewMaterialList(1);
  }else if(table_selected == '2'){
    onViewMaterialList(2);
  }
}
function onLogin() {
  $('#admin_login_form').validate({
    rules: {
      username: { required: true },
      password: { required: true, minlength: 5 },
    },
    submitHandler: function (form) {
        $.ajax({  
          url:"php/loginadmin.php",  
          method:"POST",  
          data: $('#admin_login_form').serialize(), 
          dataType: "json",
          encode: true, 
        }).done(function (response) {
          if(response.success){
            sessionStorage.setItem("account",JSON.stringify(response.data));
            alert(response.success_msg);
            location.href = '../admin/pages/dashboard.html'
          }else{
            alert(response.error_msg);
          }
        }).fail(function (data){
          console.log(data);
        });
    }
  });
}
/* Material Functions */
function onViewMaterialList(category_id) {
  if(category_id == 1){
    document.getElementById("supplies").classList.add("active");
    document.getElementById("assets").classList.remove("active");
    document.getElementById("history").classList.remove("active");
  }else if(category_id == 2){
    document.getElementById("assets").classList.add("active");
    document.getElementById("supplies").classList.remove("active");
    document.getElementById("history").classList.remove("active");
  }else{
    document.getElementById("history").classList.add("active");
    document.getElementById("supplies").classList.remove("active");
    document.getElementById("assets").classList.remove("active");
  }
  table_selected = category_id;
  limit =  $('#page_limit').val();
  search =  $('#searchbar').val();
  $.ajax({  
    url:"../php/materialview.php",  
    method:"POST",  
    data: {limit:limit,page:page*limit,search:search,category_id:category_id},  
    dataType: "json",
    encode: true, 
  }).done(function (response) {
    var table = document.querySelector("table");
    if(response.success){
      items = response.page_limit[0].ctr;
      let setPage = items / limit
      let totalPage = Math.trunc(items / limit)
      if( setPage % 1){
          totalPage = totalPage +1
      }
      if(parseInt(limit) > parseInt(items)){
        document.getElementById("next").style.display = "none";
        document.getElementById("prev").style.display = "none";
      }else{
          if(page <= 0){
              document.getElementById("prev").style.display = "none";
              document.getElementById("next").style.display = "block";

          }else if(totalPage <= page+1){
              document.getElementById("next").style.display = "none";
              document.getElementById("prev").style.display = "block";
          }
      }
      table.innerHTML =  "";
      if(parseInt(category_id) == 1){
        var template =`
          <thead>
            <th>#</th>
            <th>Code</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Location</th>
            <th>Person-in-charge</th>
            <th>Action</th>
          </thead>`;
      }else if(parseInt(category_id) == 2){
        var template =`
          <thead>
            <th>#</th>
            <th>Code</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Location</th>
            <th>Person-in-charge</th>
            <th>Action</th>
          </thead>`;
      }
      table.innerHTML += template;
      onGenerateMaterialList(response.data,category_id);
      sessionStorage.setItem("material_list",JSON.stringify(response.data));
    }else{
      table.innerHTML ="";
      var template =`
          <thead>
            <th>#</th>
            <th>Code</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Location</th>
            <th>Person-in-charge</th>
            <th>Status</th>
            <th>Action</th>
          </thead>
          <tbody>
            <tr>
              <td colspan="12">No records found!</td>
            </tr>
          </tbody>`;
      table.innerHTML += template;
    }
  }).fail(function (response){
    console.log(response.responseText);
  });
}
function onGenerateMaterialList(data,category_id) {
  ctr = 0;
  let table = document.querySelector("table");
  let template;
    data.forEach(element => {
        if(parseInt(category_id)  == 1){
          ctr = ctr + 1;
          template = 
          `<tr>
              <td>${ctr}</td>
              <td>${element.product_code}</td>
              <td>${element.product_name}</td>
              <td>${element.product_quantity}</td>
              <td>${element.product_unit}</td>
              <td>${element.product_location}</td>
              <td>${element.product_person_incharge}</td>
              <td>
                  <span  data-bs-toggle="modal" data-bs-target="#requestModal" class="action-button" onClick='onClickEditMaterial(${JSON.stringify(element.product_code)})'>Request</span>
              </td>
          </tr>`;
        }else if(parseInt(category_id) == 2){
          ctr = ctr + 1;
          template = 
          `<tr>
              <td>${ctr}</td>
              <td>${element.product_code}</td>
              <td>${element.product_name}</td>
              <td>${element.product_quantity}</td>
              <td>${element.product_unit}</td>
              <td>${element.product_location}</td>
              <td>${element.product_person_incharge}</td>
              <td>
                  <span data-bs-toggle="modal" data-bs-target="#addMaterialModal" class="action-button" onClick='onClickEditMaterial(${JSON.stringify(element.product_code)})' >Borrow</span>
              </td>
          </tr>`;
        }
        table.innerHTML += template;
    });
}
function onClickAddMaterial() {
  document.getElementById("material_form").reset();
  product_inventory_date_input.max = new Date().toISOString().split("T")[0];
  product_recieved_date_input.max = new Date().toISOString().split("T")[0];
  product_inventory_date_input.value = new Date().toISOString().split("T")[0];
  product_recieved_date_input.value = new Date().toISOString().split("T")[0];
  var id = btoa(Math.random()).slice(0, 9);
  product_code_input.value = id;
  document.getElementById("addMaterialModalLabel").innerText = "Add Material";
  document.getElementById("create_material_submit").setAttribute("onclick","onCreateMaterial()"); 
  generate(id,1);
}
function onClickEditMaterial(product_code) {
  document.getElementById("material_form").reset();
  document.getElementById("addMaterialModalLabel").innerText = "Update Account";
  document.getElementById("create_material_submit").setAttribute("onclick","onUpdateMaterial()");
  let material_list = sessionStorage.getItem("material_list");
  let json_material = JSON.parse(material_list);
  json_material.forEach(element => {
    if(element.product_code == product_code){
      product_code_input.value = element.product_code;
      product_category_input.value = element.product_category;
      product_name_input.value = element.product_name;
      product_description_input.value = element.product_description;
      product_unit_input.value = element.product_unit;
      product_quantity_input.value = element.product_quantity;
      product_location_input.value = element.product_location;
      product_person_incharge_input.value = element.product_person_incharge;
      product_inventory_date_input.value = element.product_inventory_date;
      product_recieved_date_input.value = element.product_recieved_date;
      product_remarks_input.value = element.product_remarks;
      product_status_input.value = element.product_status;
      generate(element.product_code,2);
    }
  });
}

function onChangeCategory() {
  let category =  $('#product_category').val();
  if(category == 1){
    document.getElementById("requested_div").setAttribute("class", "col-lg-12");
    document.getElementById("returned_div").setAttribute("class","d-none"); 
  }else{
    document.getElementById("requested_div").setAttribute("class","col-lg-6");
    document.getElementById("returned_div").setAttribute("class","col-lg-6");
    document.getElementById("returned_div").classList.remove("d-none"); 
  }
  
}

function sendMail(email,subject,body) {
  $.ajax({  
         url:"../php/sendemail.php",  
         method:"POST",  
         data: { email:email,
                 subject:subject,
                 body:body},
         success: function(response) {
             /* alert('Email sent'); */
         },error: function() {
             alert('System error: Ajax not working properly');
         }  
     }); 
}
