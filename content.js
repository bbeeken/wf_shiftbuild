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
  popup.style.top = "50%";
  popup.style.left = "50%";
  popup.style.transform = "translate(-50%, -50%)";
  popup.style.padding = "30px";
  popup.style.backgroundColor = "#fff";
  popup.style.border = "2px solid #000";
  popup.style.borderRadius = "10px";
  popup.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
  popup.style.zIndex = "1000";
  popup.style.width = "500px";
  popup.style.height = "400px";
  popup.style.overflowY = "auto";
  popup.style.display = "flex";
  popup.style.flexDirection = "column";
  popup.style.gap = "15px";

  const content = document.createElement("div");
  content.style.display = "flex";
  content.style.flexDirection = "column";
  content.style.gap = "15px";

  // Person selection dropdown
  const personSelectLabel = document.createElement("label");
  personSelectLabel.innerText = "Select Person:";
  personSelectLabel.style.fontSize = "18px";
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
  shiftSelectLabel.style.fontSize = "18px";
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
  switchPersonSelectLabel.style.fontSize = "18px";
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
  // Logic to load shifts based on selected person
  const person = document.getElementById("personSelect").value;
  const shiftSelect = document.getElementById("shiftSelect");

  // Clear existing options
  shiftSelect.innerHTML = "";

  // Load new shifts (dummy data for now)
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

function submitForm() {
  // Get the necessary values from the form
  const selectedPerson = document.getElementById("personSelect").value;
  const selectedShift = document.getElementById("shiftSelect").value;
  const switchToPerson = document.getElementById("switchPersonSelect").value;

  // Use dummy data for the request body
  let data = JSON.stringify({
    ScheduleKey: 2484,
    WorkTypeKey: 2,
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

  // Get cookies and headers from the current session
  chrome.cookies.getAll({ domain: "pdi.heinzcorps.com" }, function (cookies) {
    let cookieString = cookies
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; ");

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://pdi.heinzcorps.com/Workforce/LaborScheduling/Schedules/ProcessWorkshift",
      headers: {
        "sec-ch-ua":
          '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
        DNT: "1",
        "sec-ch-ua-mobile": "?0",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "*/*",
        "X-Requested-With": "XMLHttpRequest",
        "sec-ch-ua-platform": '"Windows"',
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Dest": "empty",
        host: "pdi.heinzcorps.com",
        Cookie: cookieString,
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  });
}

document.addEventListener("DOMContentLoaded", addMenuItem);
