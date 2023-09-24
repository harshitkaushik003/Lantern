{
    let toggleLike = function(likeLink){
        likeLink.click(function(e){
            e.preventDefault();
            $.ajax({
                type: "get",
                url: likeLink.attr('href'),
                success: function (response) {
                    console.log(response);
                    let likeCount = parseInt($(`#like-number-${response.data.post_id}`).html());
                    console.log(likeCount)
                    if(response.data.deleted){
                        $(`#like-heart-${response.data.post_id}`).css('color', 'white');
                        likeCount--;
                    }else{
                        $(`#like-heart-${response.data.post_id}`).css('color', 'red');
                        likeCount++;
                    }
                    $(`#like-number-${response.data.post_id}`).html(likeCount);
                },error: function(error){
                    console.log("Error");
                }
            });
        })
    }
    let likeButtons = $('.like-button');
    for (let i = 0; i < likeButtons.length; i++) {
        toggleLike($(likeButtons[i]));
    }
    
    
}