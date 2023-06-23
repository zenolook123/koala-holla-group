const { default: swal } = require("sweetalert");

console.log("js");

$(document).ready(function () {
  console.log("JQ");
  // Establish Click Listeners
  // load existing koalas on page load
  $("#addButton").on("click", postKoala);
  $("#viewKoalas").on("click", ".transfer-button", koalaTransfer);
  $("#viewKoalas").on("click", ".delete-button", killKoala);
  $('.dropdown-item').on("click", orderKoala)
  getKoalas();
}); // end doc ready

function orderKoala() {
  $.ajax({
    type: "GET",
    url: `/koalas/order${$(this).attr('id')}`,
  })
    .then((response) => {
      renderKoalas(response);
    })
    .catch((error) => {
      console.log("error in get client", error);
    });
}


function koalaTransfer() {
  let idToUpdate = $(this).parent().parent().data("id");
  $.ajax({
    type: "PUT",
    url: `/koalas/${idToUpdate}`,
  })
    .then((response) => {
      console.log("Koala ready to transfer is set to true", response);
      getKoalas();
    })
    .catch((error) => {
      console.log("Error in koala transfer", error);
    });
}

// GET request to put all koalas from database onto DOM
function getKoalas() {
  console.log("in getKoalas");
  // ajax call to server to get koalas
  $.ajax({
    type: "GET",
    url: "/koalas",
  })
    .then((response) => {
      renderKoalas(response);
    })
    .catch((error) => {
      console.log("error in get client", error);
    });
} // end getKoalas

// POST request to add a koala to database
function postKoala() {
  let KoalaObject = {
    name: $("#nameIn").val(),
    age: $("#ageIn").val(),
    gender: $("#genderIn").val(),
    transfer: $("#readyForTransferIn").val(),
    note: $("#notesIn").val(),
  };
  // need to change add button event listener/statement that when you click cancel button warning
  // the action of adding does not happen. right now adding will happen regardless if cancel button is clicked. 
  $.getScript("https://cdn.jsdelivr.net/npm/sweetalert2@11", function () {
    swal
      .fire({
        title: "Do you want to add the koala to the conservatory?",
        text: "Yes, I want to save the koalas!",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#C64EB2",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        cancelButtonText: "No, cancel PLEASE!",
      })
      .then((result) => {
        if (result.isConfirmed) {
      
          Swal.fire("Confirmed!", "You agreed to help the koalas", "success");
        } else {
          swal.fire("action cancelled");
        }
      });
  });

  $.ajax({
    method: "POST",
    url: "/koalas",
    data: KoalaObject,
  })
    .then((response) => {
      console.log("Response from server.", response);
      $("#nameIn").val(""),
        $("#ageIn").val(""),
        $("#genderIn").val(""),
        $("#readyForTransferIn").val("");
      $("#notesIn").val("");
      getKoalas();
    })
    .catch((error) => {
      console.log("Error in POST", error);
      alert("Unable to add koala at this time.");
    });
}

// DELETE method to 'remove' koala
function killKoala() {
  let koalaID = $(this).parent().parent().data("id");

  // need to change delete button event listener/statement that when you click cancel button warning
  // the action of removing does not happen. right now delete will happen when delete button is clicked
  $.getScript("https://cdn.jsdelivr.net/npm/sweetalert2@11", function () {
    swal
      .fire({
        title: "Are you sure you want to EXTERMINATE the koala?",
        text: "You will not be able to reverse this action!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, EXTERMINATE the koala!",
        cancelButtonText: "No, cancel PLEASE!",
      })
      .then((result) => {
        if (result.isConfirmed) {
          koalaDelete()
          swal.fire("Succeed!", "Your poor koala has been EXTERMINATE 🥲");
        } else {
          swal.fire("Cancelled", "Your koala is safe 😀");
        }
      });
  });

function koalaDelete(){
  $.ajax({
    method: "delete",
    url: `/koalas/${koalaID}`,
  })
    .then((response) => {
      console.log("deleted koala", response);
      getKoalas();
    })
    .catch((error) => {
      console.log("error in delete ajax", error);
    });
}
}

function renderKoalas(koalas) {
  $("#viewKoalas").empty();

  for (let i = 0; i < koalas.length; i += 1) {
    let koala = koalas[i];
    let newRow = $(`
    <tr data-id = ${koala.id}>
    <td>${koala.name}</td>
    <td>${koala.age}</td>
    <td>${koala.gender}</td>
    <td>${koala.transfer}</td>
    <td>${koala.note}</td>
    <td><button class = "transfer-button">Ready to transfer!</button></td>
    <td><button class = "delete-button">Delete</button></td>
    </tr>

    `);

    $("#viewKoalas").append(newRow);
  }
}


