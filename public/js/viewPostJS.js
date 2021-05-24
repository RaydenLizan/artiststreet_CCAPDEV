$(document).ready(function(){

    var username = $('#viewer').val();

    //if the viewer is not the owner of the post, the update function is not visible
    var owner = $('#owner').val();
    if (owner !== username)
        $('.updatePost').css('visibility', 'hidden');

    if (username === ''){
        $('#upvoteBtnM').prop('disabled', true);
        $('#downvoteBtnM').prop('disabled', true);

        $(".upvoteBtnC").each(function(){
            $(this).prop('disabled', true);
        }),
    
        $(".downvoteBtnC").each(function(){
            $(this).prop('disabled', true);
        })
    }

    else{
        $('#upvoteBtnM').prop('disabled', false);
        $('#downvoteBtnM').prop('disabled', false);

        $(".upvoteBtnC").each(function(){
            $(this).prop('disabled', false);
        }),
    
        $(".downvoteBtnC").each(function(){
            $(this).prop('disabled', false);
        })
    }

    //displaying the highlighted chosen vote by the user
    var downvoters = $('#downvotersM').val(); 

    var arrD = []; 
    if (downvoters != '')
        arrD = downvoters.split(',');
    
    var upvoters = $('#upvotersM').val(); 
    var arr = []; 
    if (upvoters != '')
        arr = upvoters.split(',');

    if (arr.includes(username)){
        $('#upvoteBtnM').css('background-color', 'lightblue');
    }

    else if (arrD.includes(username)){
        $('#downvoteBtnM').css('background-color', 'lightblue');
    }
    
    //displaying the highlighted chosesn comment vote by the user
    $(".upvoteBtnC").each(function(){
        var upvoters = $(this).closest('div').children().eq(2).val();
        var arr = [];
        if (upvoters != '')
            arr = upvoters.split(',');

        if (arr.includes(username)){
            $(this).css('background-color', 'lightblue');
        }
    }),

    $(".downvoteBtnC").each(function(){
        var downvoters = $(this).closest('div').children().eq(5).val();
        var arrD = []; 
        if (downvoters != '')
            arrD = downvoters.split(',');

        if (arrD.includes(username)){
            $(this).css('background-color', 'lightblue');
        }
    }),
    
    $('#delPost').click(function(){
        var postid = $('#postid').val();
        var owner = $('#owner').val();

        $.get('/deletePost', {postid:postid, owner: owner}, function(){});
    }),

    $('#upvoteBtnM').click(function(){
        var postid = $('#postid').val();
        var owner = $('#owner').val();
        var username = $('#viewer').val();

        var upvote = $('#upvoteM').html();
        var upvoters = $('#upvotersM').val(); 
        var arr = []; 
        if (upvoters != '')
            arr = upvoters.split(',');
        
        var downvote = $('#downvoteM').html();
        var downvoters = $('#downvotersM').val(); 
        var arrD = []; 
        if (downvoters != '')
            arrD = downvoters.split(',');

        if (arr.includes(username)){
            upvote = parseInt(upvote) - 1;
            arr = $.grep(arr, function(val){
                return val != username;
            });
            $(this).css('background-color', '');
        }

        else{
            upvote = parseInt(upvote) + 1;
            arr.push(username);
            $(this).css('background-color', 'lightblue');

            if (arrD.includes(username)){
                downvote = parseInt(downvote) - 1;
                arrD = $.grep(arrD, function(val){
                    return val != username;
                });
                $('#downvoteBtnM').css('background-color', '');
            }
        }

        $.get('/updateVoteM', {postid: postid, owner: owner, upvote: upvote, upvoters: arr, downvote: downvote, downvoters: arrD})
        
        $('#upvoteM').html(upvote);
        $('#upvotersM').val(arr); 
        
        $('#downvoteM').html(downvote);
        $('#downvotersM').val(arrD); 
    }),

    $('#downvoteBtnM').click(function(){
        var postid = $('#postid').val();
        var owner = $('#owner').val();
        var username = $('#viewer').val();
     
        var downvote = $('#downvoteM').html();
        var downvoters = $('#downvotersM').val(); 
        var arrD = []; 
        if (downvoters != '')
            arrD = downvoters.split(',');
        
        var upvote = $('#upvoteM').html();
        var upvoters = $('#upvotersM').val(); 
        var arr = []; 
        if (upvoters != '')
            arr = upvoters.split(',');

        if (arrD.includes(username)){
            downvote = parseInt(downvote) - 1;
            arrD = $.grep(arrD, function(val){
                return val != username;
            });
            $(this).css('background-color', '');
        }

        else{
            downvote = parseInt(downvote) + 1;
            arrD.push(username);
         
            $(this).css('background-color', 'lightblue');

            if (arr.includes(username)){
                upvote = parseInt(upvote) - 1;
                arr = $.grep(arr, function(val){
                    return val != username;
                });
                $('#upvoteBtnM').css('background-color', '');
            }
        }
       
        $.get('/updateVoteM', {postid: postid, owner: owner, upvote: upvote, upvoters: arr, downvote: downvote, downvoters: arrD})
        
        $('#downvoteM').html(downvote);
        $('#downvotersM').val(arrD); 

        $('#upvoteM').html(upvote);
        $('#upvotersM').val(arr); 
    }),

    $('#commentPost').click(function(){
        var postid = $('#postid').val();
        var owner = $('#owner').val();
        var comments = $('#cmt').val();
        
        var arr = []; 
        if (comments != '')
            arr = comments.split(',');
      
        var user = $('#viewer').val();
        var userLevel = $('#viewerlvl').val();
        var userComment = $('#userComment').val();
        var userImg = $('#viewerPic').val();
    
        var commentInfo = [];
        var commentid = '' + Math.round(Math.random()*1E9) + Math.round(Math.random()*1E9);

        if (userComment != ''){
            commentInfo = {
                postid: postid,
                owner: owner,
                commentid: commentid,
                username: user, 
                userImg: userImg,
                userlvl: userLevel,
                comment: userComment, 
                upvote: 0,
                upvoters: [],
                downvote: 0,
                downvoters: []
            }
            arr.push(commentid);
            
            $('#userComment').attr('placeholder', 'Write a comment...');
            $('#userComment').css('border', '2px solid #EFEFEF');
            //$.get('/addComment', {postid: postid, owner: owner, comments: arr}, function(){});
            $.get('/addComment', {comments: commentInfo, commentids: arr}, function(){});
            
            $('#space').append('<hr style="border-top: 1px solid black; border-bottom: 1px solid grey"> <div class="commentsSpace"><input type="hidden" id="commentid" name="commentid" value="'+commentid+'"> <img src="/avatars/'+ userImg + '" alt="'+ user +'"> <div class="commentsInfo"> <div class="userInfo"> <p class="username">'+ user +'</p><p class="lvl">LV. '+ userLevel+'</p> </div> <div class="commentTxt"> <p>' + userComment +'</p> </div> </div> <div class="like" id="commentLike"> <button class="upvoteBtnC"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-square" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm8.5 9.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"/> </svg> Upvote</button> <p class="upvoteC">0</p> <input type="hidden" id="upvotersC" name="upvotersC" value="[]"> <button class="downvoteBtnC"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-square" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm8.5 2.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"/> </svg> Downvote</button> <p class="downvoteC">0</p> <input type="hidden" id="downvotersC" name="downvotersC" value="[]"> </div> </div>')
            
            $('#cmt').val(arr);
            $('#userComment').val(''); 
        }
        
        else{
            $('#userComment').attr('placeholder', 'Textfield is empty. Cannot post comment');
            $('#userComment').css('border', '2px solid red');
        }
    }),

    $('#space').on('click', '.upvoteBtnC', function(){
        var postid = $('#postid').val();
        var owner = $('#owner').val();
        var cmtid = $(this).closest('div').parent().children().eq(0).val();
        
        var exp = $('#exp').val();

        var upvote = $(this).closest('div').children().eq(1).text();
        var upvoters = $(this).closest('div').children().eq(2).val(); 
        var arr = []; 
        if (upvoters != '')
            arr = upvoters.split(',');

        var downvote = $(this).closest('div').children().eq(4).text();
        var downvoters = $(this).closest('div').children().eq(5).val();
        var arrD = []; 
        if (downvoters != '')
            arrD = downvoters.split(',');

        if (arr.includes(username)){
            upvote = parseInt(upvote) - 1;
            arr = $.grep(arr, function(val){
                return val != username;
            });

            $(this).css('background-color', '');
        }

        else{
            upvote = parseInt(upvote) + 1;
            arr.push(username);
            $(this).css('background-color', 'lightblue');

            if (arrD.includes(username)){
                downvote = parseInt(downvote) - 1;
                arrD = $.grep(arrD, function(val){
                    return val != username;
                });
                
                $(this).closest('div').children().eq(3).css('background-color', '');
            }
            
            if(username === owner)
                exp = parseInt(exp) + 1;
        
        }           
        
        $.get('/updateVoteC', {postid: postid, owner: owner, commentid: cmtid, username: username, upvote: upvote, upvoters: arr, downvote: downvote, downvoters: arrD, exp: exp}, function(){})

        $(this).closest('div').children().eq(1).text(upvote);
        $(this).closest('div').children().eq(2).val(arr);

        $(this).closest('div').children().eq(4).text(downvote);
        $(this).closest('div').children().eq(5).val(arrD);
    }),

    $('#space').on('click', '.downvoteBtnC', function(){
        var postid = $('#postid').val();
        var owner = $('#owner').val();
        var cmtid = $(this).closest('div').parent().children().eq(0).val();

        var exp = $('#exp').val();

        var upvote = $(this).closest('div').children().eq(1).text();
        var upvoters = $(this).closest('div').children().eq(2).val();
        var arr = []; 
        if (upvoters != '')
            arr = upvoters.split(',');

        var downvote = $(this).closest('div').children().eq(4).text();
        var downvoters = $(this).closest('div').children().eq(5).val();
        var arrD = []; 
        if (downvoters != '')
            arrD = downvoters.split(',');

        if (arrD.includes(username)){
            downvote = parseInt(downvote) - 1;
            arrD = $.grep(arrD, function(val){
                return val != username;
            });
            $(this).css('background-color', '');
        }

        else{
            downvote = parseInt(downvote) + 1;
            arrD.push(username);
            
            $(this).css('background-color', 'lightblue');

            if (arr.includes(username)){
                upvote = parseInt(upvote) - 1;
                arr = $.grep(arr, function(val){
                    return val != username;
                });
                $(this).closest('div').children().eq(0).css('background-color', '');
            }
        }

        $.get('/updateVoteC', {postid: postid, owner: owner, commentid: cmtid, username: username, upvote: upvote, upvoters: arr, downvote: downvote, downvoters: arrD, exp: exp}, function(){})

        $(this).closest('div').children().eq(1).text(upvote);
        $(this).closest('div').children().eq(2).val(arr);

        $(this).closest('div').children().eq(4).text(downvote);
        $(this).closest('div').children().eq(5).val(arrD);
    })
});
