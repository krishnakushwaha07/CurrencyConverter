const baseurl =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
//"https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json";

const dropdowns = document.querySelectorAll(".container select");

let output = document.querySelector(".msg");

// changing flag
const changeFlag = (ele) => {
  let currCode = ele.value;
  let conCode = countryList[currCode];

  const newSrc = `https://flagsapi.com/${conCode}/flat/64.png`;

  ele.parentElement.querySelector("img").src = newSrc;
};

//creating dropdown of selects
for (let select of dropdowns) {
  for (let currCode in countryList) {
    //console.log(currCode + " " + countryList[currCode]);
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    }
    if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.appendChild(newOption);
  }
  select.addEventListener("change", (eve) => {
    changeFlag(eve.target); // where change is happens
  });
}

// converting the amount in the user desired format
const convert = async () => {
  let amount = document.querySelector("#amount");

  const from = document.querySelector("#from").value.toLowerCase();
  const to = document.querySelector("#to").value.toLowerCase();

  let newUrl = `${baseurl}/${from}.json`; // prepare new url.
  let response = await fetch(newUrl); // send request
  let data = await response.json();

  // check for valid amount.
  if (amount.value.length > 15) {
    output.innerText = "It is valid for 15 digits.";
    return;
  }
  if (isNaN(amount.value)) {
    output.innerText = "Please enter valid amount.";
    return;
  }
  if (amount.value === "") {
    output.innerText = `${1}${from.toUpperCase()} = ${data[from][to].toFixed(3)}${to.toUpperCase()}`;
    return;
  }

  const newAmount = data[from][to] * parseFloat(amount.value.trim()); // converted amount

  //output the result through message.
  output.innerText = `${amount.value}${from.toUpperCase()} = ${newAmount.toFixed(3)}${to.toUpperCase()}`;
};



document.querySelector("#amount").addEventListener("input", convert);
document.querySelector('#from').addEventListener("change",convert);
document.querySelector('#to').addEventListener("change",convert);
window.addEventListener("load", () => {
  convert();
});
