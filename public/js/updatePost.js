const updatePostBtn = document.querySelector(`#updatePost`);

updatePostBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const postId = parseInt(
    document.querySelector(`#title`).getAttribute(`data-postId`)
  );
  const post = {
    title: document.querySelector(`#title`).value,
    content: document.querySelector(`#content`).value,
  };

  fetch(`/api/posts/${postId}`, {
    method: "PUT",
    body: JSON.stringify(post),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      location.assign(`/dashboard`);
    } else {
      alert(`error with making new post.`);
    }
  });
});

const deletePostBtn = document.querySelector(`#deletePost`);

deletePostBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const postId = parseInt(
    document.querySelector(`#title`).getAttribute(`data-postId`)
  );

  fetch(`/api/posts/${postId}`, {
    method:"DELETE",
    body: JSON.stringify({}),
    headers:{
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if(res.ok) {
      location.assign(`/dashboard`);
    } else {
      alert(`Something wrong with deleting that post!`)
    }
  })
})