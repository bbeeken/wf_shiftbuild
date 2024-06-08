function addMenuItem() {
  const rightNavigation = document.querySelector("#RightNavigation");
  if (!rightNavigation) {
    console.error("RightNavigation not found");
    return;
  }

  const newItem = document.createElement("span");
  newItem.classList.add("toInlineBlock", "pushRight");

  const newLink = document.createElement("a");
  newLink.href = "#";
  newLink.innerText = "New Popup Link";
  newLink.onclick = (event) => {
    event.preventDefault();
    openPopup();
  };

  newItem.appendChild(newLink);
  rightNavigation.appendChild(newItem);
  console.log("New link added to RightNavigation");
}

function openPopup() {
  const popup = document.createElement("div");
  popup.style.position = "fixed";
  popup.style.bottom = "0"; // Anchored to the bottom
  popup.style.left = "50%";
  popup.style.transform = "translate(-50%, 0)";
  popup.style.padding = "30px";
  popup.style.backgroundColor = "#fff";
  popup.style.border = "2px solid #000";
  popup.style.borderRadius = "10px 10px 0 0"; // Rounded corners at the top
  popup.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
  popup.style.zIndex = "1000";
  popup.style.width = "500px";
  popup.style.maxHeight = "70vh"; // Adjusted max height to fit within the viewport
  popup.style.overflowY = "auto";
  popup.style.display = "flex";
  popup.style.flexDirection = "column";
  popup.style.gap = "15px";

  const content = document.createElement("div");
  content.style.display = "flex";
  content.style.flexDirection = "column";
  content.style.gap = "15px";

  // Site selection dropdown
  const siteSelectLabel = document.createElement("label");
  siteSelectLabel.innerText = "Select Site:";
  siteSelectLabel.style.fontSize = "16px";
  siteSelectLabel.style.fontWeight = "bold";
  const siteSelect = document.createElement("select");
  siteSelect.id = "siteSelect";
  siteSelect.style.fontSize = "16px";
  siteSelect.style.padding = "8px";
  siteSelect.style.height = "40px"; // Increased height
  siteSelect.style.borderRadius = "5px";
  siteSelect.style.border = "1px solid #ccc";

  content.appendChild(siteSelectLabel);
  content.appendChild(siteSelect);

  // Fetch and populate sites
  fetchSites().then(sites => {
    sites.forEach(site => {
      const option = document.createElement("option");
      option.value = site.Id;
      option.text = site.DisplayValue;
      siteSelect.appendChild(option);
    });
  }).catch(error => {
    console.error('Failed to load sites:', error);
  });

  // Person selection dropdown
  const personSelectLabel = document.createElement("label");
  personSelectLabel.innerText = "Select Person:";
  personSelectLabel.style.fontSize = "16px";
  personSelectLabel.style.fontWeight = "bold";
  const personSelect = document.createElement("select");
  personSelect.id = "personSelect";
  personSelect.onchange = loadShifts;
  personSelect.style.fontSize = "16px";
  personSelect.style.padding = "8px";
  personSelect.style.height = "40px"; // Increased height
  personSelect.style.borderRadius = "5px";
  personSelect.style.border = "1px solid #ccc";
  const option1 = document.createElement("option");
  option1.value = "person1";
  option1.text = "Person 1";
  const option2 = document.createElement("option");
  option2.value = "person2";
  option2.text = "Person 2";
  personSelect.appendChild(option1);
  personSelect.appendChild(option2);
  content.appendChild(personSelectLabel);
  content.appendChild(personSelect);

  // Shifts dropdown
  const shiftSelectLabel = document.createElement("label");
  shiftSelectLabel.innerText = "Select Shift:";
  shiftSelectLabel.style.fontSize = "16px";
  shiftSelectLabel.style.fontWeight = "bold";
  const shiftSelect = document.createElement("select");
  shiftSelect.id = "shiftSelect";
  shiftSelect.style.fontSize = "16px";
  shiftSelect.style.padding = "8px";
  shiftSelect.style.height = "40px"; // Increased height
  shiftSelect.style.borderRadius = "5px";
  shiftSelect.style.border = "1px solid #ccc";
  content.appendChild(shiftSelectLabel);
  content.appendChild(shiftSelect);

  // Switch to person dropdown
  const switchPersonSelectLabel = document.createElement("label");
  switchPersonSelectLabel.innerText = "Switch To:";
  switchPersonSelectLabel.style.fontSize = "16px";
  switchPersonSelectLabel.style.fontWeight = "bold";
  const switchPersonSelect = document.createElement("select");
  switchPersonSelect.id = "switchPersonSelect";
  switchPersonSelect.style.fontSize = "16px";
  switchPersonSelect.style.padding = "8px";
  switchPersonSelect.style.height = "40px"; // Increased height
  switchPersonSelect.style.borderRadius = "5px";
  switchPersonSelect.style.border = "1px solid #ccc";
  const switchOption1 = document.createElement("option");
  switchOption1.value = "switchPerson1";
  switchOption1.text = "Switch Person 1";
  const switchOption2 = document.createElement("option");
  switchOption2.value = "switchPerson2";
  switchOption2.text = "Switch Person 2";
  switchPersonSelect.appendChild(switchOption1);
  switchPersonSelect.appendChild(switchOption2);
  content.appendChild(switchPersonSelectLabel);
  content.appendChild(switchPersonSelect);

  // Form submission button
  const submitButton = document.createElement("button");
  submitButton.innerText = "Submit";
  submitButton.style.fontSize = "16px";
  submitButton.style.padding = "10px";
  submitButton.style.borderRadius = "5px";
  submitButton.style.border = "1px solid #ccc";
  submitButton.style.backgroundColor = "#4CAF50";
  submitButton.style.color = "white";
  submitButton.style.cursor = "pointer";
  submitButton.onclick = submitForm;
  content.appendChild(submitButton);

  popup.appendChild(content);

  const closeButton = document.createElement("button");
  closeButton.innerText = "Close";
  closeButton.style.fontSize = "16px";
  closeButton.style.padding = "10px";
  closeButton.style.borderRadius = "5px";
  closeButton.style.border = "1px solid #ccc";
  closeButton.style.backgroundColor = "#f0f0f0";
  closeButton.style.cursor = "pointer";
  closeButton.onclick = () => {
    document.body.removeChild(popup);
  };
  content.appendChild(closeButton);

  document.body.appendChild(popup);
  console.log("Popup opened");
}

