const output = document.getElementById("output");
const btn = document.getElementById("btn");
const postData = document.getElementById("postdata");
let IP = "";

let long = "";
let lat = "";
let code = "";
let someValue = "";

document.addEventListener("DOMContentLoaded", function () {
  fetch("https://api.ipify.org/?format=json")
    .then((response) => response.json())
    .then((data) => {
      output.textContent = data.ip;
      IP = data.ip;
    })
    .catch((error) => {
      console.error("Error fetching IP address:", error);
    });
});

btn.addEventListener("click", () => {
  fetch(`https://ipapi.co/${IP}/json/`)
    .then((response) => response.json())
    .then((data) => {
      lat = data.latitude;
      long = data.longitude;
      console.log(lat + " " + long);
      output.innerHTML += `
<iframe src="https://maps.google.com/maps?q=${lat},${long}&z=15&output=embed"
width="360" height="270"></iframe>

<input type="text" placeholder="Pin Code" id="TextSerch">
<button id="searchBtn">Search</button>
`;

      document.getElementById("searchBtn").addEventListener("click", () => {
        const code = document.getElementById("TextSerch").value;
        console.log(code);
        someValue = code;
      });
      code = data.postal;
      zipCode(code);
    })
    .catch((error) => {
      console.log(error);
    });
});



function zipCode(code) {
  fetch(`https://api.postalpincode.in/pincode/${code}`)
    .then((response) => response.json())
    .then((data) => {
      const offices = data[0].PostOffice;

      postData.innerHTML = "";

      offices.forEach((office) => {
        postData.innerHTML += `
          <ul>
            <li>Name : ${office.Name}</li>
            <li>Branch Type : ${office.BranchType}</li>
            <li>Delivery Status : ${office.DeliveryStatus}</li>
            <li>District : ${office.District}</li>
            <li>Division : ${office.Division}</li>
          </ul>
        `;
      });

      document.getElementById("searchBtn")?.addEventListener("click", () => {
        const searchValue = document
          .getElementById("TextSerch")
          .value.toLowerCase();

        const results = offices.filter((office) =>
          office.Name.toLowerCase().includes(searchValue)
        );

        postData.innerHTML = "";

        results.forEach((office) => {
          postData.innerHTML += `
            <ul>
              <li>Name : ${office.Name}</li>
              <li>Branch Type : ${office.BranchType}</li>
              <li>Delivery Status : ${office.DeliveryStatus}</li>
              <li>District : ${office.District}</li>
              <li>Division : ${office.Division}</li>
            </ul>
          `;
        });
      });
    });
}
