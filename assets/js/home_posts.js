{
    // let createPost = function(){
    //     let newPostForm = $('#new-post-form');
    //     newPostForm.submit((e)=>{
    //         e.preventDefault();
    //         $.ajax({
    //             type: "post",
    //             url: "/posts/create",
    //             data:newPostForm.serialize(),
    //             success: function (response) {
    //                 console.log(response);
    //                 let newPost = newPostDom(response.data.post);
    //                 $(".main-body").prepend(newPost);
    //                 deletePost($('.delete-post-button', newPost));
    //             }, error: (error)=>{
    //                 console.log(`Error in creating a Post -> ${error.responseText}`);
    //             }
    //         });
    //     })
    // }
    // let newPostDom = function(posts){
    //     return $(`
    //     <div id='post-${posts._id}' class="post-display">
    //         <div class="delete-icon delete-post-button">
    //             <a href="/posts/delete/${posts.id}">
    //                 <i class="fa-solid fa-trash-can"></i>
    //             </a>
    //         </div>
    //         <div class="user-name">
    //             <p>
    //                 ${posts.user.name}
    //             </p>
                
                
    //         </div>
    //         <div class="post-content">
    //             <p>
    //                 ${posts.content}
    //             </p>
    //         </div>
    //         <div class="interactions">
    //             <i class="fa-regular fa-heart"></i>
    //         </div>
    //         <div class="comment-section">
    //             <form action="/comments/create" method="POST">
    //                 <input type="text" class="comment-content" name="content" placeholder="add a comment" required>
    //                 <input type="hidden" name="post" value="<%= posts._id %>">
    //                 <input type="submit" value="Add">
    //             </form>
    //             <div class="comment-list">
    //                 <div id="post-comments-${posts._id}">
                        
    //                 </div>
    //             </div>
    //         </div>
    //     </div>    

    //     `)
    // }

    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type: "get",
                url: $(deleteLink).prop('href'),
                success: function (response) {
                    console.log(response);
                    $(`#post-${response.data.post_id}`).remove();
                },error: (error)=>{
                    console.log(`error while deleting a post ${error.responseText}`);
                }
            });
        })
    }
    // console.log($('.delete-post-button'));
    for(let i of $('.delete-post-button')){
        console.log(i);
        deletePost(i);
    }
    
    // createPost();
}