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


let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
scanner.addListener('scan', function (content) {
  $.ajax({  
    url:"../php/materialallview.php",  
    method:"POST",  
    data: {product_code:content}, 
    dataType: "json",
    encode: true, 
  }).done(function (response) {
    if(response.success){
      document.getElementById("product_code_scan").value = response.data.product_code;
      document.getElementById("product_category_scan").value = response.data.product_category;
      document.getElementById("product_name_scan").value = response.data.product_name;
      document.getElementById("product_description_scan").value = response.data.product_description;
      document.getElementById("product_unit_scan").value = response.data.product_unit;
      document.getElementById("product_quantity_scan").value = response.data.product_quantity;
      document.getElementById("product_location_scan").value = response.data.product_location;
      document.getElementById("product_person_incharge_scan").value = response.data.product_person_incharge;
      document.getElementById("product_inventory_date_scan").value = response.data.product_inventory_date;
      document.getElementById("product_recieved_date_scan").value = response.data.product_recieved_date;
      document.getElementById("product_remarks_scan").value = response.data.product_remarks;
      document.getElementById("product_status_scan").value = response.data.product_status;

      document.getElementById("preview").classList.add("d-none");
      document.getElementById("product_details").classList.remove("d-none");
      document.getElementById("scan_btn").classList.remove("d-none");
      document.getElementById("delete_btn").classList.remove("d-none");
      document.getElementById("update_btn").classList.remove("d-none");
      scanner.stop();

    }else{
      alert("No record found!");
    }
  }).fail(function (response){
    console.log(response.responseText);
  });
});

function onStartScan() {
 
  Instascan.Camera.getCameras().then(function (cameras) {
    if (cameras.length > 0) {
      scanner.start(cameras[0]);
    } else {
        console.error('No cameras found.');
    }
  }).catch(function (e) {
      console.error(e);
  });
  
 
}
function onScan() {
  scanner.start();
  document.getElementById("preview").classList.remove("d-none");
  document.getElementById("product_details").classList.add("d-none");
  document.getElementById("scan_btn").classList.add("d-none");
  document.getElementById("delete_btn").classList.add("d-none");
  document.getElementById("update_btn").classList.add("d-none");
}
function scanModalClose() {
  scanner.stop();
}

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
function navigateTo(url) {
  location.href = '../pages/'+url;
}

/* Dashboard */

 function onChangeDateFilter() {
  let date_filter =  $('#date_filter').val();
  let date;
  let date_end = moment().format("YYYY-MM-DD");
  if(date_filter == 1 ){
      date = moment().format("YYYY-MM-DD");
  }else if(date_filter == 2 ){
    let weekDates = [];
    let startOfWeek = moment().startOf('week');
    for (let i = 0; i < 7; i++) {
      let currentDate = moment(startOfWeek);
      currentDate.add(i, 'days');
      let formattedDate = currentDate.format("YYYY-MM-DD");
      weekDates.push(formattedDate);
      date = weekDates;
    }
  }else if(date_filter == 3){
    date = moment().format("YYYY-MM-DD");
  }else if(date_filter == 4){
    $(function() {
      $('input[name="daterange"]').daterangepicker({
          opens: 'right'
      }, function(start, end, label) {
        date = start.format('YYYY-MM-DD');
        date_end = end.format('YYYY-MM-DD');
        console.log("check",date);
        console.log("date_end",date_end);

      });
    });

  }
  $.ajax({  
    url:"../php/datefilter.php",  
    method:"POST",  
    data: {date_filtered:date, filter_type:date_filter,date_end:date_end}, 
    dataType: "json",
    encode: true, 
  }).done(function (response) {
    let dataPoints = [];
    if(response.success){
      console.log("response",response.date);
      console.log("dates",date);
    
      if(date_filter == 1 ){
        dataPoints.push({label:response.date[0].label,y: parseInt(response.date[0].y)});
        document.getElementById("requesition_label").innerText = "Requisition per today";
      }else if(date_filter == 2 ){
        document.getElementById("requesition_label").innerText = "Requisition per week";

        for (let i = 0; i < date.length; i++) {
          let matchFound = false;
          for (let j = 0; j < response.date.length; j++) {
            if (response.date[j].label === date[i]) {
              dataPoints.push({label: response.date[j].label, y: parseInt(response.date[j].y)});
              matchFound = true;
              break;
            }
          }
          if (!matchFound) {
            dataPoints.push({label: date[i], y: 0});
          }
        }
      }else if(date_filter == 3){
        document.getElementById("requesition_label").innerText = "Requisition per month";
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        for (let i = 0; i < months.length; i++) {
          let matchFound = false;
          for (let j = 0; j < response.date.length; j++) {
            if (response.date[j].month === months[i]) {
              dataPoints.push({label: response.date[j].month, y: parseInt(response.date[j].total)});
              matchFound = true;
              break;
            }
          }
          if (!matchFound) {
            dataPoints.push({label: months[i], y: 0});
          }
        }
      }else{
        console.log("response",response.date);

      }

     /*  response.date.push({y: parseInt(element.y),label:element.label}); */
      var chart = new CanvasJS.Chart("requisitionChartContainer", {
        animationEnabled: true,
        exportEnabled: true,
        backgroundColor: "#e0e8f8",
        theme: "light1", // "light1", "light2", "dark1", "dark2"
        data: [{
          type: "column", //change type to bar, line, area, pie, etc
          indexLabelFontColor: "#5A5757",
          indexLabelFontSize: 16,
          indexLabelPlacement: "outside",
          dataPoints:dataPoints
        }]
      });
      chart.render();

    }else{
     /*  alert("No record found!"); */
    }
  }).fail(function (response){
   /*  alert("No record found!"); */
    console.log(response.responseText);
  });
  


 }
