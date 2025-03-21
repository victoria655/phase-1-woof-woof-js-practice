/*document.addEventListener("DOMContentLoaded", function () {

    fetch("http://localhost:3000/pups")
        .then(response => response.json()) 
        .then(data => displayData(data))
        .catch(error => console.error("Error fetching pups:", error)); // Moved inside the chain
});

function displayData(pups) {
    const pupBar = document.getElementById("dog-bar");


    pupBar.innerHTML = ""; // Clear previous content

    pups.forEach(pup => {
        const name = document.createElement("span");
        name.textContent = pup.name;
        pupBar.appendChild(name);
    });
}
const pup =document.querySelectorAll("span")
pup.addEventListener("click",function(event){
    fetch("http://localhost:3000/pups")
    .then(response => response.json()) 
    .then(info => displayInfo(info))
    .catch(error => console.error("Error fetching pups:", error)); // Moved inside the chain

})



function displayInfo(pups){
  const dog =document.getElementById("dog-info") 
  dog.innerHTML=""

  pups.forEach(pup => {
    const image =document.createElement("img")
    const name=document.createElement("h2")
    const status =document.createElement("button")

    image.src=pup.image;
    name.textContent=pup.name;
    status.textContent=pup.isGoodDog;
    dog.appendChild(image);
    dog.appendChild(name);
    dog.appendChild(status);
});


}
*/

document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:3000/pups")
        .then(response => response.json()) 
        .then(data => displayData(data))
        .catch(error => console.error("Error fetching pups:", error)); 
});

function displayData(pups) {
    const pupBar = document.getElementById("dog-bar");
    pupBar.innerHTML = ""; // Clear previous content

    pups.forEach(pup => {
        const name = document.createElement("span");
        name.textContent = pup.name;
        name.dataset.id = pup.id; // Store pup's ID
        pupBar.appendChild(name);

        // Add event listener to each span
        name.addEventListener("click", function () {
            displayInfo(pup); // Pass the clicked dog's data
        });
    });
}

function displayInfo(pup) {
    const dogInfo = document.getElementById("dog-info");
    dogInfo.innerHTML = ""; // Clear previous content

    const image = document.createElement("img");
    const name = document.createElement("h2");
    const statusButton = document.createElement("button");

    image.src = pup.image;
    name.textContent = pup.name;
    statusButton.textContent = pup.isGoodDog ? "Good Dog!" : "Bad Dog!";

    // Add event listener to toggle status
    statusButton.addEventListener("click", function () {
        toggleGoodDog(pup, statusButton);
    });

    dogInfo.appendChild(image);
    dogInfo.appendChild(name);
    dogInfo.appendChild(statusButton);
}

// ✅ Function to toggle Good Dog/Bad Dog
function toggleGoodDog(pup, button) {
    const updatedStatus = !pup.isGoodDog; // Toggle the boolean value

    fetch(`http://localhost:3000/pups/${pup.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ isGoodDog: updatedStatus })
    })
    .then(response => response.json())
    .then(updatedPup => {
        button.textContent = updatedPup.isGoodDog ? "Good Dog!" : "Bad Dog!";
        pup.isGoodDog = updatedPup.isGoodDog; // Update local object
    })
    .catch(error => console.error("Error updating pup:", error));
}
function toggleFilter() {
    const filterButton = document.getElementById("good-dog-filter");
    let filterOn = filterButton.textContent.includes("OFF"); // Check current state

    filterButton.textContent = `Filter good dogs: ${filterOn ? "ON" : "OFF"}`;

    fetch("http://localhost:3000/pups")
        .then(response => response.json())
        .then(pups => {
            const filteredPups = filterOn ? pups.filter(pup => pup.isGoodDog) : pups;
            displayData(filteredPups);
        })
        .catch(error => console.error("Error fetching pups:", error));
}

// ✅ Add event listener to the filter button
document.getElementById("good-dog-filter").addEventListener("click", toggleFilter);



