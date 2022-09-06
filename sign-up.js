const signUpPage = document.querySelector('.sign-up')
const signUpForm = document.querySelector('.sign-up-form')
const nameInput = document.querySelector('.name-input')
const userNameDisplay = document.querySelector('.name').querySelector('h2')

function userNameFunction(){
    if(!localStorage.getItem('username')){
        
        signUpPage.style.display = 'flex'
        signUpForm.addEventListener('submit',addUsernameLocalStorage)
        
    }
    else if(localStorage.getItem('username')){
        const username = JSON.parse(localStorage.getItem('username'))
        userNameDisplay.textContent = `Hello, ${username}`
    }
}



function addUsernameLocalStorage(e){
    e.preventDefault()
    const username = nameInput.value
    nameInput.setAttribute('disabled','')

    localStorage.setItem('username',JSON.stringify(username))
    userNameDisplay.textContent = `Hello, ${username}`
    loader()
    
    function loader(){
        
        const loader = document.querySelector('.load')

        loader.style.display = "block"

        setTimeout(function(){
            loader.style.display = "none"
        }, 4000)
    }

    setTimeout(()=>{
        signUpPage.style.display = 'none'
    }, 4000)

}

window.addEventListener('DOMContentLoaded', windowLoadFunctions)

function windowLoadFunctions(){
    userNameFunction()
    
}