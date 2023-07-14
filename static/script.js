var interval;

const updateDisplay = (id) => {
  var url = "/api/stations/" + id;
  $("#stationName").append(`<i>azuriranje u toku...</i> <br>`);
  $.ajax({
    url: url,
    type: "GET",
    success: function (response) {
      var date = new Date();
      response.reverse();

      $("#stationName")
        .html(`<b>${response[0].station_name.toLowerCase()}</b> <br>
                <i> azurirano: ${date
                  .toLocaleTimeString()
                  .toLowerCase()} </i> <br>`);
      const tableData = response
        .map((value) => {
          if (value.just_coordinates === "1")
            return `<h4> nema buseva mrs peske!</h4>`;

          return `<tr>
                        <td>${value.line_number.toLowerCase()}</td>
                        <td>${Math.floor(value.seconds_left / 60)}:${
            value.seconds_left % 60
          }</td>
                        <td>${value.stations_between}</td>
                        <td>${value.vehicles[0].station_name}</td>
                        <td>${value.vehicles[0].garageNo}</td>
                    </tr>`;
        })
        .join("");
      $("#tableBody").html(tableData);
    },
    error: function (error) {
      console.error("Error sending request:", error);
      // Handle error here
    },
  });
};

$(document).ready(function () {
  $("#myForm").submit(function (event) {
    event.preventDefault(); // Prevent form from being submitted

    var id = encodeURIComponent($("#idInput").val());

    updateDisplay(id);
    clearInterval(interval);
    interval = setInterval(() => {
      updateDisplay(id);
    }, 10 * 1000);
  });
});
