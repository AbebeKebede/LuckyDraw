// Initialize Firebase Database
var database = firebase.database();

// Function to purchase a ticket
function purchaseTicket() {
    // Generate a unique ticket number (for simplicity, using a timestamp)
    var ticketNumber = Date.now();

    // Save the ticket number to the database
    database.ref('tickets/' + ticketNumber).set({
        purchasedBy: 'User123', // Replace with actual user information
        purchaseTime: new Date().toString()
    });

    alert('Ticket purchased successfully! Your ticket number is: '+ ticketNumber);
}

// Function to display draw results
function displayDrawResults(results) {
    var drawResultsDiv = document.getElementById('drawResults');
    drawResultsDiv.innerHTML = '<h3>Draw Results:</h3>';
    
    // Display each result
    results.forEach(result => {
        drawResultsDiv.innerHTML += '<p>' + result + '</p>';
    });
}

// Simulate a daily draw
function simulateDailyDraw() {
    var drawResults = [];

    // Retrieve ticket numbers from the database (for simplicity, getting the last 5 tickets)
    database.ref('tickets').limitToLast(5).once('value').then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var ticketNumber = childSnapshot.key;
            drawResults.push('Ticket #' + ticketNumber + ' wins!');
        });

        // Display the draw results
        displayDrawResults(drawResults);
    });
}

// Simulate a daily draw every 24 hours (for simplicity, using setTimeout)
setInterval(simulateDailyDraw, 1 * 60 *  60 * 1000);