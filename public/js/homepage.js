const allPosts = document.querySelectorAll(`.post`);

for (let i = 0; i < allPosts.length; i++) {
    allPosts[i].addEventListener('click', event => {
        // event.preventDefault();
        const postId = event.target.parentNode.getAttribute('id');
        location.assign(`/${postId}`);
    })
    
}