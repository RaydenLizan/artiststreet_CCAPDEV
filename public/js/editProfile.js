$(document).ready(function() {
   
    function readImage(file){
        
        /*if(file.type && !file.type.startsWith('image/')){
            return false;
        }*/

      //  else 
        if (!file.type.match('image/jpg|image/jpeg|image/png')){
            return false;
        }

        else{
            return true;
        }
    };

    $('#uploadPic').change(function(){
        var picFile = this.files[0];
       
        if(readImage(picFile)){

            var reader = new FileReader();

            //previews image
            reader.onload = function(){
                $('#avatarPic').attr("src", reader.result);
            }

            reader.readAsDataURL(picFile);
           // console.log('result? = '+$('#avatarPic').attr('src'));
          //  console.log('filename? = '+$('#uploadPic').val().split('\\').pop());

            $(this).css('background-color', '');
            $('#errPic').text('');
            $('#saveBtn').prop('disabled', false);  
            $('#uploadBtn').prop('disabled', false);
        }

        else{
            $(this).css('background-color', 'red');
            $('#errPic').text('File extension is not accepted. Choose .jpg, .jpeg, .png only.');
            $('#saveBtn').prop('disabled', true);  
            $('#uploadBtn').prop('disabled', true);  
        } 

    });

    var profile = {
        username : $('#hidUsername2').val(), //value from hidden input
        oldPsword : $("#hidPw2").val(),
        email : $("#editEmail").val(),
        spec : $("#editSpec").val(),
        desc : $("#editDesc").val(),
        psword : $("#editPsword").val(),
        conPsword : $("#confirmPsword").val(),
        picName : $('#uploadPic').val().split('\\').pop()
    }

    $('#uploadPic').on("submit", function(e){

       $.post('/uploadPic', profile.username, function(result){

                if(result){
                    console.log('avatar uploaded');
                }
    
                else{
                    console.log('nooooo');
                }
            })

    })

    function on_save(){

      var username = $('#hidUsername2').val();  //value from hidden input
      console.log('psst user='+username);
      var oldPsword = $("#hidPw2").val();
      var email = $("#editEmail").val();
      var spec = $("#editSpec").val();
      var desc = $("#editDesc").val();
      var psword = $("#editPsword").val();
      var conPsword = $("#confirmPsword").val();
      var picName = $('#hidAvatar2').val();
      console.log('picName = '+picName);

      if(spec!='')
        $("#specInfo").val(spec);

      //ask for confirmation
      var oldPw = prompt("Enter old password to apply new changes:");

      //ajax for checking hashed pw
      $.get('/checkPw/'+username, {username: username, password: oldPw}, function(result){

            if(result){

                //redirects to view profile page if old password is entered and stays on edit page if not
                if(psword==conPsword && oldPw!=null){

                    //code for updating changes to db 
                    $.get('/updateProfile/'+username, {
                        username: username,
                        password: psword,
                        email: email,
                        spec: spec,
                        desc: desc,
                        confirmPw: conPsword,
                        avatar: picName //'/avatars/'+
                    }, function(result){

                        if(result){
                            alert("Profile updated successfully.");                  
                        }
                            
                        else{
                            console.log("oh nooooo");
                        }
                    });
            
                    window.location.href= "/getViewProfile/"+username;
                }
                
            }

            //if new password is not empty and does not match confirm password
            console.log("result: "+result+'\n'+"input: "+psword);

            if(psword!=conPsword && psword!=null){
                console.log("result: "+result);
                alert("New password does not match confirm password.");
            }

            else if(!result && oldPw!=null){
                alert("Incorrect old password. Changes cannot be applied.");
            }
            
      });

    }

    $("#saveBtn").click(on_save);
    

  })