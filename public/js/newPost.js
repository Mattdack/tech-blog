const createPostBtn = document.querySelector(`#createPost`);

if (createPostBtn) {
  createPostBtn
    .addEventListener("click", (event) => {
      event.preventDefault();
      const post = {
        title: document.querySelector(`#title`).value,
        content: document.querySelector(`#content`).value,
      };

      fetch(`/api/posts/`, {
        method: "POST",
        body: JSON.stringify(post),
        headers: {
          "Content-Type": "application/json",
        },
      });
    })
    .then(res => {
      if (res.ok) {
        location.assign(`/dashboard`);
      } else {
        alert(`error with making new post.`);
      }
    });
}
