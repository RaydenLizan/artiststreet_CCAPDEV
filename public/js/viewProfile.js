$(document).ready(function() {

    //counts number of post icons created for one row
    var count=0;

    //variable to store current number of rows
    var rows =1;

    //stores id of last added row
    var rowID = "#postRow"+rows;

    var username = $('#username').html();

    var arr = [];

    $.get('/getRecentPosts/'+username, {owner: username}, function(result){

        arr = Object.assign(arr,result);

        //sorts posts info by most recent
        arr.sort().reverse();

        //creates icons and links for recent posts
        for(var i=0; i<arr.length; i++){
            console.log("id= "+arr[i]._id);
            create_view_post(arr[i]);
        }
    });


    function create_view_post(post){

        var newPost = $("<td></td>");

       //adds icons of posts
        newPost.append("<a href='/viewPost/"+post.postid+"/"+username+"'><img src= /uploads/"+post.image.name+ " height='200' width='170'></a>");
        newPost.addClass("artPost");

        $(rowID).append(newPost);

        //updates number of items in row
        count = $(rowID).children().length;

        //if number of posts has reached 5(the max number) in a row
        if(count==5){
            create_post_row();
            count=0;
        }


    }

    //creates new row for more icons
    function create_post_row(){

        var postRow = $('<tr></tr>');
        postRow.addClass("row");

        $("#postGrid").append(postRow);

        rows = $("#postGrid tr").length;

        //for assigning id to new row
        var newID = "postRow"+rows;

        rowID = "#"+newID;

        postRow.attr('id', newID);

    }

    //deleting account
    $('#delBtn').click(function(){

        //FOR TESTING
        // console.log('username: '+$('#username').html());
        // console.log('pw: '+$('#hidPw').val());

        //ask for confirmation
        var ask = confirm("Are you sure you want to delete account?");
 
        var username = $('#username').html();

        //deletes account and goes to index if confirmed, stays on page if not
        if(ask==true){

            //ajax code to delete account, posts, and comments from database 
             $.get('/deleteAccnt/'+username, {username: username}, function(result){

                if(result){
                    alert("Account deleted successfully.");
                    window.location.href='/home';                    
                }
                    
                else{
                    console.log("oh no");
                }
            });
        }
        
    });
    
  })