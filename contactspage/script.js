let table = document.getElementById("dataTable");


function addContact(){
  let rowCount = table.rows.length;
  let row = table.insertRow(rowCount);
  let firstName= row.insertCell(0);
  let lastName = row.insertCell(1);
  let email = row.insertCell(2);
  let phoneNumber = row.insertCell(3);

  firstName.innerHTML = document.getElementById('fName').value;
  lastName.innerHTML = document.getElementById('lName').value;
  email.innerHTML = document.getElementById('email').value;
  phoneNumber.innerHTML = document.getElementById('phoneNumber').value;
}

function openForm() {
  document.getElementById("myForm").style.display = "block";
  overlay.style.display = 'block';
  overlay.classList.add("active"); // Add the active class to show the overlay with an ease-in effect
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
  overlay.style.display = 'block';
  overlay.classList.remove("active"); // Remove the active class to hide the overlay with an ease-in effect
}