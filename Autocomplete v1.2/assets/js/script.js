import { countriesArray } from "./modules/countries.js";
let textInput = document.getElementById("text-input");
let autoCompleteList = document.querySelector(".autocomplete-list");
// Autocomplete search function
function AutocompleteSearch(inputContent, countriesArray) {
  inputContent.addEventListener("input", function () {
    closeList(autoCompleteList);
    let value = this.value;
    if (!value) {
      return false;
    }
    // create and set the autocomplete list
    // looping the countries
    for (let i = 0; i < countriesArray.length; i++) {
      let country = countriesArray[i];

      // Check if the country from the array contains input value
      if (country.toLowerCase().includes(value) || country.includes(value)) {
        //Creates a div and append it to the autocomplete list
        let autoCompleteItem = document.createElement("div");
        autoCompleteItem.setAttribute("class", "autocomplete-items");
        autoCompleteList.setAttribute("id", "autocomplete-list");
        // autoCompleteList.setAttribute("tabIndex", 40);
        autoCompleteItem.innerText = country;
        autoCompleteList.append(autoCompleteItem);
        autoCompleteItem.addEventListener("click", function (e) {
          inputContent.value = e.target.innerText;
          closeList(autoCompleteList);
        });
      }
    }
  });
  //setting the focus of autocompleted items
  let currentFocus = -1;
  inputContent.addEventListener("keydown", function (e) {
    let listArray = autoCompleteList.getElementsByTagName("div");
    //

    //moving prediction down
    if (e.keyCode == 40) {
      console.log(currentFocus);
      currentFocus++;
      if (currentFocus >= listArray.length) {
        currentFocus = 0;
      }
      if (currentFocus < 0) {
        currentFocus = listArray.length - 1;
      }
      if (currentFocus == 0) {
        listArray[listArray.length - 1].style.backgroundColor = "#ffffff";
      }
      inputContent.value = listArray[currentFocus].innerText;
      listArray[currentFocus].style.backgroundColor = "rgb(220, 191, 0)";
      if (currentFocus > 0) {
        listArray[currentFocus - 1].style.backgroundColor = "#ffffff";
      }
    }

    //moving prediction up
    if (e.keyCode == 38) {
      currentFocus--;
      if (currentFocus >= listArray.length) {
        currentFocus = 0;
      }
      if (currentFocus < 0) {
        currentFocus = listArray.length - 1;
        listArray[0].style.backgroundColor = "#ffffff";
      }
      inputContent.value = listArray[currentFocus].textContent;
      console.log(currentFocus);
      listArray[currentFocus].style.backgroundColor = "rgb(220, 191, 0)";
      if (currentFocus < listArray.length - 1) {
        listArray[currentFocus + 1].style.backgroundColor = "#ffffff";
      }
    }
    //enter the prediction to the input
    if (e.keyCode == 13) {
      e.preventDefault();
      e.target.innerText = inputContent.value;
      closeList(autoCompleteList);
      currentFocus = -1;
    }
  });
}
//Function for closing previous lists
function closeList(autoCompleteList) {
  autoCompleteList.innerHTML = "";
}
//Calling the autocomplete function
AutocompleteSearch(textInput, countriesArray);

// flags!!! - api
// TO DO !!!
// fetch("https://restcountries.com/v3.1/all")
//   .then((response) => response.json())
//   .then((countriesArray) => {
//     countriesArray.forEach((country) => {
//       console.log(countriesArray);
//       console.log(country.name.common);
//       console.log(country.flags.svg);
//     });
//   });
