let table = document.getElementById("dataTable");

function addContact() {
  let rowCount = table.rows.length;

  let row = table.insertRow(rowCount);
  let firstName = row.insertCell(0);
  let lastName = row.insertCell(1);
  let email = row.insertCell(2);
  let phoneNumber = row.insertCell(3);
  let editDelete = row.insertCell(4);

  // dynamically creates edit and delete buttons and adjusts css to fit in table cell
  let editBtn = document.createElement("button");
  editBtn.classList.add("open-button");
  editBtn.style.height = "40px";
  editBtn.style.width = "70px";
  editBtn.style.top = "0px";
  editBtn.innerHTML = "Edit";
  editBtn.style.position = "relative";
  editBtn.style.left = "2%";

  editContact(editBtn);

  let deleteBtn = document.createElement("button");
  deleteBtn.classList.add("open-button");
  deleteBtn.style.height = "40px";
  deleteBtn.style.width = "80px";
  deleteBtn.style.top = "0px";
  deleteBtn.innerHTML = "Delete";
  deleteBtn.style.position = "relative";
  deleteBtn.style.left = "2%";

  deleteContact(deleteBtn);

  firstName.innerHTML = document.getElementById("fName").value;
  lastName.innerHTML = document.getElementById("lName").value;
  email.innerHTML = document.getElementById("email").value;
  phoneNumber.innerHTML = document.getElementById("phoneNumber").value;
  editDelete.appendChild(editBtn);
  editDelete.appendChild(deleteBtn);

  closeForm();
}

function deleteContact(button) {
  button.addEventListener("click", () => {
    if (
      confirm(
        "This will delete this contact's name, email, and phone number. Are you sure?"
      )
    ) {
      /* Make sure row deletion starts at row 2 and don't delete 0 and 1.
         0 is the header row, row 1 is the empty row in the HTML that lets us make the body color different than the header row color. */

      // .closest() goes up DOM tree to find "tr". Since buttons are always
      // nested inside a tr and are always in separate tr's, this works.
      button.closest("tr").remove();
    }
  });
}

function editContact(button) {
  button.addEventListener("click", () => {
    if (button.innerHTML === "Edit") {
      // Change the button text to "Done" and make the cells editable
      button.innerHTML = "Done";

      // cells containing these items
      let fName = table.rows[button.closest("tr").rowIndex].cells[0];
      let lName = table.rows[button.closest("tr").rowIndex].cells[1];
      let email = table.rows[button.closest("tr").rowIndex].cells[2];
      let phone = table.rows[button.closest("tr").rowIndex].cells[3];

      fName.innerHTML =
        "<input type='text' class='editable-input' value='" +
        fName.innerHTML +
        "'></input>";
      lName.innerHTML =
        "<input type='text' class='editable-input' value='" +
        lName.innerHTML +
        "'></input>";
      email.innerHTML =
        "<input type='text' class='editable-input' value='" +
        email.innerHTML +
        "'></input>";
      phone.innerHTML =
        "<input type='text' class='editable-input' value='" +
        phone.innerHTML +
        "'></input>";
    } else if (button.innerHTML === "Done") {
      // Change the button text back to "Edit" and save the changes
      button.innerHTML = "Edit";

      // cells containing these items
      let fName = table.rows[button.closest("tr").rowIndex].cells[0];
      let lName = table.rows[button.closest("tr").rowIndex].cells[1];
      let email = table.rows[button.closest("tr").rowIndex].cells[2];
      let phone = table.rows[button.closest("tr").rowIndex].cells[3];

      // Update the cell content with the edited values
      fName.innerHTML = fName.querySelector("input").value;
      lName.innerHTML = lName.querySelector("input").value;
      email.innerHTML = email.querySelector("input").value;
      phone.innerHTML = phone.querySelector("input").value;
    }
  });
}

function openForm() {
  document.getElementById("myForm").style.display = "block";
  var overlay = document.getElementById("overlay");
  overlay.classList.add("active"); // Add the active class to show the overlay with an ease-in effect
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
  var overlay = document.getElementById("overlay");
  overlay.classList.remove("active"); // Remove the active class to hide the overlay with an ease-in effect
}

function logout() {}
