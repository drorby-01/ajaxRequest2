


// mapping object
// key present the mapped object
// value present the server response object path 


const mapping = {
    name: { fn: getName, isVisible: true },
    city: { path: "location.city", isVisible: true },
    address: { path: "location.street.name", isVisible: true },
    src: { path: "picture.large", isVisible: true },

}

const mappingWithFunction = {
    name: { fn: getName, isVisible: true },
    name: { fn: getCity, isVisible: true },
}

function getName (user) {
    return `${user.name.first} ${user.name.last}`
}

function getCity (user) {
    return `${user.name.first} ${user.name.last}`
}


async function init (numberOfresult) {
    try {
        if(isNaN(Number(numberOfresult))) return;
        const response = await getUsersFetch({ url: `https://randomuser.me/api/?results=${numberOfresult}`  })
        const { results } = response
        console.log(results) // DRAW HERE
        draw(results)
    } catch (err) {
        console.log(err)
        alert(`message: ${err.statusText} , status: ${err.status}`)
    }
}

function draw (arrOfObjects) {



    const mappedUsers = arrOfObjects.map((user) => {
        return getMappedUser(user)
    })
    
    console.log(mappedUsers)
    mappedUsers.forEach((element,index) => {
        $("#container-data").append(drawInCard(element))
    });
    //DRAW
}

function drawInCard(element){

return $(`<div class="card m-4" style="width: 18rem;">
<img src="${element.src}" class="card-img-top" alt="">
<div class="card-body">
  <h5 class="card-title"> User name: ${element.name}</h5>
  <p class="card-text">City: ${element.city}</p>
  <p class="card-text">Address: ${element.address}</p>
</div>
</div>`)
}

function getMappedUser (user) {
    const keyValueMappingArray = Object.entries(mapping)
    return keyValueMappingArray.reduce((mappedUser, KEYVALUEPAIR_ARRAY,) => {
        const [ key, settingObj ] = KEYVALUEPAIR_ARRAY
        const { path } = settingObj
        const isFunction = typeof settingObj[ "fn" ] === 'function'
        return { ...mappedUser, [ key ]: isFunction ? settingObj[ "fn" ](user) : getValueFromPath(path, user) }
    }, {})
}



function getValueFromPath (path, user) {
    if (typeof path !== 'string') return
    const splittedPath = path.split(".")
    const theRequestedValue = splittedPath.reduce((currentUser, partOfPath) => {
        const isValueExist = currentUser[ partOfPath ]
        return isValueExist ? currentUser[ partOfPath ] : "Not Availble"
    }, user)
    return theRequestedValue
}

function drawSelectOption(option){

    const options = [10,20,30,40,50];
    const optionWithoutNumber = options.filter(element=>{
        if (element !== option.val()){
            return element
        }
    }).map(element=>{
        return `<option>${element}</option>`
    })

    $("#langValue").append(option).append(...optionWithoutNumber);
    
}

(function () {
    const getOption = Number(localStorage.getItem("option")) === 0 ? 10 : localStorage.getItem("option")
    drawSelectOption($(`<option>${getOption}</option>`))
    const btnSearch = $("#searchOperation");
    const selectSearch =$("#langValue");
    btnSearch.click(function(){
        $("#container-data").html("")
        localStorage.setItem("option",selectSearch.val())
        init(selectSearch.val())
    });
    
})()



// init()

// function getMappedUserFn (user) {
//     const keyValueMappingArray = Object.entries(mappingWithFunction)
//     return keyValueMappingArray.reduce((mappedUser, KEYVALUEPAIR_ARRAY,) => {
//         const [ key, settingObj ] = KEYVALUEPAIR_ARRAY

//         // console.log(settingObj[ "fn" ])
//         return { ...mappedUser, [ key ]: settingObj[ "fn" ](user) }
//     }, {})
// }
