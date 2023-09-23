const urlBase = "http://138.197.64.137/LAMPAPI";
const extension = "php";

let table = document.getElementById("dataTable");
let userId = 0;
let firstName = "";
let lastName = "";

// ------------ START OF INDEX.HTML SECTION (LOGIN) ------------
function doSignup() {
  firstName = document.getElementById("fName").value;
  lastName = document.getElementById("lName").value;
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  document.getElementById("signupResult").innerHTML = "";

  // var hash = md5(password);

  let tmp = {
    firstname: firstName,
    lastname: lastName,
    login: username,
    password: password,
  };

  let jsonPayload = JSON.stringify(tmp);
  let url = urlBase + "/Signup." + extension;

  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let jsonObject = JSON.parse(xhr.responseText);
        userId = jsonObject.id;

        document.getElementById("signupResult").innerHTML =
          "Account Successfully Created";

        firstName = jsonObject.firstName;
        lastName = jsonObject.lastName;
        saveCookie();
      } else if (this.readyState == 4 && this.status == 409) {
        document.getElementById("User already exists");
        return;
      }
    };
    xhr.send(jsonPayload);
  } catch (err) {
    document.getElementById("signupResult").innerHTML = err.message;
  }
}

function doLogin() {
  userId = 0;
  firstName = "";
  lastName = "";

  let login = document.getElementById("loginName").value;
  let password = document.getElementById("loginPassword").value;
  // var hash = md5(password);

  document.getElementById("loginResult").innerHTML = "";

  let tmp = { login: login, password: password };

  let jsonPayload = JSON.stringify(tmp);

  let url = urlBase + "/Login." + extension;

  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let jsonObject = JSON.parse(xhr.responseText);
        userId = jsonObject.id;

        if (userId < 1) {
          document.getElementById("loginResult").innerHTML =
            "User/Password combination incorrect";
          return;
        }

        firstName = jsonObject.firstName;
        lastName = jsonObject.lastName;

        saveCookie();

        window.location.href = "contacts.html";
      }
    };

    xhr.send(jsonPayload);
  } catch (err) {
    document.getElementById("loginResult").innerHTML = err.message;
  }
}

function saveCookie() {
  let minutes = 20;
  let date = new Date();
  date.setTime(date.getTime() + minutes * 60 * 1000);
  document.cookie =
    "firstName=" +
    firstName +
    ",lastName=" +
    lastName +
    ",userId=" +
    userId +
    ";expires=" +
    date.toGMTString();
}
// ------------ END OF INDEX.HTML SECTION (LOGIN) ------------

// ------------ START OF CONTACTS.HTML SECTION ------------

function readCookie() {
  userId = -1;
  let data = document.cookie;
  let splits = data.split(",");
  for (var i = 0; i < splits.length; i++) {
    let thisOne = splits[i].trim();
    let tokens = thisOne.split("=");
    if (tokens[0] == "firstName") {
      firstName = tokens[1];
    } else if (tokens[0] == "lastName") {
      lastName = tokens[1];
    } else if (tokens[0] == "userId") {
      userId = parseInt(tokens[1].trim());
    }
  }

  if (userId < 0) {
    window.location.href = "index.html";
  } else {
    // COMMENTED OUT FOR DEBUGGING (WE DON'T HAVE THIS ID YET)
    // document.getElementById("userName").innerHTML =
    //   "Logged in as " + firstName + " " + lastName;
  }
}

function loadContacts() {
  let table = document.getElementById("dataTable");
  // table.innerHTML = "";

  let url = urlBase + "/SearchContact." + extension;

  let jsonPayload = {
    name: "",
    userId: userId,
  };

  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let response = JSON.parse(xhr.responseText);

      console.log(response);
      console.log(response.results);

      for (let i = 0; i < response.results.length; i++) {
        let row = table.insertRow();

        let firstNameCell = row.insertCell(0);
        let lastNameCell = row.insertCell(1);
        let emailCell = row.insertCell(2);
        let phoneNumberCell = row.insertCell(3);
        let actionsCell = row.insertCell(4);

        if (response.results[i].hasOwnProperty("name")) {
          firstNameCell.innerHTML = response.results.firstName;
        } else {
          firstNameCell.innerHTML = "N/A";
        }

        if (response.results[i].hasOwnProperty("name")) {
          lastNameCell.innerHTML = response.results[i].lastName;
        } else {
          lastNameCell.innerHTML = "N/A";
        }

        if (response.results[i].hasOwnProperty("email")) {
          emailCell.innerHTML = response.results[i].email;
        } else {
          emailCell.innerHTML = "N/A";
        }

        if (response.results[i].hasOwnProperty("phone")) {
          phoneNumberCell.innerHTML = response.results[i].phone;
        } else {
          phoneNumberCell.innerHTML = "N/A";
        }

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

        actionsCell.appendChild(editBtn);
        actionsCell.appendChild(deleteBtn);
      }
    }
  };

  xhr.send(JSON.stringify(jsonPayload));
}