function loadShifts() {
  const person = document.getElementById("personSelect").value;
  const shiftSelect = document.getElementById("shiftSelect");

  shiftSelect.innerHTML = "";

  if (person === "person1") {
    const shiftOption1 = document.createElement("option");
    shiftOption1.value = "shift1";
    shiftOption1.text = "Shift 1";
    const shiftOption2 = document.createElement("option");
    shiftOption2.value = "shift2";
    shiftOption2.text = "Shift 2";
    shiftSelect.appendChild(shiftOption1);
    shiftSelect.appendChild(shiftOption2);
  } else if (person === "person2") {
    const shiftOption1 = document.createElement("option");
    shiftOption1.value = "shift3";
    shiftOption1.text = "Shift 3";
    const shiftOption2 = document.createElement("option");
    shiftOption2.value = "shift4";
    shiftOption2.text = "Shift 4";
    shiftSelect.appendChild(shiftOption1);
    shiftSelect.appendChild(shiftOption2);
  }
}

function fetchSites() {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ action: "getCookies" }, (response) => {
      if (response.error) {
        reject("Failed to get cookies");
        return;
      }

      const cookies = response.cookies;
      const cookieString = cookies.map(cookie => `${cookie.name}=${cookie.value}`).join("; ");

      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "https://pdi.heinzcorps.com/Workforce/Setup/Sites/GetSites?menuCode=WFE&functionalSecurityRight=WFEEditAll",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          "X-Requested-With": "XMLHttpRequest",
          "Cookie": cookieString,
        },
      };

      axios(config)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  });
}

function submitForm() {
  const selectedSite = document.getElementById("siteSelect").value;
  const selectedPerson = document.getElementById("personSelect").value;
  const selectedShift = document.getElementById("shiftSelect").value;
  const switchToPerson = document.getElementById("switchPersonSelect").value;

  const data = JSON.stringify({
    ScheduleKey: 2484,
    WorkTypeKey: 2,
    Site: selectedSite,
    Shifts: [
      {
        WorkshiftKey: 145543,
        WorkshiftTimestamp: "00000000018A5577",
        StartDate: "2024-05-28T08:00:00.00",
        StartTzOffset: -300,
        EndDate: "2024-05-28T17:00:00.00",
        EndTzOffset: -300,
      },
    ],
    AddEmployees: [parseInt(switchToPerson)],
    DeleteEmployees: [parseInt(selectedPerson)],
    IsDelete: false,
    UnpaidMinuteDuration: 0,
    IsRequireEmployees: false,
    RequireEmployeesCount: 1,
  });

  chrome.runtime.sendMessage({ action: "getCookies" }, (response) => {
    if (response.error) {
      console.error("Failed to get cookies:", response.error);
      return;
    }

    const cookies = response.cookies;
    const cookieString = cookies.map(cookie => `${cookie.name}=${cookie.value}`).join("; ");

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://pdi.heinzcorps.com/Workforce/LaborScheduling/Schedules/ProcessWorkshift",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "X-Requested-With": "XMLHttpRequest",
        "Cookie": cookieString,
      },
      withCredentials: true, // Ensures cookies are included in the request
      data: data,
    };

    axios(config)
      .then(response => {
        console.log(JSON.stringify(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  });
}
addMenuItem();
document.addEventListener("DOMContentLoaded", addMenuItem);
