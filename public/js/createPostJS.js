$(document).ready(function(){

    //checks if the file is an image
    function readImage(file){
        
        if(file.type && !file.type.startsWith('image/')){
            return false;
        }

        else if (!file.type.match('image/jpg|image/jpeg|image/png')){
            return false;
        }

        else{
            return true;
        }
    };

    $('#uploadImage').change(function(){
        var imgFile = this.files[0];
       
        if(readImage(imgFile)){
            $(this).css('background-color', '');
            $('#errorImg').text('');
            $('#upload').prop('disabled', false);   
        }

        else{
            $(this).css('background-color', 'red');
            $('#errorImg').text('**file extension is not accepted. Choose .jpg, .jpeg, .png only');
            $('#upload').prop('disabled', true);   
        } 
    })

});
