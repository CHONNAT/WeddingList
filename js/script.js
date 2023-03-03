//==============< Set Title Name >==============
var webTitle = document.getElementById('webTitle');
webTitle.innerHTML = "Wedding Lists";

//==============< Header >==============
var navBar = document.getElementById('header');
navBar.innerHTML = '\
    <nav class="navbar navbar-expand-lg bg-body-tertiary">\
        <div class="container-xl">\
            <a class="navbar-brand" href="index.html">Wedding Lists</a>\
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"\
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">\
                <span class="navbar-toggler-icon"></span>\
            </button>\
            <div class="collapse navbar-collapse" id="navbarNav">\
                <ul class="navbar-nav ms-auto">\
                    <li class="nav-item">\
                        <a class="nav-link active" aria-current="page" href="index.html">Home</a>\
                    </li>\
                    <li class="nav-item">\
                        <a class="nav-link" href="#">Features</a>\
                    </li>\
                    <li class="nav-item">\
                        <a class="nav-link" href="#">About</a>\
                    </li>\
                    <li class="nav-item">\
                        <a class="nav-link disabled" href="#">Login</a>\
                    </li>\
                </ul>\
            </div>\
        </div>\
    </nav>\
';

//==============< Footer >==============
var footer = document.getElementById('footer');
footer.innerHTML = '\
    <footer>\
        <div class="container-xl">\
            <div class="row">\
                <div class="col-lg-4">\
                    <h4>About Us</h4>\
                    <ul>\
                        <li>Help</li>\
                        <li>Support</li>\
                        <li>Services</li>\
                    </ul>\
                </div>\
                <div class="col-lg-4">\
                    <h4>Contact</h4>\
                    <ul>\
                        <li>Phone: xxx</li>\
                        <li>Email: xxx</li>\
                        <li>Address: xxx</li>\
                    </ul>\
                </div>\
                <div class="col-lg-4">\
                    <img src="images/qr.jpg" alt="qr-code" width="120">\
                </div>\
            </div>\
        </div>\
    </footer>\
';

//==============< writeDataToSheet >==============
var form = document.getElementById("sheetdb-form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch(form.action, {
        method: "POST",
        body: new FormData(document.getElementById("sheetdb-form")),
    })
        .then((response) => response.json())
        .then((html) => {
            // you can put any JS code here
            location.reload();
        });
});

//==============< readDataFromeSheet >==============
let SHEET_ID = "1B16MoCQuOoD8vn2MuU2NUGPYuiNJkV-lmUyQxv99Er0";
let SHEET_TITLE = "nameSheet";
let num = "";
let SHEET_RANGE = ("A2:E" + num);
let FULL_URL = ("https://docs.google.com/spreadsheets/d/" + SHEET_ID + "/gviz/tq?sheet=" + SHEET_TITLE + "&range=" + SHEET_RANGE);
// read Data from URL
fetch(FULL_URL)
    .then(res => res.text())
    .then(rep => {
        let data = JSON.parse(rep.substr(47).slice(0, -2));
        // console.log(data);
        num = data.table.rows.length;
        let dataArray = [];
        // console.log(data.table.rows);
        data.table.rows.forEach(main => {
            main.c.forEach(ele => {
                // console.log(main.c);

                dataArray.push(ele.v);
                // console.log(ele.v);
            })
        });
        // console.log(dataArray);

        // copy Data that store by Array to output
        let cols = 5;
        let arr = [];
        dataArray.forEach((element, index) => {
            let row = Math.floor(index / cols);
            if (!arr[row]) {
                arr[row] = [];
            }
            arr[row].push(element);
        });
        console.log(arr);

        // // var myArray = [1, 2, 3, 4, 5, 6];
        // var elementsToRemove = [1];
        
        // elementsToRemove.forEach(function(element) {
        //   var index = arr.indexOf(element);
        //   if (index > -1) {
        //     arr.splice(index, 1);
        //   }
        // });
        
        // console.log(arr); // Output: [1, 3, 5]

        let elementRemoved=[0,1,3];
        var newArr = arr.filter((element, index) => {
            return elementRemoved.indexOf(index) === -1;
        })
        console.log(newArr);

        // SET DATA INTO DATABLE
        $('#dataTable').DataTable({
            data: newArr,
            columns: [
                { title: 'N0' },
                { title: 'Name' },
                { title: 'Money' },
                { title: 'Place' },
                { title: 'Other' },
            ],
        });


})

//==============< Define the clearInputFields function >==============
function clearInputFields() {
    const inputFields = document.querySelectorAll('input');
    inputFields.forEach(function (input) {
        input.value = '';
    });
}
// Add an event listener to the clear button
const clearBtn = document.querySelector('.btn-secondary');
clearBtn.addEventListener('click', function () {
    clearInputFields();
});

//==============< check on inputOther field >==============
function checkOtherfield() {
    const inputOther = document.querySelector('input[name="data[Other]"]');

    if (inputOther.value.trim() === '') {
        // If the Input Other field is empty, do nothing and let the form be submitted
        inputOther.value = " ";
        console.log("have one space");
    } else {
        // If the Input Other field is not empty, the form will be submitted normall
        console.log("have string");
    }
}
// Add an event listener to submitted the form
const frmCheck = document.querySelector('.sending');
frmCheck.addEventListener('click', function (event) {
    checkOtherfield();
});


// // //  hedle with ChatGPT

// let etable;

// $(document).ready(function() {
//   // Initialize DataTable with edit and delete buttons
//   etable = $('#dataTable').DataTable({
//     data: arr,
//     columns: [
//       { title: 'No' },
//       { title: 'Name' },
//       { title: 'Money' },
//       { title: 'Place' },
//       { title: 'Other' },
//       {
//         title: 'Actions',
//         render: function(data, type, row, meta) {
//           return `
//             <button class="btn btn-sm btn-primary edit-btn" data-row="${meta.row}">Edit</button>
//             <button class="btn btn-sm btn-danger delete-btn" data-row="${meta.row}">Delete</button>
//           `;
//         },
//       },
//     ],
//   });

//   // Handle edit button click event
//   $('#dataTable').on('click', '.edit-btn', function() {
//     const row = etable.row($(this).data('row')).data();
//     // Open a modal dialog for editing the row data
//     // You can implement your own custom modal or use a library like Bootstrap modal
//     console.log('Editing row:', row);
//   });

//   // Handle delete button click event
//   $('#dataTable').on('click', '.delete-btn', function() {
//     const row = etable.row($(this).data('row')).data();
//     // Open a modal dialog to confirm the deletion
//     // You can implement your own custom modal or use a library like Bootstrap modal
//     if (confirm(`Are you sure you want to delete the row "${row[1]}"?`)) {
//       // Remove the row from the DataTable and the data array
//       etable.row($(this).data('row')).remove().draw();
//       arr.splice($(this).data('row'), 1);
//       console.log('Deleted row:', row);
//     }
//   });
// });
// console.log(etable);