import 'bootstrap/dist/css/bootstrap.css'
import jokes from "./jokes";

//const allJokes = jokes.getJokes().map(joke => "<li>"+joke+"</li>");
//document.getElementById("jokes").innerHTML = allJokes.join("");



//JS Event handling, HTML5 and inline SVG 
/*
    Needs to be able to highlight the selected contry.
    Fetch data from api.
*/

var countryinfo;

function fetchFunction(fetchUrl, callback) {
    fetch(fetchUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            callback(data);
        });
};

function selectCountry(element) {
    if (element.target.id.length > 2) {
        fetchFunction("http://restcountries.eu/rest/v1/alpha?codes=" + element.target.parentNode.id, pasteCountryData);
    } else {
        fetchFunction("http://restcountries.eu/rest/v1/alpha?codes=" + element.target.id, pasteCountryData);

    }
}

var printArray = ["Country", "Population", "Area", "Borders"];

function pasteCountryData(data) {
    generateHTMLelements();
    populateElements(data);
}

function populateElements(data) {
    document.getElementById("Country").innerHTML = "Country: " + data[0].name;
    document.getElementById("Population").innerHTML = "Population: " + data[0].population;
    document.getElementById("Area").innerHTML = "Area: " + data[0].area;
    document.getElementById("Borders").innerHTML = "Borders: " + data[0].borders;
}

const eventBubbling = document.getElementById("svg2");
eventBubbling.addEventListener("click", (element) => {
    if (countryinfo == null) {
        countryinfo = element;
        element.target.style = "fill: red";
    } else {
        countryinfo.target.style = "fill:#c0c0c0";
        element.target.style = "fill: red";
        countryinfo = element;
    }
    element.target.id = selectCountry(element);
});


function generateHTMLelements() {
    let pasteDiv = document.getElementById("countrydata");
    printArray.forEach(element => {
        let HTMLelement = document.createElement("p");
        HTMLelement.setAttribute("id", element);
        HTMLelement.innerHTML = "";
        pasteDiv.appendChild(HTMLelement);
    });
};