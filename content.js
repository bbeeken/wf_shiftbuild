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
  newLink.innerText = "Shift Swap";
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
  popup.style.padding = "20px";
  popup.style.backgroundColor = "#fff";
  popup.style.border = "1px solid #000";
  popup.style.zIndex = "1000";

  const content = document.createElement("div");
  content.innerText = "This is the popup content!";
  popup.appendChild(content);

  const closeButton = document.createElement("button");
  closeButton.innerText = "Close";
  closeButton.onclick = () => {
    document.body.removeChild(popup);
  };
  popup.appendChild(closeButton);

  document.body.appendChild(popup);
  console.log("Popup opened");
}

document.addEventListener("DOMContentLoaded", addMenuItem);
addMenuItem();
