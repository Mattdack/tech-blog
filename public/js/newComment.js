const createCommentBtn = document.querySelector("#createComment");

createCommentBtn.addEventListener("click", event => {
    event.preventDefault();
    const postNumber = parseInt(document.querySelector(`#content`).getAttribute(`data-postId`));
    const userNumber = parseInt(document.querySelector(`#content`).getAttribute(`data-userId`))
    const commentObj = {
        content: document.querySelector(`#content`).value,
        userId: userNumber,
        postId: postNumber,
    }
    console.log(commentObj);
    fetch(`/api/commments/`, {
        method: "POST",
        body: JSON.stringify(commentObj),
        headers: {
            "Content-Type":"application/json",
        }
    }).then((res)=>{
        if(res.ok){
            // location.reload();
            console.log("New comment made.");
        } else {
            alert("Issue with leaving comment.");
        }
    });

})