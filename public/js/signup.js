const createAccountForm = document.querySelector('#createAccountForm')
createAccountForm.addEventListener('submit',event => {
    event.preventDefault();
    const newUser = {
        username:document.querySelector('#newUsername').value,
        password:document.querySelector('#newPassword').value
    }
    fetch("/api/users/",{
        method:"POST",
        body:JSON.stringify(newUser),
        headers:{ 
            'Content-Type': 'application/json' 
        }
    }).then(res=>{
        if(res.ok){
            location.assign('/')
        } else {
            alert('Issue with making your account')
        }
    })
})