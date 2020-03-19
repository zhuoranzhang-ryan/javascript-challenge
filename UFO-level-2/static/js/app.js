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
};

// Initalize the webpage with the entire table data.
tableData.forEach(makeTable);

// Define the getInput function, which store the user input into a array[5].
// for example, if user input is "1/11/2010", "us", "lighting", it returns
// ["1/11/2010", "", "", "us", "lighting"]
function getInput() {
    var dataInput = [];
    var form = d3.selectAll(".form-control");
    
    form.each(function() {
        var item = d3.select(this).property("value");
        dataInput.push(item);
    })
    return dataInput;
}

// Define the filterAll function to compare search criteria with data
// Returns true if everything matches up well.
function filterAll(item) {
    
    //Store the first 5 values of a data entry in dataTrue.
    var dataTrue = Object.values(item);
    dataTrue = dataTrue.slice(0,5);
    
    //Loop through dataInput and dataTrue, compare value at the same index.
    //Return false if there is an input but does not match the dataset.
    //Otherwise, do nothing until the for loop ends and return true.
    for (i=0; i<5; i++) {
        if (dataInput[i] === '' || dataInput[i] === dataTrue[i]) {
        }
        else {
            return false;
        }
    }
    return true;
}
 
// Define the function to update table based on filtered data.
function updateTable() {
    
    // Prevent default refresh.
    d3.event.preventDefault();
    
    // Select the form and get its value
    dataInput = getInput();
    
    // Filter the dataset using the filterAll function.
    newData = tableData.filter(filterAll);
    
    // Clear the content before each update.
    tbody.html("");
    
    // Handle invalid input:
    // If nothing is entered, display full data;
    // If no data at the input date, display a message;
    // If date is valid, use makeTable to display filtered data.
    if (dataInput === '') {
        tableData.forEach(makeTable);
    } 
    else if (newData.length == 0) {
        tbody.append("h3").text("No data matching your search!");
    }
    else {
        newData.forEach(makeTable);
    }
};

// Listening to the button click.
button.on("click", updateTable);