/* Alert Options */
toastr.options = {
  "closeButton": true,
  "positionClass": "toast-top-center",
  "newestOnTop": true,
  "preventDuplicates":true
}
let ctr = 0;
let page = 0;
let items = 0;
let limit = 0;

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
            sessionStorage.setItem("account",response.data);
            location.href = '../admin/pages/dashboard.html'
            toastr.success(response.success_msg)
          }else{
            toastr.error(response.error_msg)
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
      employment_status: { required: true },
      position : { required: true },
      department: { required: true }
    },
    submitHandler: function (form) {
        $.ajax({  
          url:"../php/createaccount.php",  
          method:"POST",  
          data: $('#account_form').serialize(), 
          dataType: "json",
          encode: true, 
        }).done(function (response) {
          if(response.success){
            toastr.success(response.success_msg);
            // $('#addUserModal').modal('hide');
            window.location.reload();
          }else{
            toastr.error(response.error_msg)
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
    url:"../php/viewaccount.php",  
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
    }else{
      toastr.error(response.error_msg)
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
                    <span  data-bs-toggle="modal" data-bs-target="#downloadModal" onClick="onViewDownloadableList(${element.id})" class="action-button">Files</span> |
                    <span  data-bs-toggle="modal" data-bs-target="#moduleModal" class="action-button" onClick="onClickEditModule(${element.id})">Edit</span> | 
                    <span class="action-button" onClick="onDeleteModule(${element.id})" >Delete</span> 
                </td>
            </tr>`;
        table.innerHTML += template;
    });
}

