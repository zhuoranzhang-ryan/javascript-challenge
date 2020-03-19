// from data.js
var tableData = data;

// selecting tbody and button via d3.js
var tbody = d3.select('tbody');
var button = d3.select('#filter-btn');

// Define a function to display all the UFO data.
function makeTable(item) {
    // Making a new row within tbody.
    var row = tbody.append("tr");
    
    // Appedning each and every data within a row.
    row.append("td").text(item.datetime);
    row.append("td").text(item.city);
    row.append("td").text(item.state);
    row.append("td").text(item.country);
    row.append("td").text(item.shape);
    row.append("td").text(item.durationMinutes);
    row.append("td").text(item.comments); 
}

// Initalize the whole table on the webpage.
tableData.forEach(makeTable);

// Define the function to update table based on filtered data.
function updateTable() {
    
    // Prevent default refresh.
    d3.event.preventDefault();
    
    // Select the form and get its value
    var form = d3.select(".form-control");
    var dateInput = form.property("value");
    
    // Define the function to filter date, returns true or false.
    function filterDate(item) {
        return item.datetime === dateInput;
    }
    
    // Filter the dataset using the filterDate function.
    newData = tableData.filter(filterDate);
    
    // Clear the content before each update.
    tbody.html("");
    
    // Handle invalid input:
    // If nothing is entered, display full data;
    // If no data at the input date, display a message;
    // If date is valid, use makeTable to display filtered data.
    if (dateInput === '') {
        tableData.forEach(makeTable);
    } 
    else if (newData.length == 0) {
        tbody.append("h3").text("No data on this date!");
    }
    else {
        newData.forEach(makeTable);
    }
}

// Listening to the button click.
button.on("click", updateTable);