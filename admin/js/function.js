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
     /*  document.getElementById("delete_btn").classList.remove("d-none"); */
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
  }else if(table_selected == 5){
    onViewActivityLog();
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
  }else if(table_selected == 5){
    onViewActivityLog();
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
  }else if(table_selected == 5){
    onViewActivityLog();
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
function onLogout() {
  let text = "Are you sure you want to logout?";
  if (confirm(text)) {
      $.ajax({  
        url:"php/activitycreate.php",  
        method:"POST",  
        data: '', 
      }).done(function (response) {
        localStorage.clear();
        location.href = '../index.html';
      }).fail(function (data){
        console.log(data);
      });
  }
}
function onChangeTab(params,tab) {
  page = 0;
  ctr = 0;
  document.getElementById("page_number").innerText = 1;
  table_selected = params;
  if(table_selected == 0){
    onViewAccountList();
  }else{
    if(tab == "Inventory"){
      onViewMaterialList(table_selected);
    }else{
      onViewPhysicalList(table_selected);
    }
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
      let totalPage = Math.ceil(items / limit);
      let next = document.getElementById("next");
      let prev = document.getElementById("prev");
      if(parseInt(limit) >= parseInt(items)){
          next.style.display = "none";
          prev.style.display = "none";
      }else if(page <= 0){
          prev.style.display = "none";
          next.style.display = "block";
      }else if(totalPage <= page+1){
          next.style.display = "none";
          prev.style.display = "block";
      }
      table.innerHTML = "";
      switch (parseInt(category_id)) {
          case 1:
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
              break;
          case 2:
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
              break;
          default:
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
    ctr++;
    let productCode = element.product_code;
    let productQuantity = element.product_quantity;
    let row = `<tr id="${productCode}">`;
    row += `<td>${ctr}</td>`;
    row += `<td>${productCode}</td>`;
    row += `<td>${element.product_name}</td>`;
    if (parseInt(category_id) == 1) {
        row += `<td>${element.product_description}</td>`;
        row += `<td>${productQuantity} <span class="d-block d-none warning" id="alert_quantity${productCode}">(Low)</span></td>`;
        row += `<td>${element.product_unit}</td>`;
        row += `<td>${element.product_location}</td>`;
        row += `<td>${element.product_person_incharge}</td>`;
        row += `<td>${element.product_inventory_date}</td>`;
        row += `<td>${element.product_recieved_date}</td>`;
    } else if (parseInt(category_id) == 2) {
        row += `<td>${element.product_description}</td>`;
        row += `<td>${productQuantity} <span class="d-block d-none warning" id="alert_quantity${productCode}">(Low)</span></td>`;
        row += `<td>${element.product_unit}</td>`;
        row += `<td>${element.product_location}</td>`;
        row += `<td>${element.product_person_incharge}</td>`;
        row += `<td>${element.product_status}</td>`;
        row += `<td>${element.product_inventory_date}</td>`;
        row += `<td>${element.product_remarks}</td>`;
    } else {
        row += `<td>${productQuantity}</td>`;
        row += `<td>${element.product_unit}</td>`;
        row += `<td>${element.product_location}</td>`;
        row += `<td>${element.product_person_incharge}</td>`;
        row += `<td>${element.product_status}</td>`;
    }
    row += `<td>
                <span data-bs-toggle="modal" data-bs-target="#addMaterialModal" class="btn btn-primary" onClick='onClickEditMaterial(${JSON.stringify(productCode)})'>Edit</span>
                <span class="btn btn-primary" onClick='onDeleteMaterial(${JSON.stringify(productCode)})'>Delete</span>
            </td>`;

    row += `</tr>`;
    table.innerHTML += row;
    if (parseInt(productQuantity) < 10) {
    document.getElementById("alert_quantity"+productCode).classList.remove("d-none");
    }
  });
    if (template == null) {
      template = table.innerHTML;
    }
    if (data.length == 0) {
      table.innerHTML = "<tr><td colspan='10' class='text-center'>No data found.</td></tr>";
    }

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
function onNotify() {
  let sessionData = sessionStorage.getItem("history_list");
  let json_history = JSON.parse(sessionData);
  let category =  "";
  let status  =  "";
  let date  =  "";
  limit = 99999;
  search =  "";
  $.ajax({  
    url:"../php/requestview.php",  
    method:"POST",  
    data: {limit:limit,page:page*limit,search:search,category:category,status:status,date:date},  
    dataType: "json",
    encode: true, 
  }).done(function (response) {
    let notif_badge = document.getElementById('notification-badge');
    console.log('session',json_history.length);
    console.log('response.data.length',response.data.length);

    if(response.data.length == json_history.length){
      notif_badge.classList.add('d-none');
    }else{
      notif_badge.classList.remove('d-none');
      notif_badge.innerText = (response.data.length - json_history.length);
    }

  }).fail(function (response){
    console.log(response.responseText);
  });

}
function onViewHistoryList() {
  ctr = 0;
  table_selected = 4;
  let category =  "";
  let status  =  "";
  let date  =  "";

  limit =  $('#page_limit').val();
  search =  $('#searchbar').val();
  $.ajax({  
    url:"../php/requestview.php",  
    method:"POST",  
    data: {limit:limit,page:page*limit,search:search,category:category,status:status,date:date},  
    dataType: "json",
    encode: true, 
  }).done(function (response) {
    var table = document.querySelector("table");
    if(response.success){
      items = response.page_limit[0].ctr;
      let totalPage = Math.ceil(items / limit);
      let next = document.getElementById("next");
      let prev = document.getElementById("prev");
      if(parseInt(limit) >= parseInt(items)){
          next.style.display = "none";
          prev.style.display = "none";
      }else if(page <= 0){
          prev.style.display = "none";
          next.style.display = "block";
      }else if(totalPage <= page+1){
          next.style.display = "none";
          prev.style.display = "block";
      }
      table.innerHTML =  "";
        var template =`
          <thead>
            <th>#</th>
            <th>Category</th>
            <th>Full Name</th>
            <th>Department</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Date Requested</th>
            <th>Status</th>
            <th>Action</th>
          </thead>`;
      table.innerHTML += template;
      onGenerateHistoryList(response.data);
    }else{
      table.innerHTML ="";
      var template =`
          <thead>
            <th>#</th>
            <th>Category</th>
            <th>Full Name</th>
            <th>Department</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Unit</th>
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
function onViewAllHistory() {
  $.ajax({  
    url:"../php/requestallview.php",  
    method:"POST",  
    data: '',  
    dataType: "json",
    encode: true, 
  }).done(function (response) {
    if(response.success){
      sessionStorage.setItem("history_list",JSON.stringify(response.data));
    }
  }).fail(function (response){
    console.log(response.responseText);
  });
  
}
function onViewFilteredHistoryList() {
  ctr =0;
  table_selected = 4;
  let category =  $('#category_filter').val();
  let status  =  $('#status_filter').val();
  let date  =  $('#date_requested_filter').val();

  limit =  $('#page_limit').val();
  search =  $('#searchbar').val();
  $.ajax({  
    url:"../php/requestview.php",  
    method:"POST",  
    data: {limit:limit,page:page*limit,search:search,category:category,status:status,date:date},  
    dataType: "json",
    encode: true, 
  }).done(function (response) {
    var table = document.querySelector("table");
    if(response.success){
      console.log(response);
      items = response.page_limit[0].ctr;
      let totalPage = Math.ceil(items / limit);
      let next = document.getElementById("next");
      let prev = document.getElementById("prev");
      if(parseInt(limit) >= parseInt(items)){
          next.style.display = "none";
          prev.style.display = "none";
      }else if(page <= 0){
          prev.style.display = "none";
          next.style.display = "block";
      }else if(totalPage <= page+1){
          next.style.display = "none";
          prev.style.display = "block";
      }
      table.innerHTML =  "";
        var template =`
          <thead>
            <th>#</th>
            <th>Category</th>
            <th>Full Name</th>
            <th>Department</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Unit</th>
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
            <th>Department</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Unit</th>
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
              <td>${element.department}</td>
              <td>${element.product_name}</td>
              <td>${element.product_quantity}</td>
              <td>${element.product_unit}</td>
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
  document.getElementById("department").value = history.department ;
  document.getElementById("purpose").value = history.purpose ;
  document.getElementById("date_requested").value = history.date_requested ;
  document.getElementById("date_to_claim").value = history.date_to_claim ;
  document.getElementById("status").value = history.status ;
  document.getElementById("approved_by").value = history.approved_by;
  document.getElementById("note_by").value = history.noted_by;
  document.getElementById("request_id").value = history.id;
  date_approved.value = history.date_approved ;

  if(history.product_category == "Fixed Assets"){
    if(history.status == 2){
      $("#history_form").find("select").prop("disabled", false);
      $("#history_form").find(".disable").prop("disabled", true);
      $("#history_form").find(".to-disable").prop("disabled", true);
      document.getElementById('submit-btn').classList.remove('d-none');
    } else if(history.status == 3 || history.status == 4){
      $("#history_form").find(".disable").prop("disabled", true);
      $("#history_form").find(".to-disable").prop("disabled", true);
      $("#history_form").find("select").prop("disabled", true);
      document.getElementById('submit-btn').classList.add('d-none');
    }else{
      $("#history_form").find(".disable").prop("disabled", true);
      $("#history_form").find(".to-disable").prop("disabled", false);
      document.getElementById('submit-btn').classList.remove('d-none');
    }
  }else{
    if(history.status == 2 || history.status == 3){
      $("#history_form").find(".disable").prop("disabled", true);
      $("#history_form").find(".to-disable").prop("disabled", true);
      $("#history_form").find("select").prop("disabled", true);
      document.getElementById('submit-btn').classList.add('d-none');
    } else{
      $("#history_form").find("select").prop("disabled", false);
      $("#history_form").find(".disable").prop("disabled", true);
      $("#history_form").find(".to-disable").prop("disabled", false);
      document.getElementById('submit-btn').classList.remove('d-none');
    }
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
let request_list = sessionStorage.getItem('history_list');
var jsonData = JSON.parse(request_list);
var pdfData = [];

var pdfRow = [
  { text: '#', style: 'header' },
  { text: 'Category', style: 'header' },
  { text: 'Name', style: 'header' },
  { text: 'Department', style: 'header' },
  { text: 'Product Name', style: 'header' },
  { text: 'Quantity', style: 'header' },
  { text: 'Unit', style: 'header' },
  { text: 'Date Requested', style: 'header' },
  { text: 'Status', style: 'header' }
];
pdfData.push(pdfRow);
var ctr = 0;
for (var i = 0; i < jsonData.length; i++) {
   ctr++;
    var obj = jsonData[i];
    if(obj.status == 1){
      obj.status = 'Pending';
    }else if(obj.status == 2){
      obj.status = 'Approved';
    }else if(obj.status == 3){
      obj.status = 'Rejected';
    }else if(obj.status == 4){
      obj.status = 'Returned';
    }
    var pdfRow = [ctr,obj.product_category, obj.full_name, obj.department, obj.product_name, obj.product_quantity,obj.product_unit, obj.date_requested,obj.status];
    pdfData.push(pdfRow);
}
var docDefinition = {
  content: [
    {
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAjUAAAIpCAYAAABaAcl4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAF62lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAxOS0wNy0wMlQyMjo0ODoxMiswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxOS0wNy0wMlQyMjo0ODoxMiswODowMCIgeG1wOk1vZGlmeURhdGU9IjIwMTktMDctMDJUMjI6NDg6MTIrMDg6MDAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDY4NGI1YmUtNTA1OS0wYTQ2LWI0NjItMThhODRjMmYyYTNlIiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6NWUzMDUyN2ItYmQxYy1iNjQzLWJjYWEtMjAz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',
      width: 70,
      height: 70,
      alignment: 'center'
    },
    {text: 'CITY COLLEGE OF CALAMBA', fontSize: 12, alignment: 'center'},
    {text: 'Office of the Vice President for Administration', fontSize: 10, alignment: 'center'},
    {text: 'List of Request', fontSize: 21, bold: true, margin: [0, 20, 20, 8],alignment: 'center'},
    {
      table: {
        headerRows: 1,
        body: pdfData
      }
    },
  ],
  styles: {
		header: {
			fontSize: 14,
			bold: true,
		},
	},
};

// Download the PDF
pdfMake.createPdf(docDefinition).download();

}


/* Physical Inventory */
function onViewPhysicalList(category_id) {
  table_selected = category_id;
  limit =  $('#page_limit').val();
  search =  $('#searchbar').val();
  $.ajax({  
    url:"../php/physicalview.php",  
    method:"POST",  
    data: {limit:limit,page:page*limit,search:search,category_id:category_id},  
    dataType: "json",
    encode: true, 
  }).done(function (response) {
    var table = document.querySelector("table");
    if(response.success){
      items = response.page_limit[0].ctr;
      let totalPage = Math.ceil(items / limit);
      let next = document.getElementById("next");
      let prev = document.getElementById("prev");
      if(parseInt(limit) >= parseInt(items)){
          next.style.display = "none";
          prev.style.display = "none";
      }else if(page <= 0){
          prev.style.display = "none";
          next.style.display = "block";
      }else if(totalPage <= page+1){
          next.style.display = "none";
          prev.style.display = "block";
      }
      
      table.innerHTML =  "";
      table.innerHTML = "";
      switch (parseInt(category_id)) {
          case 1:
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
              break;
          case 2:
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
              break;
          default:
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
      onGeneratePhysicalList(response.data,category_id);
      sessionStorage.setItem("physical_list",JSON.stringify(response.data));
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
function onRegisterScanedItem() {
  let qty = $('#product_quantity_scan').val;

  $('#scaned_material_form').validate({
    submitHandler: function (form) {
      $.ajax({  
        url:"../php/physicalcreate.php",  
        method:"POST",  
        data: $('#scaned_material_form').serialize(), 
        dataType: "json",
        encode: true, 
      }).done(function (response) {
        if(response.success){
          console.log("Ressult",response);
            alert(response.success_msg)
            window.location.reload();
        }else{
          alert(response.error_msg)
            console.log("Ressult",response.error_msg);
        }
      }).fail(function (response){
        console.log(response.responseText);
      });
    }
  });

}
function onGeneratePhysicalList(data,category_id) {
  let table = document.querySelector("table");
  let template;
data.forEach(element => {
    ctr++;
    let productCode = element.product_code;
    let productQuantity = element.product_quantity;
    let row = `<tr id="${productCode}">`;
    row += `<td>${ctr}</td>`;
    row += `<td>${productCode}</td>`;
    row += `<td>${element.product_name}</td>`;
    if (parseInt(category_id) == 1) {
        row += `<td>${element.product_description}</td>`;
        row += `<td>${productQuantity} <span class="d-block d-none warning" id="alert_quantity${productCode}">(Low)</span></td>`;
        row += `<td>${element.product_unit}</td>`;
        row += `<td>${element.product_location}</td>`;
        row += `<td>${element.product_person_incharge}</td>`;
        row += `<td>${element.product_inventory_date}</td>`;
        row += `<td>${element.product_recieved_date}</td>`;
    } else if (parseInt(category_id) == 2) {
        row += `<td>${element.product_description}</td>`;
        row += `<td>${productQuantity} <span class="d-block d-none warning" id="alert_quantity${productCode}">(Low)</span></td>`;
        row += `<td>${element.product_unit}</td>`;
        row += `<td>${element.product_location}</td>`;
        row += `<td>${element.product_person_incharge}</td>`;
        row += `<td>${element.product_status}</td>`;
        row += `<td>${element.product_inventory_date}</td>`;
        row += `<td>${element.product_remarks}</td>`;
    } else {
        row += `<td>${productQuantity}</td>`;
        row += `<td>${element.product_unit}</td>`;
        row += `<td>${element.product_location}</td>`;
        row += `<td>${element.product_person_incharge}</td>`;
        row += `<td>${element.product_status}</td>`;
    }
    {/* <span data-bs-toggle="modal" data-bs-target="#addMaterialModal" class="btn btn-primary" onClick='onClickEditMaterial(${JSON.stringify(productCode)})'>Edit</span> */}
    row += `<td>
                <span class="btn btn-primary" onClick='onDeleteMaterial(${JSON.stringify(productCode)})'>Delete</span>
            </td>`;

    row += `</tr>`;
    table.innerHTML += row;
    if (parseInt(productQuantity) < 10) {
    document.getElementById("alert_quantity"+productCode).classList.remove("d-none");
    }
  });
    if (template == null) {
      template = table.innerHTML;
    }
    if (data.length == 0) {
      table.innerHTML = "<tr><td colspan='10' class='text-center'>No data found.</td></tr>";
    }

}

/* Activity Log */
function onViewActivityLog() {
  table_selected = 5;
  limit =  $('#page_limit').val();
  search =  $('#searchbar').val();
  $.ajax({  
    url:"../php/activityview.php",  
    method:"POST",  
    data: {limit:limit,page:page*limit,search:search},  
    dataType: "json",
    encode: true, 
  }).done(function (response) {
    var table = document.querySelector("table");
    if(response.success){
      items = response.page_limit[0].ctr;
      let totalPage = Math.ceil(items / limit);
      let next = document.getElementById("next");
      let prev = document.getElementById("prev");
      if(parseInt(limit) >= parseInt(items)){
          next.style.display = "none";
          prev.style.display = "none";
      }else if(page <= 0){
          prev.style.display = "none";
          next.style.display = "block";
      }else if(totalPage <= page+1){
          next.style.display = "none";
          prev.style.display = "block";
      }
      
      table.innerHTML = "";
      var template =`
      <thead>
        <th>Account</th>
        <th>Activity</th>
        <th>Date</th>
      </thead>`;
     /*  <th>IP Address</th> */
      table.innerHTML += template;
      onGenerateActivityLog(response.data);
      sessionStorage.setItem("activity_list",JSON.stringify(response.data));
    }else{
      table.innerHTML ="";
      var template =`
          <thead>
            <th>Account</th>
            <th>Activity</th>
            <th>Date</th>
          </thead>
          <tbody>
            <tr>
              <td colspan="4">No records found!</td>
            </tr>
          </tbody>`;
      table.innerHTML += template;
    }
  }).fail(function (response){
    console.log(response.responseText);
  });
}
function onGenerateActivityLog(data) {
  let table = document.querySelector("table");
  let template;
    data.forEach(element => {
        template = 
            `<tr>
                <td>${element.user}</td>
                <td>${element.activity}</td>
                <td>${element.date}</td>
            </tr>`;
        table.innerHTML += template;
    });
}