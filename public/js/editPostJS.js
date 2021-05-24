$(document).ready(function(){

    //displaying categories in the editPost
    var category = ['Graphic Design', '3D', 'Pixel', 'Painting'];
        
    for(var i = 0; i < category.length; i++){
        if (category[i] !== $('#editCategory').val())
            $('#editCategory').append('<option value="' + category[i] + '">' + category[i] + '</option>') 
    }

    $('#save').click(function(){
        
        var postid = $('#editpostid').val();
        var owner = $('#editowner').val();
        var category = $('#editCategory').val();
        var desc = $('#editPDesc').val();

        $.get('/updatePost', {postid: postid, owner: owner, category: category, desc: desc}, function(){});
    })

});
