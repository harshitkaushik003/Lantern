{
    let createComment = ()=>{
        let newCommentForm = $("#new-comment-form");
        newCommentForm.submit(function (e) { 
            e.preventDefault();
            $.ajax(
                {
                    method: 'post',
                    url: '/comments/create',
                    data: newCommentForm.serialize(),
                    success: function(response){
                        console.log(response);
                        let newComment = addCommentToDom(response.data.comment);
                        $(".comment-container-dom").prepend(newComment);
                        // deleteComment($('.delete-comment-button'));
                    },error: function(err){
                        console.log(`Error while creating comment ${err.responseText}`);
                    }
                }
            )
        });
    }

    let addCommentToDom = function(comments){
        return $(`
        <div class="comment-box">
            <div class="delete-icon-comment">
                <a href="/comments/delete/${comments.id}">
                    <i class="fa-solid fa-trash-can"></i>                                            
                </a> 
            </div> 
            <p class="comment-name">${comments.user.name}</p>
            <p class="comment-content">${comments.content}</p>
        </div>
        `)
    }

    let deleteComment = (deleteLink)=>{
        $(deleteLink).click(function(e){
            e.preventDefault();
            $.ajax(
                {
                    type: 'get',
                    url: $(deleteLink).prop('href'),
                    success: function(response){
                        $(`#comment-${response.data.comment_id}`).remove();
                    },error: function(err){
                        console.log(`Error while deleting comment->${err.responseText}`);
                    }
                }
            )
        })
    }
    for(let i of $('.delete-comment-button')){
        console.log(i);
        deleteComment(i);
    }
    createComment();
}