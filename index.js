//*******Select items*********/
const inputStatus = document.querySelector('.status')
const form = document.querySelector('.input-form')
const input = document.querySelector('.task-input')
const dailyCategoryList = document.querySelector('.daily')
const weeklyCategoryList = document.querySelector('.weekly')
const monthlyCategoryList = document.querySelector('.monthly')
// const lightdarkbtn = document.querySelector('.theme-btn')
const root = document.querySelector(':root')
const categoryButtons = document.querySelectorAll('.category-btn')

const clearBtn = document.querySelector('.clear-all')

let monthlyStatus;
let dailyStatus;
let weeklyStatus;




// *****************Event Listeners********************

form.addEventListener('submit', formFunction)



window.addEventListener('load',
    displayNameDate
)

// lightdarkbtn.addEventListener('click', lightdarkmode)

window.addEventListener('DOMContentLoaded', windowLoadFunctions)


// *******************Functions***********************



function formFunction(e) {
    
    e.preventDefault()
    daily()
   clearAllFunction()  
   input.value = ""
   showClearBtn()



}

function windowLoadFunctions(){
    userNameFunction()
    renderListItems()
    
    showClearBtn()
}

function showClearBtn(){
    let Lists = document.querySelectorAll('li')

    if(Lists.length>0){
        clearBtn.style.display = 'block'
    }
    if(Lists.length<1){
        clearBtn.style.display = 'none'
    }
   }



function daily(){

    let itemHours = new Date().getHours()
    let itemMinutes = new Date().getMinutes()
    itemMinutes<10? itemMinutes = '0'+itemMinutes: itemMinutes
    const itemTime = `${itemHours}:${itemMinutes} `
    let itemID = new Date().getMilliseconds().toString()
    let inputItem = input.value
    console.log(itemTime);

    //If the Input is actually an Input
    if (inputItem !== '') {
        let newItem = document.createElement('li')

        

        newItem.innerHTML = `<span class="content">
                        
        <p class="item" id='${itemID}'>
           ${inputItem}
           <br/>
          

        </p>
        <button class='done-btn action-btn'>✔</button>
        <button class='delete-btn action-btn'>❌</button>
        <button class='edit-btn action-btn'>${itemTime}</button>
        
        </span>`

        

        addToLocalStorage(itemID, inputItem, itemTime, 'daily')


        dailyCategoryList.appendChild(newItem)

        let deleteItem = newItem.querySelector('.delete-btn')


        deleteItem.addEventListener('click', deleteItemFromList)

        let checkItem = newItem.querySelector('.action-btn')

        checkItem.addEventListener('click', checkItemFromList)

        let editBtn = newItem.querySelector('.edit-btn')
   
        


    }

    function deleteItemFromList(btn){
        let immediateParent = btn.currentTarget.parentElement.parentElement

            dailyCategoryList.removeChild(immediateParent)

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

function getLocalStorage(category){
    return localStorage.getItem(`TaskList`)?JSON.parse(localStorage.getItem(`TaskList`)): []
}




function addToLocalStorage(id, item, time){
    const eachItem = {id, item, time}

    let theArray = localStorage.getItem(`TaskList`)?JSON.parse(localStorage.getItem(`TaskList`)): []

    theArray.push(eachItem)

    localStorage.setItem(`TaskList`, JSON.stringify(theArray))
}


function removeFromLocalStorage(id){
    let listItems = getLocalStorage()

    listItems = listItems.filter((item)=>{
        if(item.id!==id){
            return item
        }
    })

    localStorage.setItem(`TaskList`, JSON.stringify(listItems))
}





/**This is for the Sign Up page: the user enters his name and is required to do so only once***** */







function clearAllFunction(){
    const Lists = document.querySelectorAll('li')
    

    let taskList = getLocalStorage()

    clearBtn.addEventListener('click', ()=>{
        localStorage.removeItem('TaskList')

    Lists.forEach((item)=>{
        item.remove(item)

    })

    showClearBtn()

    })
    
}



function renderListItems(){
    let taskList = getLocalStorage('TaskList')

     renderedList = taskList.map((eachItem)=>{

        return `<li><span class="content">
       
        <p class="item" id='${eachItem.id}'>
        
           ${eachItem.item}
           
           
        </p>
        <button class='done-btn action-btn'>✔</button>
        <button class='delete-btn action-btn'>❌</button>
        <button class='time-btn action-btn'>${eachItem.time}</button>
        </span></li>`


    })

    let taskListIds = taskList.map((eachItem)=>{

        return eachItem.id
        /*I figured this was not important because my remove from local storage function takes in Single strings and this gives me an array so... this just gives a list of all ID's in the local storage as an array*/

    })

    


    dailyCategoryList.innerHTML = renderedList.join('')

    const deleteBtn = document.querySelectorAll('.delete-btn')

    deleteBtn.forEach((button)=>{
        button.addEventListener('click',(btn)=>{
            
            let immediateParent = btn.currentTarget.parentElement.parentElement

            dailyCategoryList.removeChild(immediateParent)
            // console.log(typeof immediateParent.querySelector('p').id);

            currentID = immediateParent.querySelector('p').id
            console.log(currentID);
            let message = "Item removed successfully"

            inputStatus.textContent = message
            inputStatus.style.visibility = 'visible'
            inputStatus.style.color = 'red'

            setTimeout(() => {
                inputStatus.textContent = message
                inputStatus.style.visibility = 'hidden'

            }, 1000);

        removeFromLocalStorage(currentID)
        
        })


    })

    const checkBtn = document.querySelectorAll('.done-btn')

    checkBtn.forEach((button)=>{
        button.addEventListener('click',(btn)=>{
            let immediateParent = btn.currentTarget.parentElement.querySelector('p')

            immediateParent.style.textDecoration = `line-through`
        })
    })

    
    
    

    clearAllFunction()



}








