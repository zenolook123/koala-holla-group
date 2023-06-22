console.log("js");

$(document).ready(function () {
  console.log("JQ");
  // Establish Click Listeners
  // load existing koalas on page load
  $("#addButton").on("click", postKoala)
  $("#viewKoalas").on("click",'.transfer-button', koalaTransfer)
  $("#viewKoalas").on("click",'.delete-button', killKoala)
  getKoalas()
}); // end doc ready

function koalaTransfer() {
  let idToUpdate = ($(this).parent().parent().data('id'))
  $.ajax({
    type: "PUT",
    url: `/koalas/${idToUpdate}`,
  })
    .then((response) => {
      console.log("Koala ready to transfer is set to true", response);
      getKoalas()
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
  $.ajax({
    method: "POST",
    url: "/koalas",
    data: KoalaObject,
  }).then((response) => {
    console.log("Response from server.", response);
      $("#nameIn").val(""),
      $("#ageIn").val(""),
      $("#genderIn").val(""),
      $("#readyForTransferIn").val("");
      $('#notesIn').val("");
    getKoalas();
  }).catch((error) => {
    console.log("Error in POST", error);
      alert("Unable to add koala at this time.");
  })
}

// DELETE method to 'remove' koala
function killKoala(){
  let koalaID = ($(this).parent().parent().data('id'))

  $.ajax({
    method:'delete',
    url: `/koalas/${koalaID}`
  }).then((response) => {
    console.log("deleted koala", response)
    getKoalas()
  }).catch((error) => {
    console.log("error in delete ajax", error)
  })
}

// Function to render koala database to DOM
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
