// Fetching the api with the countries info
fetch("https://restcountries.com/v3.1/all")
  .then((response) => response.json())
  .then((countriesArray) => {
    let textInput = document.getElementById("text-input");
    let autoCompleteList = document.querySelector(".autocomplete-list");
    // Autocomplete search function
    function AutocompleteSearch(textInput, countriesArray) {
      textInput.addEventListener("input", function () {
        closeList(autoCompleteList);
        let value = this.value;
        if (!value) {
          return false;
        }
        // create and set the autocomplete list
        // looping the countries
        for (let i = 0; i < countriesArray.length; i++) {
          let countryName = countriesArray[i].name.common;
          let countryFlag = countriesArray[i].flags.svg;
          let country;
          // Check if the countryName from the array contains input value
          if (
            countryName.toLowerCase().includes(value) ||
            countryName.includes(value)
          ) {
            // Create an image for the contry
            let autoCompleteImage = document.createElement("img");
            let autoCompleteHeader = document.createElement("h2");
            //Creates a div and append it to the autocomplete list
            let autoCompleteItem = document.createElement("div");
            autoCompleteItem.setAttribute("class", "autocomplete-items");
            autoCompleteHeader.innerText = countryName;
            autoCompleteImage.setAttribute("src", countryFlag);
            autoCompleteList.setAttribute("id", "autocomplete-list");
            autoCompleteItem.append(autoCompleteImage);
            autoCompleteItem.append(autoCompleteHeader);
            autoCompleteList.append(autoCompleteItem);
            autoCompleteItem.addEventListener("click", function (e) {
              textInput.value = e.target.innerText;
              closeList(autoCompleteList);
            });
          }
        }
      });
      //setting the focus of autocompleted items
      let currentFocus = -1;
      textInput.addEventListener("keydown", navigateAutoComplete);
      function navigateAutoComplete(e) {
        let completeListArray = autoCompleteList.getElementsByTagName("div");
        //moving prediction down
        if (e.keyCode == 40) {
          currentFocus++;
          if (currentFocus >= completeListArray.length) {
            currentFocus = 0;
          }

          if (currentFocus < 0) {
            currentFocus = completeListArray.length - 1;
          }

          if (currentFocus == 0) {
            completeListArray[
              completeListArray.length - 1
            ].style.backgroundColor = "#ffffff";
          }
          textInput.value = completeListArray[currentFocus].innerText;
          completeListArray[currentFocus].style.backgroundColor = "#039ed9";

          if (currentFocus > 0) {
            completeListArray[currentFocus - 1].style.backgroundColor =
              "#ffffff";
          }
        }

        //moving prediction up
        if (e.keyCode == 38) {
          currentFocus--;
          if (currentFocus >= completeListArray.length) {
            currentFocus = 0;
          }
          if (currentFocus < 0) {
            currentFocus = completeListArray.length - 1;
            completeListArray[0].style.backgroundColor = "#ffffff";
          }
          textInput.value = completeListArray[currentFocus].textContent;
          completeListArray[currentFocus].style.backgroundColor = "#039ed9";
          if (currentFocus < completeListArray.length - 1) {
            completeListArray[currentFocus + 1].style.backgroundColor =
              "#ffffff";
          }
        }
        //enter the prediction to the input
        if (e.keyCode == 13) {
          e.preventDefault();
          e.target.innerText = textInput.value;
          closeList(autoCompleteList);
          currentFocus = -1;
        }
      }
    }
    //Function for closing previous lists
    function closeList(autoCompleteList) {
      autoCompleteList.innerHTML = "";
    }
    //Calling the autocomplete function
    AutocompleteSearch(textInput, countriesArray);
  });
