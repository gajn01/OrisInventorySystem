/* Pagination fields */
let ctr = 0;
let page = 0;
let items = 0;
let limit = 0;
/* account fields */
const firstname_input = document.getElementById("firstname");
const lastname_input = document.getElementById("lastname");
const email_input = document.getElementById("email");
const employment_status_input = document.getElementById("employment_status");
const position_input = document.getElementById("position");
const department_input = document.getElementById("department");
const account_id_input = document.getElementById("account_id");

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

  if(table_selected == 0){
    onViewAccountList();
  }else if(table_selected == 4){
    onViewHistoryList();
  }else{
    onViewMaterialList(table_selected);
  }
}
function onSearch() {
  ctr =0;
  page = 0;
  if(table_selected == 0){
    onViewAccountList();
  }else if(table_selected == 4){
    onViewHistoryList();
  }else{
    onViewMaterialList(table_selected);
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
  if(table_selected == 0){
    onViewAccountList();
  }else if(table_selected == 4){
    onViewHistoryList();
  }else{
    onViewMaterialList(table_selected);
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
function onChangeTab(params) {
  page = 0;
  ctr = 0;
  document.getElementById("page_number").innerText = 1;
  table_selected = params;
  if(table_selected == 0){
    onViewAccountList();
  }else{
    onViewMaterialList(table_selected);
  }
}
/* Account Functions */
function onCreateAccount() {
  $('#account_form').validate({
    rules: {
      email: { required: true ,email: true},
    },
    submitHandler: function (form) {
        $.ajax({  
          url:"../php/accountcreate.php",  
          method:"POST",  
          data: $('#account_form').serialize(), 
          dataType: "json",
          encode: true, 
        }).done(function (response) {
          if(response.success){
            alert(response.success_msg)
            // $('#addUserModal').modal('hide');
            let subject = "Account Creation";
            let body = "Greetings!, <br> <br> <a href='http://orisadmin.ezyro.com/'>Login here </a> " + $('#firstname').val() +" "+ $('#lastname').val() +" your password is: " + response.data;
            sendMail($('#email').val(),subject,body);
            // window.location.reload();
          }else{
            alert(response.error_msg)
          }
        }).fail(function (response){
          console.log(response.responseText);
        });
    }
  });
}
function onViewAccountList() {
  table_selected = 0;
  limit =  $('#page_limit').val();
  search =  $('#searchbar').val();
  $.ajax({  
    url:"../php/accountview.php",  
    method:"POST",  
    data: {limit:limit,page:page*limit,search:search},  
    dataType: "json",
    encode: true, 
  }).done(function (response) {
    let table = document.querySelector("table");
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
      let template =`
          <thead>
            <th>#</th>
            <th>Department</th>
            <th>Action</th>
          </thead>`;
      table.innerHTML += template;
      onGenerateAccoutList(response.data);
      sessionStorage.setItem("account_list",JSON.stringify(response.data));
    }else{
      alert(response.error_msg);
      template = 
      `<tr>
          <td colspan="10">No records found!</td>
      </tr>`;
      table.innerHTML += template;

    }
  }).fail(function (response){
    console.log(response.responseText);
  });
}
function onGenerateAccoutList(data) {
  let table = document.querySelector("table");
  let template;
    data.forEach(element => {
        ctr = ctr + 1;
        template = 
            `<tr>
                <td>${ctr}</td>
                <td>${element.department}</td>
                <td>
                    <span  data-bs-toggle="modal" data-bs-target="#addUserModal" class="action-button" onClick="onClickEditAccount(${element.account_id})">Edit</span> | 
                    <span class="action-button" onClick="onDeleteAccount(${element.account_id})" >Delete</span> 
                </td>
            </tr>`;
        table.innerHTML += template;
    });
}
function onClickEditAccount(account_id) {
  document.getElementById("account_form").reset();
  document.getElementById("addUserModalLabel").innerText = "Update Account";
  document.getElementById("create_account_submit").setAttribute("onclick","onUpdateAccount()");
  let account_list = sessionStorage.getItem("account_list");
  let json_account = JSON.parse(account_list);
  json_account.forEach(element => {
    if(element.account_id == account_id){
      email_input.value = element.email;
      department_input.value = element.department;
      account_id_input.value = element.account_id;
    }
  });
}
function onClickAddAccount() {
  document.getElementById("account_form").reset();
  document.getElementById("addUserModalLabel").innerText = "Create Account";
  document.getElementById("create_account_submit").setAttribute("onclick","onCreateAccount()");
}
function onUpdateAccount() {
  $('#account_form').validate({
    rules: {
      firstname: { required: true },
      lastname: { required: true },
      position : { required: true }
    },
    submitHandler: function (form) {
      $.ajax({  
        url:"../php/accountupdate.php",  
        method:"POST",  
        data: $('#account_form').serialize(), 
        dataType: "json",
        encode: true, 
      }).done(function (response) {
        if(response.success){
          alert(response.success_msg);
          // $('#addUserModal').modal('hide');
          window.location.reload();
        }else{
          alert(response.error_msg);

        }
      }).fail(function (response){
        console.log(response.responseText);
      });
    }
    });
}
function onDeleteAccount(account_id) {
  let text = "Do you want to delete the account?";
  if (confirm(text)) {
    $.ajax({  
      url:"../php/accountdelete.php",  
      method:"POST",  
      data: {account_id:account_id}, 
      dataType: "json",
      encode: true, 
    }).done(function (response) {
      if(response.success){
        alert(response.success_msg);
        window.location.reload();
      }else{
        alert(response.error_msg);
      }
    }).fail(function (response){
      console.log(response.responseText);
    });
  }
}
/* Account Functions */

/* Material Functions */
function onViewMaterialList(category_id) {
  table_selected = category_id;
  limit =  $('#page_limit').val();
  search =  $('#searchbar').val();
  $.ajax({  
    url:"../php/materialview.php",  
    method:"POST",  
    data: {limit:limit,page:page*limit,search:search,category_id:table_selected},  
    dataType: "json",
    encode: true, 
  }).done(function (response) {
    var table = document.querySelector("table");
    if(response.success){
      console.log("table_selected: ",table_selected);

      console.log("Res: ",response.data);
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
            <th>Description</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Location</th>
            <th>Person-in-charge</th>
            <th>Inventory Date</th>
            <th>Received Date</th>
            <th>Action</th>
          </thead>`;
      }else if(parseInt(category_id) == 2){
        var template =`
          <thead>
            <th>#</th>
            <th>Code</th>
            <th>Name</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Location</th>
            <th>Person-in-charge</th>
            <th>Status</th>
            <th>Inventory Date</th>
            <th>Remarks</th>
            <th>Action</th>
          </thead>`;
      }else{
        var template =`
          <thead>
            <th>#</th>
            <th>Code</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Location</th>
            <th>Person-in-charge</th>
            <th>Status</th>
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
              <td>${element.product_description}</td>
              <td>${element.product_quantity}</td>
              <td>${element.product_unit}</td>
              <td>${element.product_location}</td>
              <td>${element.product_person_incharge}</td>
              <td>${element.product_inventory_date}</td>
              <td  >${element.product_recieved_date}</td>
              <td>
                  <span  data-bs-toggle="modal" data-bs-target="#addMaterialModal" class="action-button" onClick='onClickEditMaterial(${JSON.stringify(element.product_code)})'   >Edit</span> | 
                  <span class="action-button" onClick='onDeleteMaterial(${JSON.stringify(element.product_code)})' >Delete</span> 
              </td>
          </tr>`;
        }else if(parseInt(category_id) == 2){
          ctr = ctr + 1;
          template = 
          `<tr>
              <td>${ctr}</td>
              <td>${element.product_code}</td>
              <td>${element.product_name}</td>
              <td>${element.product_description}</td>
              <td>${element.product_quantity}</td>
              <td>${element.product_unit}</td>
              <td>${element.product_location}</td>
              <td>${element.product_person_incharge}</td>
              <td>${element.product_status}</td>
              <td>${element.product_inventory_date}</td>
              <td>${element.product_remarks}</td>
              <td>
                  <span data-bs-toggle="modal" data-bs-target="#addMaterialModal" class="action-button" onClick='onClickEditMaterial(${JSON.stringify(element.product_code)})' >Edit</span> | 
                  <span class="action-button" onClick='onDeleteMaterial(${JSON.stringify(element.product_code)})' >Delete</span> 
              </td>
          </tr>`;
        }else{
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
              <td>${element.product_status}</td>
              <td>
                  <span  data-bs-toggle="modal" data-bs-target="#addMaterialModal" class="action-button" onClick='onClickEditMaterial(${JSON.stringify(element.product_code)})' >Edit</span> | 
                  <span class="action-button" onClick='onDeleteMaterial(${JSON.stringify(element.product_code)})' >Delete</span> 
              </td>
          </tr>`;
        }
        table.innerHTML += template;
    });
}
function onChangeCategory() {
  let category =  $('#product_category').val();
  if(category == 1){
    document.getElementById("remarks_div").setAttribute("class", "col-lg-12");
    document.getElementById("status_div").setAttribute("class","d-none"); 
  }else{
    document.getElementById("remarks_div").setAttribute("class","col-lg-6");
    document.getElementById("status_div").setAttribute("class","col-lg-6");
    document.getElementById("status_div").classList.remove("d-none"); 
  }
  
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
function onCreateMaterial() {
  $('#material_form').validate({
    rules: {
      product_name: { required: true },
      product_description: { required: true },
      product_quantity: { required: true },
      product_quantity: { required: true },
      product_person_incharge : { required: true }
    },
    submitHandler: function (form) {
        $.ajax({  
          url:"../php/materialcreate.php",  
          method:"POST",  
          data: $('#material_form').serialize(), 
          dataType: "json",
          encode: true, 
        }).done(function (response) {
          if(response.success){
            alert(response.success_msg)
            let text = "Do you want to donwload qr code?";
            if (confirm(text)) {
              document.getElementById('qr-download').click();
            }
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
function onUpdateMaterial() {
      $.ajax({  
        url:"../php/materialupdate.php",  
        method:"POST",  
        data: $('#material_form').serialize(), 
        dataType: "json",
        encode: true, 
      }).done(function (response) {
        if(response.success){
          alert(response.success_msg);
          window.location.reload();
        }else{
          alert(response.error_msg);
        }
      }).fail(function (response){
        console.log(response.responseText);
      });
}
function onDeleteMaterial(product_code) {
  let text = "Do you want to delete the record?";
  if (confirm(text)) {
    $.ajax({  
      url:"../php/materialdelete.php",  
      method:"POST",  
      data: {product_code:product_code}, 
      dataType: "json",
      encode: true, 
    }).done(function (response) {
      if(response.success){
        alert(response.success_msg);
        window.location.reload();
      }else{
        alert(response.error_msg);
      }
    }).fail(function (response){
      console.log(response.responseText);
    });
  }
}

/* Requisition */
function onViewHistoryList() {
  table_selected = 4;
  limit =  $('#page_limit').val();
  search =  $('#searchbar').val();
  $.ajax({  
    url:"../php/historyview.php",  
    method:"POST",  
    data: {limit:limit,page:page*limit,search:search},  
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
      onGenerateHistoryList(response.data);
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
function onGenerateHistoryList(data) {
  let table = document.querySelector("table");
  let template;
    data.forEach(element => {
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
        table.innerHTML += template;
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
