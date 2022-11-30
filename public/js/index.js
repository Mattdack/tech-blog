const loginBtn = document.querySelector(`#loginBtn`)
if(loginBtn){
    loginBtn.addEventListener("click",e => {
        e.preventDefault();
        location.assign(`/login`);
    });
}

const signupBtn = document.querySelector(`#signupBtn`)
if(signupBtn) {
    signupBtn.addEventListener("click", e => {
        e.preventDefault();
        location.assign(`/signup`);
    })
}

const logoutBtn = document.querySelector("#logoutBtn");
if(logoutBtn) {
    logoutBtn.addEventListener("click",e=>{
        console.log("I am clicking this")
        fetch("/api/users/logout",{
            method:"POST"
        }).then(res=>{
            location.assign(`/`)
        })
    });
}