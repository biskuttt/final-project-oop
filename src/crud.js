const { app, BrowserWindow } = require('electron');
const fs = require('fs');
const path = require('path');

var btnCreate = document.getElementById('btnCreate');
var btnRead = document.getElementById('btnRead');
var btnDelete = document.getElementById('btnDelete');
var btnUpdate = document.getElementById('btnUpdate');
var fileName = document.getElementById('fileName');
var fileContents = document.getElementById('fileContents');
var wishlistname = document.getElementById('wishlistname'); // Ensure this is defined for creating/updating files

let pathName = path.join(__dirname, 'Files');

// Function to open custom alert modal
function showAlert(message) {
    const alertModal = document.getElementById('alertModal');
    const alertMessage = document.getElementById('alertMessage');
    alertMessage.innerText = message;  // Set the message content
    alertModal.style.display = 'block';  // Show modal
}

// Event listener for close button and modal button
document.getElementById('closeModal').onclick = function() {
    document.getElementById('alertModal').style.display = 'none';
};
document.getElementById('modalButton').onclick = function() {
    document.getElementById('alertModal').style.display = 'none';
};

// CREATE - creates a text file with contents and displays info
btnCreate.addEventListener('click', function() {
    let file = path.join(pathName, wishlistname.value);
    let contents = fileContents.value;
    
    fs.writeFile(file, contents, function(err) {
        if (err) {
            console.log(err);
            showAlert("Error creating file: " + err.message);
            return;
        }
        showAlert(`${wishlistname.value} text file was created`);
        console.log("The file was created");

        // Display the file creation info
        document.getElementById('createdFileName').innerText = `Name: ${wishlistname.value}`;
        document.getElementById('createdFileContents').innerText = contents;
        document.getElementById('creationInfo').style.display = 'block'; // Show info div
    });
});

// READ - reads the content of the specified text file
btnRead.addEventListener('click', function(){
    let targetFile = wishlistname.value; // Make sure wishlistname is defined and used here
    let file = path.join(pathName, targetFile);

    fs.readFile(file, function(err, data) {
        if (err) {
            console.log(err);
            showAlert("Error reading file: " + err.message);
            return;
        }
        fileContents.value = data;
        showAlert(`File ${targetFile} was read successfully!`);
        console.log("The file was read!");

        // Hide creation information
        document.getElementById('creationInfo').style.display = 'none';
    });
});

// DELETE - deletes the specified text file
btnDelete.addEventListener('click', function(){
    let targetFile = wishlistname.value || fileName.value;  // Use wishlistname or fallback to fileName
    let file = path.join(pathName, targetFile);

    fs.unlink(file, function(err) {
        if (err) {
            console.log(err);
            showAlert("Error deleting file: " + err.message);
            return;
        }
        fileName.value = "";
        fileContents.value = "";
        showAlert(`File ${targetFile} was deleted successfully!`);
        console.log("The file was deleted!");

        // Hide creation information
        document.getElementById('creationInfo').style.display = 'none';
    });
});

// UPDATE - updates the content of the specified text file
btnUpdate.addEventListener('click', function() {
    let targetFile = wishlistname.value || fileName.value;  // Use wishlistname or fallback to fileName
    let file = path.join(pathName, targetFile);
    let contents = fileContents.value;

    fs.writeFile(file, contents, function(err) {
        if (err) {
            console.log(err);
            showAlert("Error updating file: " + err.message);
            return;
        }
        showAlert(`File ${targetFile} was updated successfully!`);
        console.log("The file was updated");

        // Display the file creation info
        document.getElementById('createdFileName').innerText = `Name: ${targetFile}`;
        document.getElementById('createdFileContents').innerText = contents;
        document.getElementById('creationInfo').style.display = 'block'; // Show info div
        fileName.value = "";
        fileContents.value = "";
    });
});

// Populate Wishlist Country field on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedCountry = localStorage.getItem('wishlistCountry');
    if (savedCountry) {
        document.getElementById('fileName').value = savedCountry; // Set the input field
    }
});
