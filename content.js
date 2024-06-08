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
  popup.style.top = "50%"; // Center vertically
  popup.style.left = "50%"; // Center horizontally
  popup.style.transform = "translate(-50%, -50%)"; // Adjust position to truly center
  popup.style.padding = "15px";
  popup.style.backgroundColor = "#fff";
  popup.style.border = "2px solid #000";
  popup.style.borderRadius = "10px"; // Rounded corners
  popup.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
  popup.style.zIndex = "1000";
  popup.style.width = "500px";
  popup.style.maxHeight = "50vh"; // Adjusted max height to fit within the viewport
  popup.style.overflowY = "auto";
  popup.style.display = "flex";
  popup.style.flexDirection = "column";
  popup.style.gap = "2px";

  // Title bar
  const titleBar = document.createElement("div");
  titleBar.style.display = "flex";
  titleBar.style.justifyContent = "center";
  titleBar.style.alignItems = "center";
  titleBar.style.padding = "10px 0";
  titleBar.style.fontSize = "18px";
  titleBar.style.fontWeight = "bold";
  titleBar.style.borderBottom = "2px solid #000";
  titleBar.innerText = "Shift Swapper";
  popup.appendChild(titleBar);

  const content = document.createElement("div");
  content.style.display = "flex";
  content.style.flexDirection = "column";
  content.style.gap = "2px";

  // Site selection dropdown
  const siteSelectLabel = document.createElement("label");
  siteSelectLabel.innerText = "Select Site:";
  siteSelectLabel.style.fontSize = "14px";
  siteSelectLabel.style.fontWeight = "bold";
  const siteSelect = document.createElement("select");
  siteSelect.id = "siteSelect";
  siteSelect.style.fontSize = "14px";
  siteSelect.style.padding = "4px";
  siteSelect.style.height = "30px"; // Increased height
  siteSelect.style.borderRadius = "5px";
  siteSelect.style.border = "1px solid #ccc";
  siteSelect.onchange = () => {
    loadSchedules();
    personSelect.disabled = true;
    shiftSelect.disabled = true;
    switchPersonSelect.disabled = true;
  };

  // Default option for site selection
  const defaultSiteOption = document.createElement("option");
  defaultSiteOption.value = "";
  defaultSiteOption.text = "Select your site to start";
  siteSelect.appendChild(defaultSiteOption);

  content.appendChild(siteSelectLabel);
  content.appendChild(siteSelect);

  // Fetch and populate sites
  fetchSites().then(sites => {
    sites.forEach(site => {
      console.log(site);
      const option = document.createElement("option");
      option.value = site.Id;
      option.text = site.DisplayValue;
      option.setAttribute('data-key', site.Key); // 
      siteSelect.appendChild(option);
    });
  }).catch(error => {
    console.error('Failed to load sites:', error);
  });

  // Schedule selection dropdown
  const scheduleSelectLabel = document.createElement("label");
  scheduleSelectLabel.innerText = "Select Schedule:";
  scheduleSelectLabel.style.fontSize = "14px";
  scheduleSelectLabel.style.fontWeight = "bold";
  const scheduleSelect = document.createElement("select");
  scheduleSelect.id = "scheduleSelect";
  scheduleSelect.disabled = true; // Initially disabled
  scheduleSelect.onchange = () => {
    loadEmployees();
    personSelect.disabled = false;
  };
  scheduleSelect.style.fontSize = "14px";
  scheduleSelect.style.padding = "4px";
  scheduleSelect.style.height = "30px"; // Increased height
  scheduleSelect.style.borderRadius = "5px";
  scheduleSelect.style.border = "1px solid #ccc";

  // Default option for schedule selection
  const defaultScheduleOption = document.createElement("option");
  defaultScheduleOption.value = "";
  defaultScheduleOption.text = "Select a schedule";
  scheduleSelect.appendChild(defaultScheduleOption);

  content.appendChild(scheduleSelectLabel);
  content.appendChild(scheduleSelect);

  // Person selection dropdown
  const personSelectLabel = document.createElement("label");
  personSelectLabel.innerText = "Select Person:";
  personSelectLabel.style.fontSize = "14px";
  personSelectLabel.style.fontWeight = "bold";
  const personSelect = document.createElement("select");
  personSelect.id = "personSelect";
  personSelect.disabled = true; // Initially disabled
  personSelect.onchange = () => {
    loadShifts();
    shiftSelect.disabled = false;
  };
  personSelect.style.fontSize = "14px";
  personSelect.style.padding = "4px";
  personSelect.style.height = "30px"; // Increased height
  personSelect.style.borderRadius = "5px";
  personSelect.style.border = "1px solid #ccc";

  // Default option for person selection
  const defaultPersonOption = document.createElement("option");
  defaultPersonOption.value = "";
  defaultPersonOption.text = "Select a person";
  personSelect.appendChild(defaultPersonOption);

  content.appendChild(personSelectLabel);
  content.appendChild(personSelect);

  // Shifts dropdown
  const shiftSelectLabel = document.createElement("label");
  shiftSelectLabel.innerText = "Select Shift:";
  shiftSelectLabel.style.fontSize = "14px";
  shiftSelectLabel.style.fontWeight = "bold";
  const shiftSelect = document.createElement("select");
  shiftSelect.id = "shiftSelect";
  shiftSelect.disabled = true; // Initially disabled
  shiftSelect.style.fontSize = "14px";
  shiftSelect.style.padding = "4px";
  shiftSelect.style.height = "30px"; // Increased height
  shiftSelect.style.borderRadius = "5px";
  shiftSelect.style.border = "1px solid #ccc";
  shiftSelect.onchange = () => {
    switchPersonSelect.disabled = false;
  };

  // Default option for shift selection
  const defaultShiftOption = document.createElement("option");
  defaultShiftOption.value = "";
  defaultShiftOption.text = "Select a shift";
  shiftSelect.appendChild(defaultShiftOption);

  content.appendChild(shiftSelectLabel);
  content.appendChild(shiftSelect);

  // Switch to person dropdown
  const switchPersonSelectLabel = document.createElement("label");
  switchPersonSelectLabel.innerText = "Switch To:";
  switchPersonSelectLabel.style.fontSize = "14px";
  switchPersonSelectLabel.style.fontWeight = "bold";
  const switchPersonSelect = document.createElement("select");
  switchPersonSelect.id = "switchPersonSelect";
  switchPersonSelect.disabled = true; // Initially disabled
  switchPersonSelect.style.fontSize = "14px";
  switchPersonSelect.style.padding = "4px";
  switchPersonSelect.style.height = "30px"; // Increased height
  switchPersonSelect.style.borderRadius = "5px";
  switchPersonSelect.style.border = "1px solid #ccc";

  // Default option for switch person selection
  const defaultSwitchPersonOption = document.createElement("option");
  defaultSwitchPersonOption.value = "";
  defaultSwitchPersonOption.text = "Select a person to switch to";
  switchPersonSelect.appendChild(defaultSwitchPersonOption);

  content.appendChild(switchPersonSelectLabel);
  content.appendChild(switchPersonSelect);

  // Form submission button
  const submitButton = document.createElement("button");
  submitButton.innerText = "Submit";
  submitButton.style.fontSize = "14px";
  submitButton.style.padding = "4px";
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
  closeButton.style.fontSize = "14px";
  closeButton.style.padding = "4px";
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