function addContact() {
  let firstNameValue = document.getElementById("fName").value;
  let lastNameValue = document.getElementById("lName").value;
  let emailValue = document.getElementById("email").value;
  let phoneNumberValue = document.getElementById("phoneNumber").value;
  document.getElementById("contactAddResult").innerHTML = "";

  let fullName = firstNameValue + " " + lastNameValue;

  let tmp = {
    name: fullName,
    email: emailValue,
    phone: phoneNumberValue,
    userId: userId,
  };

  let jsonPayload = JSON.stringify(tmp);

  let url = urlBase + "/AddContact." + extension;
  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("contactAddResult").innerHTML =
          "Contact has been added";
      }
    };
    xhr.send(jsonPayload);
  } catch (err) {
    document.getElementById("contactAddResult").innerHTML = err.message;
  }

  let rowCount = table.rows.length;
  let row = table.insertRow(rowCount);
  let firstName = row.insertCell(0);
  let lastName = row.insertCell(1);
  let email = row.insertCell(2);
  let phoneNumber = row.insertCell(3);
  let editDelete = row.insertCell(4);

  // dynamically create edit and delete buttons and adjust CSS to fit in table cell
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

  firstName.innerHTML = firstNameValue;
  lastName.innerHTML = lastNameValue;
  email.innerHTML = emailValue;
  phoneNumber.innerHTML = phoneNumberValue;
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
      let tableRow = button.closest("tr");
      let firstNameValue = tableRow.cells[0].textContent;
      let lastNameValue = tableRow.cells[1].textContent;
      let fullName = firstNameValue + " " + lastNameValue;

      // document.getElementById("contactDeleteResult").innerHTML = "";

      let deletePayload = {
        name: fullName,
      };

      let jsonPayload = JSON.stringify(deletePayload);
      let deleteUrl = urlBase + "/DeleteContact." + extension;

      let xhr = new XMLHttpRequest();
      xhr.open("POST", deleteUrl, true);
      xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

      try {
        xhr.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            console.log("Contact has been deleted");
          }
        };
        xhr.send(jsonPayload);
      } catch (err) {
        console.log(err.message);
      }

      tableRow.remove();
    }
  });
}

function editContact(button) {
  // cells containing these items

  let OriginalFullName;
  let NewFullName;
  let tmpPhone;
  let tmpEmail;
  let editFinishedFlag = 0;

  button.addEventListener("click", () => {
    if (button.innerHTML === "Edit") {
      // Change the button text to "Done" and make the cells editable
      button.innerHTML = "Done";

      let fName = table.rows[button.closest("tr").rowIndex].cells[0];
      let lName = table.rows[button.closest("tr").rowIndex].cells[1];
      let email = table.rows[button.closest("tr").rowIndex].cells[2];
      let phone = table.rows[button.closest("tr").rowIndex].cells[3];

      OriginalFullName = fName.innerHTML + " " + lName.innerHTML;

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

      editFinishedFlag = 0;
    } else if (button.innerHTML === "Done") {
      // Change the button text back to "Edit" and save the changes
      button.innerHTML = "Edit";

      let fName = table.rows[button.closest("tr").rowIndex].cells[0];
      let lName = table.rows[button.closest("tr").rowIndex].cells[1];
      let email = table.rows[button.closest("tr").rowIndex].cells[2];
      let phone = table.rows[button.closest("tr").rowIndex].cells[3];

      // Update the cell content with the edited values
      fName.innerHTML = fName.querySelector("input").value;
      lName.innerHTML = lName.querySelector("input").value;
      email.innerHTML = email.querySelector("input").value;
      phone.innerHTML = phone.querySelector("input").value;

      tmpPhone = phone.innerHTML;
      tmpEmail = email.innerHTML;
      NewFullName = fName.innerHTML + " " + lName.innerHTML;
      editFinishedFlag = 1;
    }

    // document.getElementById("contactUpdate").innerHTML = "";
    if (editFinishedFlag === 1) {
      let tmp = {
        contactname: OriginalFullName,
        name: NewFullName,
        phone: tmpPhone,
        email: tmpEmail,
        userId: userId,
      };

      let jsonPayload = JSON.stringify(tmp);

      let url = urlBase + "/UpdateContact." + extension;
      let xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

      try {
        xhr.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            // document.getElementById("contactUpdate").innerHTML =
            //   "Contact has been added";
            console.log("THIS USER HAS BEEN EDITED");
          }
        };
        xhr.send(jsonPayload);
        console.log("PAYLOAD FOR EDIT HAS BEEN SENT");
      } catch (err) {
        // document.getElementById("contactUpdate").innerHTML = err.message;
      }
    }
  });
}

