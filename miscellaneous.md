Oluwanifemi : `All dead code come here`

<!-- <li>
                <span class="content">
                    
                    <p class="item">
                        Feed the Dog
                    </p>
                    <button>🗑</button>
                </span>
                
           </li>

           <li>
            <span class="content">
                
                <p class="item">
                    Feed the Dog Lorem ipsum dolor sit amet consectetur adipisicing elit. In similique aliquid adipisci iusto aliquam, perferendis corrupti ullam quo laborum ratione repellat, impedit, omnis veritatis harum ad ab saepe sed explicabo?20
                </p>
                <button>🗑</button>
            </span>
            
            </li> -->

            /*******Finally some local storage stuff */

// localStorage.setItem("myNames", JSON.stringify(['Nifemi','Adeola','Akeju']))

// const theNames = JSON.parse(localStorage.getItem("myNames"))

// console.log(theNames);
// localStorage.setItem('arrayName', JSON.stringify([1,2,3]))

function signUpFunction(){
   
    const loadTime = 3000

    const userName = nameInput.value

    nameInput.setAttribute('disabled','')

    showLoader()

    function showLoader(){
        const loader = document.querySelector('.load')

        loader.style.display = "block"

        setTimeout(function(){
            loader.style.display = "none"
        }, loadTime)


    }

    setTimeout(function(){
        signUpPage.style.display = "none"
    }, loadTime)
    
    
    return userName
}

function addUserNameToLocalStorage(){
    const userName = signUpFunction()

    console.log(userName);

    localStorage.setItem('username', JSON.stringify(userName))

    
}



function windowLoadFunctions(){
    if(localStorage.getItem('username')){
        const username = JSON.parse(localStorage.getItem('username'))

        userNameDisplay.textContent = `Hello, ${username}`
        signUpPage.style.display = 'none'
    }
    
    
    
}


function whenToShowSignUp(){
    
}


function signUpFunctions(e){
    e.preventDefault()

    signUpFunction()
   addUserNameToLocalStorage()
}


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

