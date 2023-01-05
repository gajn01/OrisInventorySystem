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
const is_incharge_input = document.getElementById("is_incharge");
const account_id_input = document.getElementById("account_id");

/* Account Form */


function onSelectLimit(table) {
  page = 0;
  ctr  = 0;
  document.getElementById("page_number").innerText = page+1;
  if(table == 'account'){
    onViewAccountList();
  }else if(table == 'other_module'){
      onViewOtherModule(subject_id,school_id,teacher_id);
  }
}
function onSearch(table) {
  ctr =0;
  page = 0;
  if(table == 'account'){
    onViewAccountList();
  }else if(table == 'other_module'){
      onViewOtherModule(subject_id,school_id,teacher_id);
  }
}
function onPage(params,table) {
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
  if(table == 'account'){
      onViewAccountList();
  }else if(table == 'other_module'){
      onViewOtherModule(subject_id,school_id,teacher_id);
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
function onCreateAccount() {
  $('#account_form').validate({
    rules: {
      firstname: { required: true },
      lastname: { required: true },
      email: { required: true ,email: true},
      position : { required: true }
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
      let template =`
          <thead>
            <th>#</th>
            <th>Name</th>
            <th>Department</th>
            <th>Position</th>
            <th>Employment Status</th>
            <th>In Charge</th>
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
      if(element.is_incharge == 1){
        element.is_incharge = "Yes";
      }else{
        element.is_incharge = "No";
      }
        ctr = ctr + 1;
        template = 
            `<tr>
                <td>${ctr}</td>
                <td>${element.firstname} ${element.lastname} </td>
                <td>${element.department}</td>
                <td>${element.position}</td>
                <td>${element.employement_status}</td>
                <td>${element.is_incharge}</td>
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
      firstname_input.value = element.firstname;
      lastname_input.value = element.lastname;
      email_input.value = element.email;
      employment_status_input.value = element.employement_status;
      position_input.value = element.position;
      department_input.value = element.department;
      account_id_input.value = element.account_id;
      if(element.is_incharge == "Yes"){
        $("#is_incharge").prop("checked",true);
      }else{
        $("#is_incharge").prop("checked",false);
      }
    }
  });
}
function onClickAddAccount(acount_id) {
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


