/* Alert Options */
toastr.options = {
  "closeButton": true,
  "positionClass": "toast-top-center",
  "newestOnTop": true,
  "preventDuplicates":true
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
            console.log(response);
            toastr.success(response.success_msg)
            sessionStorage.setItem("account",response.data);
            location.href = '../admin/pages/dashboard.html'
          }else{
            console.log(response);
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
      department: { required: true },
    },
    submitHandler: function (form) {
      console.log("check : ",$('#account_form').serialize());
      /*   $.ajax({  
          url:"../php/createaccount.php",  
          method:"POST",  
          data: $('#account_form').serialize(), 
          dataType: "json",
          encode: true, 
        }).done(function (response) {
          if(response.success){
            console.log(response);
            toastr.success(response.success_msg)
          }else{
            toastr.error(response.error_msg)
          }
        }).fail(function (response){
          console.log(response.responseText);
        }); */
    }
  });
}


