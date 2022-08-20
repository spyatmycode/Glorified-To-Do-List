//*******Select items*********/
const inputStatus = document.querySelector('.status')
const form = document.querySelector('.input-form')
const input = document.querySelector('.task-input')
const listParent = document.querySelector('ul')
const lightdarkbtn = document.querySelector('.light-dark')
const root = document.querySelector(':root')

const signUpPage = document.querySelector('.sign-up')
const signUpForm = document.querySelector('.sign-up-form')
const nameInput = document.querySelector('.name-input')
const userNameDisplay = document.querySelector('.name').querySelector('h2')
const clearBtn = document.querySelector('.clear-all')




// *****************Event Listeners********************

form.addEventListener('submit', formFunction)

window.addEventListener('load',
    displayNameDate
)

lightdarkbtn.addEventListener('click', lightdarkmode)

window.addEventListener('DOMContentLoaded', windowLoadFunctions)


// *******************Functions***********************



function formFunction(e) {

    e.preventDefault()
    getInputFunction()
    clearAllFunction()    

    input.value = ""


}

function windowLoadFunctions(){
    userNameFunction()
    renderListItems()
}


/*function getInput(){

******This was the first Function I wrote to get input from the user until I decided to write a more complex below*****  

    console.log(input.value);
    let inputValue = input.value
   
listParent.innerHTML += ` <li>
<span class="content">
    
    <p class="item">
        ${inputValue}
    </p>
    <button>🗑</button>
</span>

</li>`
viewFullContent()

}
*/

function getInputFunction() {

    

    let itemID = new Date().getMilliseconds().toString()
    let inputItem = input.value

    //If the Input is actually an Input
    if (inputItem !== '') {
        let newStuff = document.createElement('li')

        newStuff.innerHTML = `<span class="content">
                        
        <p class="item" id='${itemID}'>
           ${inputItem}
        </p>
        <button class='done-btn action-btn'>✔</button>
        <button class='delete-btn action-btn'>❌</button>
        </span>`

        

        addToLocalStorage(itemID, inputItem)

        listParent.appendChild(newStuff)

        
        viewFullContent()

        let deleteItem = newStuff.querySelector('.delete-btn')


        deleteItem.addEventListener('click', deleteItemFromList)

        let checkItem = newStuff.querySelector('.action-btn')

        checkItem.addEventListener('click', checkItemFromList)

        


    }

    function deleteItemFromList(btn){
        let immediateParent = btn.currentTarget.parentElement.parentElement

            listParent.removeChild(immediateParent)

            let message = "Item removed successfully"

            inputStatus.textContent = message
            inputStatus.style.visibility = 'visible'

            setTimeout(() => {
                inputStatus.textContent = message
                inputStatus.style.visibility = 'hidden'

            }, 1000);

        removeFromLocalStorage(itemID)
        clearAllFunction()    
       
    }

    function checkItemFromList(btn){
        let immediateParent = btn.currentTarget.parentElement.querySelector('p')

            immediateParent.style.textDecoration = `line-through`

    }
    
    




    //=====================================================
    //DO NOT TAMPER: THE BELOW IS A FUNCTION IN THIS FUNCTION LOL//

    //******Calling the input validation functioN from below****** */

    validateStatus()

}

function validateStatus() {

    let message;
    if (input.value !== '') {

        message = "Item added successfully"
        inputStatus.style.visibility = 'visible'
        inputStatus.textContent = message
        inputStatus.style.color = 'green'
    }
    else {
        message = "Invalid input"
        inputStatus.style.visibility = 'visible'
        inputStatus.textContent = message
        inputStatus.style.color = 'red'
    }

    setTimeout(() => {
        if (input.value !== '') {

            message = "Item added successfully"
            inputStatus.style.visibility = 'hidden'
            inputStatus.textContent = message
            inputStatus.style.color = 'green'
        }
        else {
            message = "Invalid input"
            inputStatus.style.visibility = 'hidden'
            inputStatus.textContent = message
            inputStatus.style.color = 'red'
        }
    }, 1000);

}

/** View the full content of an Item when you click in case its too long */

function viewFullContent() {
    const listItems = document.querySelectorAll('p')

   

    listItems.forEach((li) => {
        li.addEventListener('click', (p) => {

            
            p.target.classList.toggle('active')

            /****Turns that I don't even need this mehn..I just the p:hover to show full content...No be everything be JS function */


            // if (p.target.classList.contains('active')) {

            //     p.target.classList.remove('active')

            // } else {
            //     p.target.classList.add('active')
            // }

        })
    })

}





function displayNameDate() {

    const dateDisplay = document.querySelector('.date')

    const listOfMonths = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'

    ]
    let todayDate = new Date()

    let day = todayDate.getDate().toString()

    let year = todayDate.getFullYear()

    let month = listOfMonths[todayDate.getMonth()]

    dateDisplay.textContent = `${day}th ${month}, ${year}`


}


/************Light Mode and Dark Mode Function***** */

function lightdarkmode() {

    if (root.style.colorScheme === 'light') {
        root.style.colorScheme = 'dark'
    }
    else {
        root.style.colorScheme = 'light'
    }

}

function getLocalStorage(){
    return localStorage.getItem('taskList')?JSON.parse(localStorage.getItem('taskList')): []
}




function addToLocalStorage(id, item){
    const eachItem = {id, item}

    let theArray = localStorage.getItem('taskList')?JSON.parse(localStorage.getItem('taskList')): []

    theArray.push(eachItem)

    localStorage.setItem('taskList', JSON.stringify(theArray))
}


function removeFromLocalStorage(id){
    let listItems = getLocalStorage()

    listItems = listItems.filter((item)=>{
        if(item.id!==id){
            return item
        }
    })

    localStorage.setItem('taskList', JSON.stringify(listItems))
}





/**This is for the Sign Up page: the user enters his name and is required to do so only once***** */




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


function clearAllFunction(){

    let Lists = document.querySelectorAll('li')

    if(Lists.length>0){
        clearBtn.style.display = 'block'
    }
    if(Lists.length<1){
        clearBtn.style.display = 'none'
    }

    let taskList = getLocalStorage()

    clearBtn.addEventListener('click', ()=>{
        localStorage.removeItem('taskList')

    Lists.forEach((item)=>{
        item.remove(item)
    })

    })
}

function renderListItems(){
    let taskList = getLocalStorage()

     taskList = taskList.map((eachItem)=>{

        return `<li><span class="content">
                        
        <p class="item" id='${eachItem.id}'>
           ${eachItem.item}
        </p>
        <button class='done-btn action-btn'>✔</button>
        <button class='delete-btn action-btn'>❌</button>
        </span></li>`


    })

    let taskListId = taskList.map((eachItem)=>{

        return eachItem.id


    })


    listParent.innerHTML = taskList.join('')

    const deleteBtn = document.querySelectorAll('.delete-btn')

    deleteBtn.forEach((button)=>{
        button.addEventListener('click',(btn)=>{
            
            let immediateParent = btn.currentTarget.parentElement.parentElement

            listParent.removeChild(immediateParent)

            let message = "Item removed successfully"

            inputStatus.textContent = message
            inputStatus.style.visibility = 'visible'

            setTimeout(() => {
                inputStatus.textContent = message
                inputStatus.style.visibility = 'hidden'

            }, 1000);

        removeFromLocalStorage(taskListId)
        clearAllFunction()

        })


    })

    


}

/**Last seen Line 426 on August 19th 9:35pm : you are trying to fix the renderList function buttons bug */


