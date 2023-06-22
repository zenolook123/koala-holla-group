console.log("js");

$(document).ready(function () {
  console.log("JQ");
  // Establish Click Listeners
  setupClickListeners();
  // load existing koalas on page load
  getKoalas();
}); // end doc ready

function setupClickListeners() {
  $("#addButton").on("click", function () {
    console.log("in addButton on click");
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    let koalaToSend = {
      name: "testName",
      age: "testName",
      gender: "testName",
      readyForTransfer: "testName",
      notes: "testName",
    };
    // call saveKoala with the new object
    saveKoala(koalaToSend);
  });
}

function koalaTransfer() {
  $.ajax({
    type: "PUT",
    url: "/koalas",
  })
    .then((response) => {
      console.log("Response is", response);
    })
    .catch((error) => {
      console.log("Error in koala transfer", error);
    });
}

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

// POST
function postKoala() {
  let KoalaObject = {
    name: $("#nameIn").val(),
    age: $("#ageIn").val(),
    gender: $("#genderIn").val(),
    transfer: $("#readyForTransferIn").val(),
    note: $("#noteIn").val,
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
      $('#noteIn').val("");
    getKoalas();
  }).catch((error) => {
    console.log("Error in POST", error);
      alert("Unable to add koala at this time.");
  })
}

function saveKoala(newKoala) {
  console.log("in saveKoala", newKoala);
  // ajax call to server to get koalas
}

function renderKoalas(koalas) {
  $("#viewKoalas").empty();

  for (let i = 0; i < koalas.length; i += 1) {
    let koala = koalas[i];
    let newRow = $(`
    <tr data-id = "$1">
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
