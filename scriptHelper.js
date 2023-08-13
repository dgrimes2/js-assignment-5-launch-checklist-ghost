// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    // Here is the HTML formatting for our mission target div.
    // Use innerHTML to interact with missionTarget thru index
    // No return needed
    let missionTarget = document.getElementById('missionTarget');
    //    last line grabs the image from the list on planets.json
        missionTarget.innerHTML = 
                    `<h2>Mission Destination</h2>
                    <ol>
                        <li>Name: ${name}</li>
                        <li>Diameter: ${diameter} </li>
                        <li>Star: ${star}</li>
                        <li>Distance from Earth: ${distance}</li>
                        <li>Number of Moons: ${moons}</li>
                    </ol>
                    <img src=${imageUrl}>
                    `
}

function validateInput(testInput) {
//  if all fields aren't filled throw an alert, return "Empty"
//  the first two should be strings, second two numbers
    if (testInput === null || testInput === "" || testInput === " ") {
        // window.alert("It is required to fill ALL fields!");
        return "Empty";
        // testInput is by default a string, so convert it to a num
    } else if (!isNaN(Number(testInput)) === true) {
        return "Is a Number";
    } else {
        return "Not a Number";
    }
}

function formSubmission (document, list, pilot, copilot, fuelLevel, cargoLevel) {
// This is for the status box (on the bottom)
    // Add an event listener to script.js when ready to execute
//    validation for the four fields (first two strings, second two numbers)
//    grab the IDs from index (camelCase for both)    let pilotStatus = document.getElementById('pilotStatus');
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");
    let launchStatus = document.getElementById("launchStatus");

    // now validate!
    // if any of the 4 parameters are blank, throw an alert
    if ((validateInput(pilot) === "Empty") || (validateInput(copilot) === "Empty") || 
    (validateInput(fuelLevel) === "Empty") || (validateInput(cargoLevel) === "Empty")) {
        window.alert("\nIt is required to fill ALL fields!");
    // if the first two fields receive non strings
    } else if((validateInput(pilot) === "Is a Number") || (validateInput(copilot) === "Is a Number")) {
        window.alert("\nOnly enter non-number entries for Pilot and/or Co-pilot Name!");
    // if the second two fields receive non numbers
    } else if((validateInput(fuelLevel) === "Not a Number") || (validateInput(cargoLevel) === "Not a Number")) {
    window.alert("\nOnly enter numeric entries for Fuel Level and/or Cargo Mass!");
    } else {
        // level limits: fuelLevel/fuelStatus < 10000 & cargoMass/cargoStatus > 10000
        // for bottom status box, I want the two pilot statuses to always? show
        list.style.visibility = "hidden";
        pilotStatus.innerHTML = `Pilot ${pilot} is ready`;
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready`;
        }
    // shuttle level limits: fuelLevel/fuelStatus < 10000 & cargoMass/cargoStatus > 10000 are BAD
    // for bottom status box, I want the two pilot statuses to always? show
        if (cargoLevel > 10000) {
            list.style.visibility = "visible";
            cargoStatus.innerHTML = `Cargo mass is too heavy for launch`;
            launchStatus.innerHTML = `Shuttle not ready for launch`;
            launchStatus.style.color = "rgb(199, 37, 78)";
        } else if (fuelLevel < 10000) {
            list.style.visibility = "visible";
            fuelStatus.innerHTML = "Fuel level too low for trip";
            launchStatus.innerHTML = "Shuttle not ready for launch";
            launchStatus.style.color = "rgb(199, 37, 78)";
        } else if (fuelLevel >= 10000 && cargoLevel <= 10000) {
            list.style.visibility = "visible";
            fuelStatus.innerHTML = "Fuel level high enough for launch";
            cargoStatus.innerHTML = "Cargo mass low enough for launch";
            launchStatus.innerHTML = "Shuttle is ready for launch!";
            launchStatus.style.color = "rgb(65, 159, 106)";
        }

}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
        return response.json();
        });
    return planetsReturned;
}

function pickPlanet(planets) {
    // pass in a list of planets and return a random index for top box
    let randIndex = Math.floor(Math.random()*planets.length);
    return planets[randIndex];
}


module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