function onViewDashboard() {
  /* date_filter =  $('#daterange').val(); */
  /*  */
  $.ajax({  
    url:"../php/dashboardview.php",  
    method:"POST",  
   /*  data: {date_filter:date_filter},  */
    data: "", 
    dataType: "json",
    encode: true, 
  }).done(function (response) {
    if(response.success){
      let materialData = [];
      console.log("res",response);
      document.getElementById("material_label").innerText = response.material[0].ctr
      document.getElementById("account_label").innerText = response.account[0].ctr
      document.getElementById("requisition_label").innerText = response.requisition[0].ctr
      response.material_graph.forEach(element => {
        if(element.label == 1){
          element.label = "Supplies";
        }else if(element.label == 2){
          element.label = "Fixed Assets";
        }else{
          element.label = "Obsolete";
        }
        materialData.push({y: parseInt(element.y),label:element.label});
      });

      var chart = new CanvasJS.Chart("materailChartContainer", {
        theme: "light2", // "light1", "light2", "dark1", "dark2"
        animationEnabled: true,
        backgroundColor: "#e0e8f8",
        data: [{
          type: "pie",
          startAngle: 25,
          toolTipContent: "<b>{label}</b>: {y}",
          showInLegend: "true",
          legendText: "{label}",
          indexLabelFontSize: 16,
          indexLabel: "{label} - {y}",
          dataPoints: materialData
        }]
      });
      chart.render();

    }else{
      alert("No record found!");
    }
  }).fail(function (response){
    console.log(response.responseText);
  });
  
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
            let template = `
              Hi ${$('#email').val()}, <br><br>
              Thanks for signing up in ORIS: An Online Requisition and Inventory System for City College of Calamba.<br>
              Your account has been successfully created. Below is your account password information.<br>
              Password: ${response.data} <br>
              <a href='http://orisadmin.ezyro.com/'>Login here </a> <br>
              Thanks and Regards,.<br>
              ORIS`;
            sendMail($('#email').val(),subject,template);
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
                    <span  data-bs-toggle="modal" data-bs-target="#addUserModal" class="btn btn-primary "  onClick="onClickEditAccount(${element.account_id})">Edit</span> 
                    <span class="btn btn-primary "  onClick="onDeleteAccount(${element.account_id})" >Delete</span> 
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
          `<tr id="${element.product_code}">
              <td>${ctr}</td>
              <td>${element.product_code}</td>
              <td>${element.product_name}</td>
              <td>${element.product_description}</td>
              <td >${element.product_quantity} <span class="d-block d-none warning" id="alert_quantity${element.product_code}">(Low)</span> </td>
              <td>${element.product_unit}</td>
              <td>${element.product_location}</td>
              <td>${element.product_person_incharge}</td>
              <td>${element.product_inventory_date}</td>
              <td  >${element.product_recieved_date}</td>
              <td>
                  <span  data-bs-toggle="modal" data-bs-target="#addMaterialModal" class="btn btn-primary " onClick='onClickEditMaterial(${JSON.stringify(element.product_code)})'   >Edit</span> 
                  <span class="btn btn-primary " onClick='onDeleteMaterial(${JSON.stringify(element.product_code)})' >Delete</span> 
              </td>
          </tr>`;
        }else if(parseInt(category_id) == 2){
          ctr = ctr + 1;
          template = 
          `<tr id="${element.product_code}">
              <td>${ctr}</td>
              <td>${element.product_code}</td>
              <td>${element.product_name}</td>
              <td>${element.product_description}</td>
              <td>${element.product_quantity} <span class="d-block d-none warning" id="alert_quantity${element.product_code}">(Low)</span></td>
              <td>${element.product_unit}</td>
              <td>${element.product_location}</td>
              <td>${element.product_person_incharge}</td>
              <td>${element.product_status}</td>
              <td>${element.product_inventory_date}</td>
              <td>${element.product_remarks}</td>
              <td>
                  <span data-bs-toggle="modal" data-bs-target="#addMaterialModal" class="btn btn-primary " onClick='onClickEditMaterial(${JSON.stringify(element.product_code)})' >Edit</span>  
                  <span class="btn btn-primary " onClick='onDeleteMaterial(${JSON.stringify(element.product_code)})' >Delete</span> 
              </td>
          </tr>`;
        }else{
          ctr = ctr + 1;
          template = 
          `<tr>
              <td>${ctr}</td>
              <td>${element.product_code}</td>
              <td>${element.product_name}</td>
              <td>${element.product_quantity}  </td>
              <td>${element.product_unit}</td>
              <td>${element.product_location}</td>
              <td>${element.product_person_incharge}</td>
              <td>${element.product_status}</td>
              <td>
                  <span  data-bs-toggle="modal" data-bs-target="#addMaterialModal" class="btn btn-primary " onClick='onClickEditMaterial(${JSON.stringify(element.product_code)})' >Edit</span>  
                  <span class="btn btn-primary " onClick='onDeleteMaterial(${JSON.stringify(element.product_code)})' >Delete</span> 
              </td>
          </tr>`;
        }
        table.innerHTML += template;
        if(element.product_quantity == 0){
          document.getElementById(element.product_code).classList.add('danger');
        }
        if(element.product_quantity <= 20 && element.product_quantity > 0){
          document.getElementById("alert_quantity"+element.product_code).classList.remove('d-none');
          document.getElementById("alert_quantity"+element.product_code).classList.add('warning');
        /*   document.getElementById(element.product_code).classList.add('warning'); */
        }
      
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
  $("#product_category option[value='3']").remove();
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

  var select = document.getElementById("product_category");
  var option = document.createElement("option");
  option.value = 3;
  option.text = "Defective";
  select.appendChild(option);
  


  document.getElementById("addMaterialModalLabel").innerText = "Update Material";
  document.getElementById("create_material_submit").setAttribute("onclick","onUpdateMaterial(1)");
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
              document.getElementById('qr-download').click();
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
function onUpdateMaterial(form) {
    let formData;
    let url;
    if (form == 1) {
       formData = $('#material_form').serialize();
       url = "../php/materialupdate.php";

    }else{
       formData = $('#scaned_material_form').serialize();
       url = "../php/materialscanupdate.php";
    }
    $.ajax({  
      url:url,  
      method:"POST",  
      data: formData, 
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
function onScanDelete() {
  let product_code_scan =  $('#product_code_scan').val();
  let text = "Do you want to delete the record?";
  if (confirm(text)) {
    $.ajax({  
      url:"../php/materialdelete.php",  
      method:"POST",  
      data: {product_code:product_code_scan}, 
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
function onDownloadPDFMaterial() {
  let table_header = "Supplies";
  let table_header_count = 10;
  if(table_selected == 1 ){
    table_header = "Inventory Record: Supplies";
    table_header_count = 10;
  }else if(table_selected == 2 ){
    table_header = "Inventory Record: Fixed Assets";
    table_header_count = 11;
  }else if(table_selected == 3 ){
    table_header = "Inventory Record: Obsolete";
    table_header_count = 8;
  }
  // Select the table
  var table = document.getElementById('table_material');
  // Extract the data from the table
  var data = [];
  for (var i = 0; i < table.rows.length; i++) {
      var row = table.rows[i];
      var rowData = [];
      for (var j = 0; j < table_header_count; j++) {
          rowData.push(row.cells[j].innerHTML);
      }
      data.push(rowData);
  }
  var docDefinition = {
    content: [
      {text: table_header, fontSize: 21, bold: true, margin: [0, 20, 20, 8]},
      {table: {
          headerRows: 1,
          widths: 'auto',
          body: data  ,      
        }
      }
    ],
    defaultStyle: {
      // alignment: 'justify'
      fontSize: 9,
    }
  };
  
  // Download the PDF
  pdfMake.createPdf(docDefinition).download();
  
  }

/* Requisition */
function onViewHistoryList() {
  table_selected = 4;
  limit =  $('#page_limit').val();
  search =  $('#searchbar').val();
  $.ajax({  
    url:"../php/requestview.php",  
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
            <th>Date Requested</th>
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
            <th>Date Requested</th>
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
          let status = "";
          if(element.status == 1){
            status = "Pending";
          }else if(element.status == 2){
            status = "Approved";
          }else if(element.status == 4){
            status = "Returned";
          }else{
            status = "Rejected";
          }
          if(element.product_category == 1){
            element.product_category = "Supplies";
          }else{
            element.product_category = "Fixed Assets";
          }

         
          template = 
          `<tr >
              <td>${ctr}</td>
              <td>${element.product_category}</td>
              <td>${element.full_name}</td>
              <td>${element.position}</td>
              <td>${element.product_name}</td>
              <td>${element.product_quantity}</td>
              <td>${element.date_requested}</td>
              <td >  <span class="status" id="request${ctr}" > ${status} </span>  </td>
              <td>
                  <span data-bs-toggle="modal" data-bs-target="#requestModal" class="btn btn-primary " onClick='onClickViewHistory(${JSON.stringify(element)})' >View</span>
              </td>
          </tr>`;
       
        table.innerHTML += template;

        if(status == "Pending"){
          document.getElementById("request"+ctr).classList.add('pending');
        }
        if(status == "Approved"){
          document.getElementById("request"+ctr).classList.add('approved');
        }
        if(status == "Returned"){
          document.getElementById("request"+ctr).classList.add('returned');
        }
        if(status == "Rejected"){
          document.getElementById("request"+ctr).classList.add('rejected');
        }
    });

}
function onClickViewHistory(history) {
  $.ajax({  
    url:"../php/materialallview.php",  
    method:"POST",  
    data: {product_code:history.product_code},  
    dataType: "json",
    encode: true, 
  }).done(function (response) {
    if(response.success){
      console.log("req",response);
      document.getElementById("on_hand").value = response.data.product_quantity ;
    }else{
    
    }
  }).fail(function (response){
    console.log(response.responseText);
  });


  date_approved = document.getElementById("date_approved");
  date_approved.min = new Date().toISOString().split("T")[0];
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
  document.getElementById("approved_by").value = history.approved_by;
  document.getElementById("note_by").value = history.noted_by;
  document.getElementById("request_id").value = history.id;
  date_approved.value = history.date_approved ;

  console.log(history);


  if(history.product_category == "Fixed Assets"){
    if(history.status == 2){
      $("#history_form").find("select").prop("disabled", false);
      $("#history_form").find("input").prop("disabled", true);
      document.getElementById('submit-btn').classList.add('d-none');
    } else if(history.status == 3){
      $("#history_form").find("input").prop("disabled", true);
      $("#history_form").find("select").prop("disabled", true);
      document.getElementById('submit-btn').classList.add('d-none');
    }
  }else{
    $("#history_form").find("select").prop("disabled", false);
    $("#history_form").find("input").prop("disabled", false);
    document.getElementById('submit-btn').classList.remove('d-none');
  }


}
function onUpdateRequest() {
  $("#product_code").removeAttr("disabled");
  $.ajax({  
    url:"../php/requestupdate.php",  
    method:"POST",  
    data: $('#history_form').serialize(), 
    dataType: "json",
    encode: true, 
  }).done(function (response) {
    if(response.success){
      console.log("res:",response);
      alert(response.success_msg);
      window.location.reload();
    }else{
      alert(response.error_msg);
    }
  }).fail(function (response){
    console.log(response.responseText);
  });
}
function onUpdateStatus(params) {
  let status = document.getElementById("status").value;
  console.log(status);
  if(status  == 2){
    document.getElementById("status_label").innerText = "Date Approved"
    document.getElementById("approved_label").innerText = "Approved by"
    document.getElementById("date_approved").value = new Date().toISOString().split("T")[0];
  }else if(status == 3){
    document.getElementById("status_label").innerText = "Date Rejected"
    document.getElementById("approved_label").innerText = "Rejected by"
    document.getElementById("date_approved").value = new Date().toISOString().split("T")[0];
  }else if(status == 4){
    document.getElementById("status_label").innerText = "Date Returned"
    document.getElementById("approved_label").innerText = "Approved by"
    document.getElementById("date_approved").value = null;
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
function onDownlaodPDF() {
// Select the table
var table = document.getElementById('table_content');
// Extract the data from the table
var data = [];
for (var i = 0; i < table.rows.length; i++) {
    var row = table.rows[i];
    var rowData = [];
    for (var j = 0; j < 8; j++) {
        rowData.push(row.cells[j].innerHTML);
    }
    data.push(rowData);
}
var docDefinition = {
  content: [
    {text: 'Requisition Record:', fontSize: 21, bold: true, margin: [0, 20, 20, 8]},
    {
      table: {
 
        headerRows: 1,
        widths:  ['auto', 'auto', 'auto','auto', 'auto', 'auto', 'auto', 'auto'],
        body: data
      }
    }
  ]
};

// Download the PDF
pdfMake.createPdf(docDefinition).download();

}