function weekly(){
    let itemHours = new Date().getHours()
    let itemMinutes = new Date().getMinutes()
    itemMinutes<10? itemMinutes = '0'+itemMinutes: itemMinutes
    const itemTime = `${itemHours}:${itemMinutes} `
    let itemID = new Date().getMilliseconds().toString()
    let inputItem = input.value
    // console.log(itemTime);

    //If the Input is actually an Input
    if (inputItem !== '') {
        let newItem = document.createElement('li')

        

        newItem.innerHTML = `<span class="content">
                        
        <p class="item" id='${itemID}'>
           ${inputItem}
           <br/>
           ${itemTime}

        </p>
        <button class='done-btn action-btn'>✔</button>
        <button class='delete-btn action-btn'>❌</button>
        <button class='edit-btn action-btn'>${itemTime}</button>
        
        </span>`

        

        addToLocalStorage(itemID, inputItem, itemTime, 'weekly')


        weeklyCategoryList.appendChild(newItem)

        
       

        let deleteItem = newItem.querySelector('.delete-btn')


        deleteItem.addEventListener('click', deleteItemFromList)

        let checkItem = newItem.querySelector('.action-btn')

        checkItem.addEventListener('click', checkItemFromList)

        let editBtn = newItem.querySelector('.edit-btn')
   
        


    }

    function deleteItemFromList(btn){
        let immediateParent = btn.currentTarget.parentElement.parentElement

            weeklyCategoryList.removeChild(immediateParent)

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


categoryButtons.forEach((button)=>{
    button.addEventListener('click',(btn)=>{
        categoryButtons.forEach((btn)=>{
            btn.classList.remove('active')
        })

        let currentBtn = btn.target

        currentBtn.classList.add('active')
       console.log( currentBtn.dataset.id);

       if(currentBtn.dataset.id === dailyCategoryList.className){

        dailyCategoryList.style.display = 'flex'
        weeklyCategoryList.style.display = 'none'
        monthlyCategoryList.style.display = 'none'
        dailyStatus = true
        monthlyStatus = false
        weeklyStatus = false;
        
       }
       else if(currentBtn.dataset.id === weeklyCategoryList.className){

        dailyCategoryList.style.display = 'none'
        weeklyCategoryList.style.display = 'flex'
        monthlyCategoryList.style.display = 'none'
        console.log('B');
        weeklyStatus = true;
        monthlyStatus = false
        dailyStatus = false
       

       }
       else if(currentBtn.dataset.id === monthlyCategoryList.className){

        dailyCategoryList.style.display = 'none'
        weeklyCategoryList.style.display = 'none'
        monthlyCategoryList.style.display = 'flex'
        console.log('C');
        monthlyStatus = true
        weeklyStatus = false;
        dailyStatus = false
        // monthly()
       }


       

    })


})

function renderListItems(category,nameOfCategoryList){
    let taskList = getLocalStorage(category)

     renderedList = taskList.map((eachItem)=>{

        return `<li><span class="content">
       
        <p class="item" id='${eachItem.id}'>
        
           ${eachItem.item}
           <br/>
           
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

    


    nameOfCategoryList.innerHTML = renderedList.join('')

    const deleteBtn = document.querySelectorAll('.delete-btn')

    deleteBtn.forEach((button)=>{
        button.addEventListener('click',(btn)=>{
            
            let immediateParent = btn.currentTarget.parentElement.parentElement

            nameOfCategoryList.removeChild(immediateParent)
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

function addToLocalStorage(id, item, time, category){
    const eachItem = {id, item, time}

    let theArray = localStorage.getItem(`${category}`)?JSON.parse(localStorage.getItem(`${category}`)): []

    theArray.push(eachItem)

    localStorage.setItem(`${category}`, JSON.stringify(theArray))
}


function removeFromLocalStorage(id, category){
    let listItems = getLocalStorage()

    listItems = listItems.filter((item)=>{
        if(item.id!==id){
            return item
        }
    })

    localStorage.setItem(`${category}`, JSON.stringify(listItems))
}

const weeklyCategoryList = document.querySelector('.weekly')
const monthlyCategoryList = document.querySelector('.monthly')

let monthlyStatus;
let dailyStatus;
let weeklyStatus;

categoryButtons.forEach((button)=>{
    button.addEventListener('click',(btn)=>{
        categoryButtons.forEach((btn)=>{
            btn.classList.remove('active')
        })

        let currentBtn = btn.target

        currentBtn.classList.add('active')
       console.log( currentBtn.dataset.id);

       if(currentBtn.dataset.id === dailyCategoryList.className){

        dailyCategoryList.style.display = 'flex'
        weeklyCategoryList.style.display = 'none'
        monthlyCategoryList.style.display = 'none'
        dailyStatus = true
        monthlyStatus = false
        weeklyStatus = false;
        
       }
       else if(currentBtn.dataset.id === weeklyCategoryList.className){

        dailyCategoryList.style.display = 'none'
        weeklyCategoryList.style.display = 'flex'
        monthlyCategoryList.style.display = 'none'
        console.log('B');
        weeklyStatus = true;
        monthlyStatus = false
        dailyStatus = false
       

       }
       else if(currentBtn.dataset.id === monthlyCategoryList.className){

        dailyCategoryList.style.display = 'none'
        weeklyCategoryList.style.display = 'none'
        monthlyCategoryList.style.display = 'flex'
        console.log('C');
        monthlyStatus = true
        weeklyStatus = false;
        dailyStatus = false
        // monthly()
       }


       

    })


})

function weekly(){
    let itemHours = new Date().getHours()
    let itemMinutes = new Date().getMinutes()
    itemMinutes<10? itemMinutes = '0'+itemMinutes: itemMinutes
    const itemTime = `${itemHours}:${itemMinutes} `
    let itemID = new Date().getMilliseconds().toString()
    let inputItem = input.value
    // console.log(itemTime);

    //If the Input is actually an Input
    if (inputItem !== '') {
        let newItem = document.createElement('li')

        

        newItem.innerHTML = `<span class="content">
                        
        <p class="item" id='${itemID}'>
           ${inputItem}
           <br/>
           ${itemTime}

        </p>
        <button class='done-btn action-btn'>✔</button>
        <button class='delete-btn action-btn'>❌</button>
        <button class='edit-btn action-btn'>${itemTime}</button>
        
        </span>`

        

        addToLocalStorage(itemID, inputItem, itemTime, 'weekly')


        weeklyCategoryList.appendChild(newItem)

        
       

        let deleteItem = newItem.querySelector('.delete-btn')


        deleteItem.addEventListener('click', deleteItemFromList)

        let checkItem = newItem.querySelector('.action-btn')

        checkItem.addEventListener('click', checkItemFromList)

        let editBtn = newItem.querySelector('.edit-btn')
   
        


    }

    function deleteItemFromList(btn){
        let immediateParent = btn.currentTarget.parentElement.parentElement

            weeklyCategoryList.removeChild(immediateParent)

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