var form = document.getElementById("myForm");
var openButton = document.getElementById("open-button");

function openForm() {
  document.getElementById("myForm").style.display = "block";
  var overlay = document.getElementById("overlay");
  overlay.classList.add("active");

  form.classList.toggle("slide-in");
  form.style.display = form.classList.contains("slide-in") ? "block" : "none";
  openButton.textContent = form.classList.contains("slide-in")
    ? "Close Form"
    : "Open Form";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
  var overlay = document.getElementById("overlay");
  overlay.classList.remove("active");
  form.classList.remove("slide-in");
  form.style.display = "none";
}

// search contact feature
function searchContact() {
  var input, filter, tr, td, i, txtValue;
  input = document.getElementById("mySearchInput");
  filter = input.value.toUpperCase();
  tr = table.getElementsByTagName("tr");

  //traverse through rows & hide non matches
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0]; //search by name

    if (td) {
      txtValue = td.textContent || td.innerText;

      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
  closeSearchForm();
}

function openSearchForm() {
  document.getElementById("mySearchForm").style.display = "block";
  var overlay = document.getElementById("overlay");
  overlay.classList.add("active"); // Add the active class to show the overlay with an ease-in effect
}

function closeSearchForm() {
  document.getElementById("mySearchForm").style.display = "none";
  var overlay = document.getElementById("overlay");
  overlay.classList.remove("active"); // Remove the active class to hide the overlay with an ease-in effect
}

// clear search button
function clearContactSearch() {
  var tr, i;
  tr = table.getElementsByTagName("tr");

  //clear matches & return to original table
  for (i = 0; i < tr.length; i++) {
    tr[i].style.display = "";
  }
}

function doLogout() {
  userId = 0;
  firstName = "";
  lastName = "";
  document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  window.location.href = "index.html";
}

function searchConnection(button) {
  let srch = document.getElementById("mySearchInput").value;
  //document.getElementById("colorSearchResult").innerHTML = "";
  tr = table.getElementsByTagName("tr").innerHTML = "";

  let searchList = "";

  let tmp = { search: srch, userId: userId };
  let jsonPayload = JSON.stringify(tmp);

  let url = urlBase + "/SearchContact." + extension;

  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        // document.getElementById("colorSearchResult").innerHTML =
        //   "Contact(s) has been retrieved.";
        table.getElementsByTagName("tr").innerHTML =
          "Contact(s) have been retrieved.";
        let jsonObject = JSON.parse(xhr.responseText);

        for (let i = 0; i < jsonObject.results.length; i++) {
          colorList += jsonObject.results[i];
          if (i < jsonObject.results.length - 1) {
            colorList += "<br />\r\n";
          }
        }

        document.getElementsByTagName("p")[0].innerHTML = searchList;
      }
    };
    xhr.send(jsonPayload);
  } catch (err) {
    //document.getElementById("colorSearchResult").innerHTML = err.message;
    table.getElementsByTagName("tr").innerHTML = err.message;
  }
}

// ------------ END OF CONTACTS.HTML SECTION ------------

// We can use these to help connect our add/search contacts to backend
function addColor() {
  let newColor = document.getElementById("colorText").value;
  document.getElementById("colorAddResult").innerHTML = "";

  let tmp = { color: newColor, userId, userId };
  let jsonPayload = JSON.stringify(tmp);

  let url = urlBase + "/AddColor." + extension;

  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("colorAddResult").innerHTML =
          "Color has been added";
      }
    };
    xhr.send(jsonPayload);
  } catch (err) {
    document.getElementById("colorAddResult").innerHTML = err.message;
  }
}
