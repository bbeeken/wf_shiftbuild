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
  newLink.innerText = "Shift Swapper";
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
  popup.style.padding = "15px";
  popup.style.backgroundColor = "#fff";
  popup.style.border = "2px solid #000";
  popup.style.borderRadius = "10px";
  popup.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
  popup.style.zIndex = "1000";
  popup.style.width = "500px";
  popup.style.maxHeight = "50vh";
  popup.style.overflowY = "auto";
  popup.style.display = "flex";
  popup.style.flexDirection = "column";
  popup.style.gap = "2px";

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

  const siteSelectLabel = document.createElement("label");
  siteSelectLabel.innerText = "Select Site:";
  siteSelectLabel.style.fontSize = "14px";
  siteSelectLabel.style.fontWeight = "bold";
  const siteSelect = document.createElement("select");
  siteSelect.id = "siteSelect";
  siteSelect.style.fontSize = "14px";
  siteSelect.style.padding = "4px";
  siteSelect.style.height = "30px";
  siteSelect.style.borderRadius = "5px";
  siteSelect.style.border = "1px solid #ccc";
  siteSelect.onchange = () => {
    loadSchedules();
    shiftSelect.disabled = true;
    personSelect.disabled = true;
    switchPersonSelect.disabled = true;
  };

  const defaultSiteOption = document.createElement("option");
  defaultSiteOption.value = "";
  defaultSiteOption.text = "Select your site to start";
  siteSelect.appendChild(defaultSiteOption);

  content.appendChild(siteSelectLabel);
  content.appendChild(siteSelect);

  fetchSites()
    .then((sites) => {
      sites.forEach((site) => {
        const option = document.createElement("option");
        option.value = site.Id;
        option.text = site.DisplayValue;
        option.setAttribute("data-key", site.Key);
        siteSelect.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Failed to load sites:", error);
    });

  const scheduleSelectLabel = document.createElement("label");
  scheduleSelectLabel.innerText = "Select Schedule:";
  scheduleSelectLabel.style.fontSize = "14px";
  scheduleSelectLabel.style.fontWeight = "bold";
  const scheduleSelect = document.createElement("select");
  scheduleSelect.id = "scheduleSelect";
  scheduleSelect.disabled = true;
  scheduleSelect.onchange = () => {
    fetchScheduleDetails(scheduleSelect.value);
    shiftSelect.disabled = false;
  };
  scheduleSelect.style.fontSize = "14px";
  scheduleSelect.style.padding = "4px";
  scheduleSelect.style.height = "30px";
  scheduleSelect.style.borderRadius = "5px";
  scheduleSelect.style.border = "1px solid #ccc";

  const defaultScheduleOption = document.createElement("option");
  defaultScheduleOption.value = "";
  defaultScheduleOption.text = "Select a schedule";
  scheduleSelect.appendChild(defaultScheduleOption);

  content.appendChild(scheduleSelectLabel);
  content.appendChild(scheduleSelect);

  const shiftSelectLabel = document.createElement("label");
  shiftSelectLabel.innerText = "Select Shift:";
  shiftSelectLabel.style.fontSize = "14px";
  shiftSelectLabel.style.fontWeight = "bold";
  const shiftSelect = document.createElement("select");
  shiftSelect.id = "shiftSelect";
  shiftSelect.disabled = true;
  shiftSelect.style.fontSize = "14px";
  shiftSelect.style.padding = "4px";
  shiftSelect.style.height = "30px";
  shiftSelect.style.borderRadius = "5px";
  shiftSelect.style.border = "1px solid #ccc";
  shiftSelect.onchange = () => {
    personSelect.disabled = false;
    populateAssignedStaffDropdown(shiftSelect.value);
    populateSwitchPersonDropdown();
  };

  const defaultShiftOption = document.createElement("option");
  defaultShiftOption.value = "";
  defaultShiftOption.text = "Select a shift";
  shiftSelect.appendChild(defaultShiftOption);

  content.appendChild(shiftSelectLabel);
  content.appendChild(shiftSelect);

  const personSelectLabel = document.createElement("label");
  personSelectLabel.innerText = "Assigned Staff:";
  personSelectLabel.style.fontSize = "14px";
  personSelectLabel.style.fontWeight = "bold";
  const personSelect = document.createElement("select");
  personSelect.id = "personSelect";
  personSelect.disabled = true;
  personSelect.onchange = () => {
    switchPersonSelect.disabled = false;
  };
  personSelect.style.fontSize = "14px";
  personSelect.style.padding = "4px";
  personSelect.style.height = "30px";
  personSelect.style.borderRadius = "5px";
  personSelect.style.border = "1px solid #ccc";

  const defaultPersonOption = document.createElement("option");
  defaultPersonOption.value = "";
  defaultPersonOption.text = "Select a person";
  personSelect.appendChild(defaultPersonOption);

  content.appendChild(personSelectLabel);
  content.appendChild(personSelect);

  const switchPersonSelectLabel = document.createElement("label");
  switchPersonSelectLabel.innerText = "Switch To:";
  switchPersonSelectLabel.style.fontSize = "14px";
  switchPersonSelectLabel.style.fontWeight = "bold";
  const switchPersonSelect = document.createElement("select");
  switchPersonSelect.id = "switchPersonSelect";
  switchPersonSelect.disabled = true;
  switchPersonSelect.style.fontSize = "14px";
  switchPersonSelect.style.padding = "4px";
  switchPersonSelect.style.height = "30px";
  switchPersonSelect.style.borderRadius = "5px";
  switchPersonSelect.style.border = "1px solid #ccc";

  const defaultSwitchPersonOption = document.createElement("option");
  defaultSwitchPersonOption.value = "";
  defaultSwitchPersonOption.text = "Select a person to switch to";
  switchPersonSelect.appendChild(defaultSwitchPersonOption);

  content.appendChild(switchPersonSelectLabel);
  content.appendChild(switchPersonSelect);

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

  const notification = document.createElement("div");
  notification.id = "notification";
  notification.style.marginTop = "10px";
  notification.style.fontSize = "14px";
  notification.style.fontWeight = "bold";
  popup.appendChild(notification);

  document.body.appendChild(popup);
  console.log("Popup opened");
}

function loadSchedules() {
  const siteSelect = document.getElementById("siteSelect");
  const scheduleSelect = document.getElementById("scheduleSelect");
  const siteId = siteSelect.value;
  const siteOption = siteSelect.selectedOptions[0];
  const siteDescription = siteOption.textContent.split("(")[0].trim();
  const siteKey = siteOption.getAttribute("data-key");

  if (!siteId || !siteKey) {
    console.error("Site not selected or site key not found");
    return;
  }

  scheduleSelect.innerHTML = '<option value="">Select a schedule</option>';
  scheduleSelect.disabled = false;

  const scheduleFilters = {
    Site: {
      Key: Number.parseInt(siteKey, 10),
      Id: siteId,
      IdFormatted: siteId,
      Description: siteDescription,
    },
    FromDate: "2024-05-25T00:00:00.00",
    ToDate: "1901-01-01T00:00:00.00",
    WeekEndingDate: "2024-06-08T00:00:00.00",
    ScheduleType: {
      Key: 0,
      ID: null,
      Description: null,
      Timestamp: null,
    },
    CanViewAdvSearch: true,
    CheckForLineOfAuthority: true,
    FilterSource: 0,
  };

  fetchSchedules(scheduleFilters)
    .then((schedules) => {
      schedules.sort((a, b) => {
        const nameA = a.LaborScheduleType.Description.toUpperCase();
        const nameB = b.LaborScheduleType.Description.toUpperCase();
        const dateA = new Date(a.StartDateTime);
        const dateB = new Date(b.StartDateTime);

        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        if (dateA < dateB) return -1;
        if (dateA > dateB) return 1;
        return 0;
      });

      schedules.forEach((schedule) => {
        const startDate = new Date(schedule.StartDateTime);
        const endDate = new Date(schedule.EndDateTime);
        const formattedStartDate = startDate.toLocaleDateString();
        const formattedEndDate = endDate.toLocaleDateString();

        const option = document.createElement("option");
        option.value = schedule.Key;
        option.text = `${schedule.LaborScheduleType.Description} (${formattedStartDate} - ${formattedEndDate})`;
        scheduleSelect.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Failed to load schedules:", error);
    });
}

function fetchScheduleDetails(scheduleId) {
  getCookies().then((cookie) => {
    const config = {
      method: 'post',
      url: 'https://pdi.heinzcorps.com/Workforce/LaborScheduling/Schedules/GetSchedule',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookie
      },
      data: JSON.stringify({ key: scheduleId, publish: false })
    };

    axios(config)
      .then(response => {
        const scheduleDetails = response.data;
        console.log('Schedule details:', scheduleDetails);
        const workShifts = scheduleDetails?.Schedule?.Workshifts || [];
        const workshiftEmployees = scheduleDetails?.Schedule?.WorkshiftEmployees || [];
        const availableEmployees = scheduleDetails?.AvailableEmployees || [];
        const availableWorkTypes = scheduleDetails?.AvailableWorkTypes || [];
        window.scheduleData = {
          workShifts,
          workshiftEmployees,
          availableEmployees,
          availableWorkTypes,
          scheduleTimestamp: scheduleDetails.Schedule.Timestamp
        };
        populateWorkShiftsDropdown(workShifts, availableWorkTypes);
      })
      .catch(error => {
        console.error('Error fetching schedule details:', error);
        showNotification(`Error fetching schedule details: ${error}`);
      });
  });
}

function populateWorkShiftsDropdown(workShifts, workTypes) {
  const shiftSelect = document.getElementById("shiftSelect");

  shiftSelect.innerHTML = '<option value="">Select a shift</option>';

  const workTypeMap = workTypes.reduce((map, workType) => {
    map[workType.Key] = workType.Description;
    return map;
  }, {});

  workShifts.forEach(shift => {
    const workTypeDescription = workTypeMap[shift.ScheduleWorkTypeKey] || 'Unknown Work Type';
    const startDate = new Date(shift.StartDate).toLocaleString();
    const endDate = new Date(shift.EndDate).toLocaleString();
    const option = document.createElement('option');
    option.value = shift.Key;
    option.text = `${workTypeDescription} (${startDate} - ${endDate})`;
    shiftSelect.appendChild(option);
  });
}

function populateAssignedStaffDropdown(workshiftKey) {
  const personSelect = document.getElementById("personSelect");
  const workshiftEmployees = window.scheduleData.workshiftEmployees;

  personSelect.innerHTML = '<option value="">Select a person</option>';

  workshiftEmployees
    .filter(employee => employee.WorkshiftKey == workshiftKey)
    .forEach(employee => {
      const assignedEmployee = window.scheduleData.availableEmployees.find(e => e.Key == employee.EmployeeKey);
      if (assignedEmployee) {
        const option = document.createElement('option');
        option.value = employee.Key;
        option.text = `${assignedEmployee.FirstName} ${assignedEmployee.LastName}`;
        personSelect.appendChild(option);
      }
    });
}

function populateSwitchPersonDropdown() {
  const switchPersonSelect = document.getElementById("switchPersonSelect");
  const selectedShift = document.getElementById("shiftSelect").value;
  const workshift = window.scheduleData.workShifts.find(shift => shift.Key == selectedShift);
  const workTypeKey = workshift.ScheduleWorkTypeKey;
  const availableEmployees = window.scheduleData.availableEmployees;

  switchPersonSelect.innerHTML = '<option value="">Select a person to switch to</option>';

  availableEmployees
    .filter(employee => employee.WorkTypeKey == workTypeKey)
    .forEach(employee => {
      const option = document.createElement('option');
      option.value = employee.Key;
      option.text = `${employee.FirstName} ${employee.LastName}`;
      switchPersonSelect.appendChild(option);
    });
}

function submitForm() {
  const siteSelect = document.getElementById("siteSelect");
  const scheduleSelect = document.getElementById("scheduleSelect");
  const personSelect = document.getElementById("personSelect");
  const shiftSelect = document.getElementById("shiftSelect");
  const switchPersonSelect = document.getElementById("switchPersonSelect");

  const scheduleKey = scheduleSelect.value;
  console.log('Submitting form with schedule key:', scheduleKey);
  const shiftKey = shiftSelect.value;
  const workshift = window.scheduleData.workShifts.find(shift => shift.Key == shiftKey);
  const workTypeKey = workshift.ScheduleWorkTypeKey;
  const timestamp = window.scheduleData.scheduleTimestamp;
  const workshiftTimestamp = workshift.Timestamp;
  console.log('Workshift details:', workshift);
  const startDate = workshift.StartDate;
  const startTzOffset = workshift.StartTzOffset;
  const endDate = workshift.EndDate;
  const endTzOffset = workshift.EndTzOffset;
  const addEmployee = switchPersonSelect.value;
  const deleteEmployee = personSelect.value;

  const reopenScheduleData = JSON.stringify({ scheduleKey, timestamp });
  const updateScheduleData = JSON.stringify({
    ScheduleKey: scheduleKey,
    WorkTypeKey: workTypeKey,
    Shifts: [{
      WorkshiftKey: shiftKey,
      WorkshiftTimestamp: workshiftTimestamp,
      StartDate: startDate,
      StartTzOffset: startTzOffset,
      EndDate: endDate,
      EndTzOffset: endTzOffset
    }],
    AddEmployees: [addEmployee],
    DeleteEmployees: [deleteEmployee],
    IsDelete: false,
    UnpaidMinuteDuration: 0,
    IsRequireEmployees: false,
    RequireEmployeesCount: 1
  });
  const republishScheduleData = JSON.stringify({ scheduleKey, timestamp });

  getCookies().then((cookie) => {
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': '*/*',
        'X-Requested-With': 'XMLHttpRequest',
        'Cookie': cookie
      }
    };

    // Reopen the schedule
    axios.post('https://pdi.heinzcorps.com/Workforce/LaborScheduling/Schedules/ReopenSchedule', reopenScheduleData, config)
      .then(() => {
        // Update the schedule
        return axios.post('https://pdi.heinzcorps.com/Workforce/LaborScheduling/Schedules/ProcessWorkshift', updateScheduleData, config);
      })
      .then(() => {
        // Fetch the latest schedule timestamp before publishing
        return axios.post('https://pdi.heinzcorps.com/Workforce/LaborScheduling/Schedules/GetSchedule', JSON.stringify({ key: scheduleKey, publish: false }), config);
      })
      .then(response => {
        const newTimestamp = response.data.Schedule.Timestamp;
        const republishData = JSON.stringify({ scheduleKey, timestamp: newTimestamp });
        // Republish the schedule with the new timestamp
        return axios.post('https://pdi.heinzcorps.com/Workforce/LaborScheduling/Schedules/PublishSchedule', republishData, config);
      })
      .then(response => {
        console.log('Schedule successfully updated and republished:', response.data);
        showNotification(response.data);
        // Clear fields
        clearPopupFields();
      })
      .catch(error => {
        console.error('Error during schedule processing:', error);
        showNotification({ Successful: false, Errors: [error.message] });
      });
  });
}

function showNotification(response) {
  const notification = document.getElementById("notification");
  notification.style.color = response.Successful ? "green" : "red";
  notification.innerText = response.Successful ? "Shift swap successful!" : `Error: ${response.Errors.join(", ")}`;
}

function clearPopupFields() {
  document.getElementById("siteSelect").value = "";
  document.getElementById("scheduleSelect").value = "";
  document.getElementById("shiftSelect").value = "";
  document.getElementById("personSelect").value = "";
  document.getElementById("switchPersonSelect").value = "";
}

function fetchSites() {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ action: "getCookies" }, (response) => {
      if (response.error) {
        reject(response.error);
        return;
      }

      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "https://pdi.heinzcorps.com/Workforce/Setup/Sites/GetSites?menuCode=WFE&functionalSecurityRight=WFEEditAll",
        headers: {
          Cookie: response.cookie,
        },
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
        method: "post",
        maxBodyLength: Infinity,
        url: "https://pdi.heinzcorps.com/Workforce/LaborScheduling/Schedules/RetrieveSchedules",
        headers: {
          "Content-Type": "application/json",
          Cookie: response.cookie,
        },
        data: JSON.stringify(scheduleFilters),
      };

      axios(config)
        .then((response) => {
          const currentSchedules = response.data.CurrentSchedules
            ? response.data.CurrentSchedules.Schedules
            : [];
          const futureSchedules = response.data.FutureSchedules
            ? response.data.FutureSchedules.flatMap((fs) => fs.Schedules)
            : [];
          const combinedSchedules = [...currentSchedules, ...futureSchedules];
          resolve(combinedSchedules);
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
}

function getCookies() {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ action: "getCookies" }, (response) => {
      if (response.error) {
        reject(response.error);
      } else {
        resolve(response.cookie);
      }
    });
  });
}

addMenuItem();
document.addEventListener("DOMContentLoaded", addMenuItem);
