{
    console.log("Hello World!!!");
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        console.log(newPostForm);
        newPostForm.submit(function (e) { 
            e.preventDefault();
            $.ajax({
                type: "post",
                url: "/posts/create",
                data: newPostForm.serialize(),
                success: function (response) {
                    console.log(response);
                },
                error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    createPost();   
}