function loadSchedules() {
  const siteSelect = document.getElementById("siteSelect");
  const scheduleSelect = document.getElementById("scheduleSelect");
  const siteId = siteSelect.value;
  const siteOption = siteSelect.selectedOptions[0];
  console.log(siteOption);
  const siteDescription = siteOption.textContent.split('(')[0].trim();
  const siteKey = siteOption.getAttribute('data-key'); // Retrieve the site key

  if (!siteId || !siteKey) {
    console.error("Site not selected or site key not found");
    return;
  }

  scheduleSelect.innerHTML = '<option value="">Select a schedule</option>';
  scheduleSelect.disabled = false;

  const scheduleFilters = {
    "Site": {
      "Key": siteKey,
      "Id": siteId,
      "IdFormatted": siteId,
      "Description": siteDescription
    },
    "FromDate": "2024-05-25T00:00:00.00",
    "ToDate": "1901-01-01T00:00:00.00",
    "WeekEndingDate": "2024-06-08T00:00:00.00",
    "ScheduleType": {
      "Key": 0,
      "ID": null,
      "Description": null,
      "Timestamp": null
    },
    "CanViewAdvSearch": true,
    "CheckForLineOfAuthority": true,
    "FilterSource": 0
  };

  fetchSchedules(scheduleFilters).then(schedules => {
    schedules.forEach(schedule => {
      const option = document.createElement("option");
      console.log(schedule);
      option.value = schedule.Key;
      option.text = `${schedule.LaborScheduleType.Description} (${schedule.StartDateTime} - ${schedule.EndDateTime})`;
      scheduleSelect.appendChild(option);
    });
  }).catch(error => {
    console.error('Failed to load schedules:', error);
  });
}



