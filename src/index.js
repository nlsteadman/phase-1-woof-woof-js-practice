document.addEventListener("DOMContentLoaded", () => {
    //DOM Selectors
    const dogBar = document.getElementById("dog-bar")
    const details = document.getElementById("dog-info")
    const filterButton = document.getElementById("good-dog-filter")

    //register listeners
    filterButton.addEventListener("click", toggleFilter)

    //Fetches
    function getAllDogs() {
        return fetch('http://localhost:3000/pups')
            .then(response => response.json())
            //.then(renderAllInBar)

    }

    function getOneDog(id) {
        return fetch(`http://localhost:3000/pups/${id}`)
            .then(response => response.json())

    }
    
    //Rendering
    function renderAllInBar(dogsArr, filter = false) {
        dogBar.innerHTML = ""
        if (filter) {
            dogsArr.filter(dogObject => dogObject.isGoodDog).forEach(addDogToBar)
        } else{
            dogsArr.forEach(addDogToBar)
        }

    }

    function addDogToBar(dogObject) {
        const dogSpan = document.createElement("span")
        dogSpan.innerText = dogObject.name
        dogSpan.dataset.id = dogObject.id
        dogSpan.addEventListener("click", handleSpanClick)
        dogBar.append(dogSpan)
    }
    
    function showOneDog(dogObject) {
        
        details.innerHTML = ""
        const dogDiv = document.createElement("div")
        dogDiv.innerHTML = `
            <img src=${dogObject.image}>
            <h2>${dogObject.name}</h2>`
        const pupButton = document.createElement('button')
        
        pupButton.textContent = ((dogObject.isGoodDog) ? "Good Dog" : "Bad Dog")
        pupButton.addEventListener("click", () => togglePupButton(pupButton))
        details.append(dogDiv, pupButton)

    }

    
    // Event handlers
    function handleSpanClick(event) {
        const id = event.target.dataset.id
        getOneDog(id).then(showOneDog)

    }

    function togglePupButton(pupButton) {
        pupButton.textContent = pupButton.textContent.includes("Good") ? "Bad Dog" : "Good Dog"
    }

    function toggleFilter() {
        if (filterButton.innerText.includes("OFF")) {
            filterButton.innerText = "filter good dogs: ON"
            getAllDogs().then(dogArr => renderAllInBar(dogArr, true))
        } else {
            filterButton.innerText = "filter good dogs: OFF"
            getAllDogs().then(renderAllInBar)
        }

    }
        
    getAllDogs().then(renderAllInBar)






})