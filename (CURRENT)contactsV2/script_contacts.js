let table = document.getElementById("dataTable");
// console.log("The length of table before addContact() is called: " + table.rows.length);

function addContact(){
  let rowCount = table.rows.length;
    
 // console.log("in addcontact() BEFORE INSERT: " + rowCount);
  let row = table.insertRow(rowCount);
  let firstName= row.insertCell(0);
  let lastName = row.insertCell(1);
  let email = row.insertCell(2);
  let phoneNumber = row.insertCell(3);
  let editDelete = row.insertCell(4);
 // console.log("in addcontact() AFTER INSERT: " + rowCount);

  // dynamically creates edit and delete buttons and adjusts css to fit in table cell
  let editBtn = document.createElement("button");
  editBtn.classList.add("open-button");
  editBtn.style.height = "30px";
  editBtn.style.width = "60px";
  editBtn.style.top = "0px";
  editBtn.innerHTML = "Edit";
  editBtn.style.position = "relative";
  editBtn.style.left = "2%";
  

  // editContact(editBtn);

  let deleteBtn = document.createElement("button");
  deleteBtn.classList.add("open-button");
  deleteBtn.style.height = "30px";
  deleteBtn.style.width = "80px";
  deleteBtn.style.top = "0px";
  deleteBtn.innerHTML = "Delete";
  deleteBtn.style.position = "relative";
  deleteBtn.style.left = "2%";

  deleteContact(deleteBtn, rowCount);
  
  firstName.innerHTML = document.getElementById('fName').value;
  lastName.innerHTML = document.getElementById('lName').value;
  email.innerHTML = document.getElementById('email').value;
  phoneNumber.innerHTML = document.getElementById('phoneNumber').value;
  editDelete.appendChild(editBtn); 
  editDelete.appendChild(deleteBtn);

  closeForm();
}

function deleteContact(button, rowLength) {
  button.addEventListener('click', () => {
    if (confirm("This will delete this contact's name, email, and phone number. Are you Sure?")) {
      // Get the row index of the button clicked
      const rowIndex = button.closest('tr').rowIndex;

      /* Make sure row deletion starts at row 2 and don't delete 0 and 1.
         0 is the header row, row 1 is the empty row in the HTML that lets us make the body color different than the header row color. */
      if (rowIndex >= 2) {
        // Delete the row
        button.closest('tr').remove();

        // Decrement rowLength by 1 since a row is deleted
        rowLength--;
      }
      
      // Adjust rowLength values for rows after the deleted row
      for (let i = rowIndex; i < rowLength + 2; i++) {
        const currentRow = table.rows[i];
        currentRow.querySelector('.rowLength').textContent = i - 1;
      }
    }
  });
}

  // function enables user to adjust any of the table data for a particular row.
function editContact(){
  // do stuff here
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

function logout() {
  
}


// search contact feature
function searchContact(){

  var input, filter, tr, td, i, txtValue;
  input = document.getElementById("mySearchInput");
  filter = input.value.toUpperCase();
  tr = table.getElementsByTagName("tr");
  

  //traverse through rows & hide non matches
  for(i=0; i<tr.length; i++){
    td = tr[i].getElementsByTagName("td")[2]; //search by email 

    if(td){
      txtValue = td.textContent || td.innerText;

      if(txtValue.toUpperCase().indexOf(filter) > -1){
        tr[i].style.display = "";
      } 
      else {
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
function clearContactSearch(){

  var tr, i;
  tr = table.getElementsByTagName("tr");
  
  //clear matches & return to original table
  for(i=0; i<tr.length; i++){
    tr[i].style.display = "";
  }
}