function loadEmployees() {
  const scheduleSelect = document.getElementById("scheduleSelect");
  const personSelect = document.getElementById("personSelect");
  const scheduleId = scheduleSelect.value;

  if (!scheduleId) {
    console.error("Schedule not selected");
    return;
  }

  personSelect.innerHTML = '<option value="">Select a person</option>';

  const employeeFilters = {
    "employeeFilters": {
      "Key": null,
      "LastName": null,
      "FirstName": "",
      "Id": null,
      "BusinessEntityKey": null,
      "OrganizationLevelKey": "1",
      "OrganizationId": scheduleId,
      "WithTraitKey": null,
      "WithTraitValue": null,
      "PayTypeId": null,
      "PayFrequencyId": null,
      "StatusId": null,
      "City": null,
      "PositionTypeId": null,
      "ExemptStatusId": null,
      "PositionKey": null,
      "StateProvinceKey": null,
      "PostalCode": null,
      "WorkTypeKey": null,
      "DeductionKey": null,
      "PayrollTaxKey": null,
      "PaymentMethodId": null,
      "TimeOffPlanKey": null,
      "IsPopUp": false,
      "OnlyActiveEmployees": true,
      "NationalId": "",
      "Email": null,
      "CheckLoa": false,
      "EffectiveDate": "2024-06-08T00:00:00.00",
      "EffectiveThruDate": null,
      "FunctionalSecurityCode": "WFEEditAll",
      "AlwaysIncludeHomeSiteEmployees": false,
      "ExcludeCurrentEmployees": false,
      "LimitNumberOfRowsTo": 3000,
      "EmployeeStatuses": null,
      "UserId": null,
      "OnlyEmployeesWithNegativeTimeOffBalance": false,
      "AllowInActiveEmployees": true
    }
  };

  fetchEmployees(employeeFilters).then(employees => {
    employees.sort((a, b) => a.FullName.localeCompare(b.FullName));
    employees.forEach(employee => {
      const option = document.createElement("option");
      option.value = employee.Id;
      option.text = employee.FullName;
      personSelect.appendChild(option);
    });
  }).catch(error => {
    console.error('Failed to load employees:', error);
  });
}

function loadShifts() {
  const shiftSelect = document.getElementById("shiftSelect");
  shiftSelect.innerHTML = '<option value="">Select a shift</option>';
  shiftSelect.disabled = false;

  // Load shifts based on the selected employee
  // Example data; replace with actual shift loading logic
  const shifts = [
    { Id: 1, Description: "Morning Shift" },
    { Id: 2, Description: "Afternoon Shift" },
    { Id: 3, Description: "Night Shift" }
  ];

  shifts.forEach(shift => {
    const option = document.createElement("option");
    option.value = shift.Id;
    option.text = shift.Description;
    shiftSelect.appendChild(option);
  });
}

function submitForm() {
  const siteSelect = document.getElementById("siteSelect");
  const scheduleSelect = document.getElementById("scheduleSelect");
  const personSelect = document.getElementById("personSelect");
  const shiftSelect = document.getElementById("shiftSelect");
  const switchPersonSelect = document.getElementById("switchPersonSelect");

  const data = {
    site: siteSelect.value,
    schedule: scheduleSelect.value,
    person: personSelect.value,
    shift: shiftSelect.value,
    switchPerson: switchPersonSelect.value
  };

  console.log('Form data:', data);

  // Submit the form data to the server
  // Replace with actual submission logic
}

function fetchSites() {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ action: "getCookies" }, (response) => {
      if (response.error) {
        reject(response.error);
        return;
      }

      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://pdi.heinzcorps.com/Workforce/Setup/Sites/GetSites?menuCode=WFE&functionalSecurityRight=WFEEditAll',
        headers: {
          'Cookie': response.cookie
        }
      };

      axios(config)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
}

function fetchSchedules(scheduleFilters) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ action: "getCookies" }, (response) => {
      if (response.error) {
        reject(response.error);
        return;
      }

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://pdi.heinzcorps.com/Workforce/LaborScheduling/Schedules/RetrieveSchedules',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Cookie': response.cookie
        },
        data: JSON.stringify(scheduleFilters)
      };

      axios(config)
        .then(response => {
          resolve(response.data.CurrentSchedules.Schedules);
        })
        .catch(error => {
          reject(error);
        });
    });
  });
}


function fetchEmployees(employeeFilters) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ action: "getCookies" }, (response) => {
      if (response.error) {
        reject(response.error);
        return;
      }

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://pdi.heinzcorps.com/Workforce/Employees/GetEmployeesByFilter?area=Setup',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': response.cookie
        },
        data: JSON.stringify(employeeFilters)
      };

      axios(config)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
}

addMenuItem();
document.addEventListener("DOMContentLoaded", addMenuItem);
