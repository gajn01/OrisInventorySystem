/* Pagination fields */
let ctr = 0;
let page = 0;
let items = 0;
let limit = 0;

let account = sessionStorage.getItem("account");
let json_account = JSON.parse(account);

/* Material Fields */
var table_selected = 1;
const account_id_input = document.getElementById("account_id");
const product_code_input = document.getElementById("product_code");
const product_category_input = document.getElementById("product_category");
const product_name_input = document.getElementById("product_name");
const product_quantity_input = document.getElementById("product_quantity");
const product_location_input = document.getElementById("product_location");
const product_person_incharge_input = document.getElementById("product_person_incharge");
const date_requested_input = document.getElementById("date_requested");
const date_return_input = document.getElementById("date_return");
const date_to_claim_input = document.getElementById("date_to_claim");
const name_input = document.getElementById("name");
const position_input = document.getElementById("position");
const purpose_input = document.getElementById("purpose");
const department_input = document.getElementById("department");

function onSelectLimit() {
  page = 0;
  ctr  = 0;
  document.getElementById("page_number").innerText = page+1;

  if(table_selected == 1){
    onViewMaterialList(1);
  }else if(table_selected == '2'){
    onViewMaterialList(2);
  }else{
    onViewHistoryList();
  }
}
function onSearch() {
  ctr =0;
  page = 0;
  if(table_selected == 1){
    onViewMaterialList(1);
  }else if(table_selected == '2'){
    onViewMaterialList(2);
  }else{
    onViewHistoryList();
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
  }else{
    onViewHistoryList();
  }
}
function onLogin() {
  $('#login_form').validate({
    rules: {
      email: { required: true,email:true },
      password: { required: true, minlength: 5 },
    },
    submitHandler: function (form) {
        $.ajax({  
          url:"php/login.php",  
          method:"POST",  
          data: $('#login_form').serialize(), 
          dataType: "json",
          encode: true, 
        }).done(function (response) {
          if(response.success){
            console.log("res:",response);
            sessionStorage.setItem("account",JSON.stringify(response.data));
            alert(response.success_msg);
            location.href = 'pages/landing.html'
          }else{
            alert(response.error_msg);
          }
        }).fail(function (data){
          console.log(data);
        });
    }
  });
}
function onLogout() {
  let text = "Are you sure you want to logout?";
  if (confirm(text)) {
      localStorage.clear();
      location.href = '../index.html';
  }
}
function goTo(params) {
  if(params == 1){
    window.location.href = "../pages/landing.html";
  }else if(params == 2){
    window.location.href = "../pages/assets.html";
  }else{
    window.location.href = "../pages/history.html";
  }
}
/* Material Functions */
function onViewMaterialList(category_id) {
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
      if(parseInt(limit) > parseInt(items) || parseInt(limit) == parseInt(items)){
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
function onViewHistoryList() {
  table_selected = 3;
  limit =  $('#page_limit').val();
  search =  $('#searchbar').val();
  account_id = json_account.account_id;
  $.ajax({  
    url:"../php/historyview.php",  
    method:"POST",  
    data: {limit:limit,page:page*limit,search:search,account_id:account_id},  
    dataType: "json",
    encode: true, 
  }).done(function (response) {
    var table = document.querySelector("table");
    if(response.success){
      console.log(response);
      items = response.page_limit[0].ctr;
        let setPage = items / limit
      let totalPage = Math.trunc(items / limit)
      if( setPage % 1){
          totalPage = totalPage +1
      }
      if(parseInt(limit) > parseInt(items) || parseInt(limit) == parseInt(items)){
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
        var template =`
          <thead>
            <th>#</th>
            <th>Category</th>
            <th>Full Name</th>
            <th>Position</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Action</th>
          </thead>`;
      table.innerHTML += template;
      onGenerateMaterialList(response.data,3);
      sessionStorage.setItem("history_list",JSON.stringify(response.data));
    }else{
      table.innerHTML ="";
      var template =`
          <thead>
            <th>#</th>
            <th>Category</th>
            <th>Full Name</th>
            <th>Position</th>
            <th>Product Name</th>
            <th>Quantity</th>
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
                  <span  data-bs-toggle="modal" data-bs-target="#requestModal" class="action-button" onClick='onClickRequest(${JSON.stringify(element.product_code)})'>Request</span>
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
                  <span data-bs-toggle="modal" data-bs-target="#requestModal" class="action-button" onClick='onClickRequest(${JSON.stringify(element.product_code)})' >Borrow</span>
              </td>
          </tr>`;
        }else if(parseInt(category_id) == 3){
          ctr = ctr + 1;
          if(element.status == 1){
            element.status = "Pending";
          }else if(element.status == 2){
            element.status = "Approved";
          }else{
            element.status = "Rejected";
          }
          if(element.product_category == 1){
            element.product_category = "Supplies";
          }else{
            element.product_category = "Fixed Assets";
          }
          template = 
          `<tr>
              <td>${ctr}</td>
              <td>${element.product_category}</td>
              <td>${element.full_name}</td>
              <td>${element.position}</td>
              <td>${element.product_name}</td>
              <td>${element.product_quantity}</td>
              <td>${element.status}</td>
              <td>
                  <span data-bs-toggle="modal" data-bs-target="#requestModal" class="action-button" onClick='onClickViewHistory(${JSON.stringify(element)})' >View</span>
              </td>
          </tr>`;
        }
        table.innerHTML += template;
    });

}
function onClickRequest(product_code) {
  document.getElementById("request_form").reset();
  date_requested_input.min = new Date().toISOString().split("T")[0];
  date_to_claim_input.min = new Date().toISOString().split("T")[0];
  date_return_input.min = new Date().toISOString().split("T")[0];
  date_requested_input.value = new Date().toISOString().split("T")[0];
  date_to_claim_input.value = new Date().toISOString().split("T")[0];
  date_return_input.value = new Date().toISOString().split("T")[0];
  let material_list = sessionStorage.getItem("material_list");
  let json_material = JSON.parse(material_list);
  json_material.forEach(element => {
    if(element.product_code == product_code){
      if(parseInt(element.product_category)  == 1){
        product_category_input.value = "Supplies";
      }else{
        product_category_input.value = "Fixed Assets";
      }
      account_id_input.value = json_account.account_id;
      product_code_input.value = element.product_code;
      product_name_input.value = element.product_name;
      department_input.value = document.getElementById("account_label").innerText;
    }
  });
  onChangeCategory();
}
function onClickViewHistory(history) {
  console.log('res',history);
  document.getElementById("product_category").value = history.product_category ;
  document.getElementById("product_code").value = history.product_code ;
  document.getElementById("product_name").value = history.product_name ;
  document.getElementById("product_quantity").value = history.product_quantity ;
  document.getElementById("full_name").value = history.full_name ;
  document.getElementById("position").value = history.position ;
  document.getElementById("purpose").value = history.purpose ;
  document.getElementById("date_requested").value = history.date_requested ;
  document.getElementById("date_to_claim").value = history.date_to_claim ;
  document.getElementById("status").value = history.status ;
  document.getElementById("note_by").value = history.noted_by;
  document.getElementById("approved_by").value = history.approved_by ;
  if(history.date_approved == null){
    document.getElementById("date_approved").value = 00/00/0000 ;
  }

}
function onChangeCategory() {
  let category =  $('#product_category').val();
  if(category == "Supplies"){
    document.getElementById("returned_div").setAttribute("class","d-none"); 
  }else{
    document.getElementById("returned_div").classList.remove("d-none"); 
  }
}
function onRequest() {
  $('#request_form').validate({
    rules: {
      full_name: { required: true },
      product_quantity: { required: true },
      position: { required: true },
      purpose : { required: true }
    },
    submitHandler: function (form) {
        $.ajax({  
          url:"../php/requestcreate.php",  
          method:"POST",  
          data: $('#request_form').serialize(), 
          dataType: "json",
          encode: true, 
        }).done(function (response) {
          if(response.success){
            alert(response.success_msg)
            window.location.reload();
          }else{
            alert(response.error_msg)
          }
        }).fail(function (response){
          console.log(response.responseText);
        });
    }
  });
  
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
