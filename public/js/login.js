console.log("Login JS Linked");

const loginForm = document.querySelector('#loginForm')
loginForm.addEventListener('submit',event => {
    event.preventDefault();
    const userLogin = {
        username:document.querySelector('#username').value,
        password:document.querySelector('#password').value
    }
    console.log("Making Fetch Req")
    fetch("/api/users/login",{
        method:"POST",
        body:JSON.stringify(userLogin),
        headers:{ 
            'Content-Type': 'application/json' 
        }
    }).then(res=>{
        if(res.ok){
            console.log("Fetch req made")
            location.assign('/')
        } else {
            alert('incorrect login')
        }
    })
})