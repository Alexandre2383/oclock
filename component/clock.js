/**
 * The function `showTab` is used to display a specific tab by hiding all other tabs in a tabbed
 * interface.
 * @param tabName - The `tabName` parameter in the `showTab` function represents the name of the tab
 * that you want to display. This function is designed to hide all tabs with the class name
 * "tabContent" and then display the tab with the specified `tabName`.
 */
function showTab(tabName) {
    var i;
    var tabs = document.getElementsByClassName("tabContent");
    for (i = 0; i < tabs.length; i++) {
        tabs[i].style.display = "none";
    }
    document.getElementById(tabName).style.display = "block";
}

/**
 *********************** CLOCK *******************************************************************
 */


/**
 * The function `updateClock` displays the current time in hours, minutes, and seconds on a web page
 * and updates every second.
 */
function updateClock() {
    var now = new Date();
    var hours = now.getHours().toString().padStart(2, '0');
    var minutes = now.getMinutes().toString().padStart(2, '0');
    var seconds = now.getSeconds().toString().padStart(2, '0');
    document.getElementById("clockDisplay").textContent = hours + ":" + minutes + ":" + seconds;
    setTimeout(updateClock, 1000);
}


/**
 *********************** TIMER *******************************************************************
 */

var timerInterval;
var timerRunning = false;
var timerTime;

/**
 * The function `startTimer` takes user input for a timer in the format HH:MM:SS, converts it to
 * seconds, and starts a countdown timer that updates every second.
 */
// TODO - Error management if wrong entry from the user
function startTimer() {
    if (!timerRunning) {
        var timerInput = document.getElementById("timerInput").value;
        var timeParts = timerInput.split(":");
        var hours = parseInt(timeParts[0]);
        var minutes = parseInt(timeParts[1]);
        var seconds = parseInt(timeParts[2]);

        timerTime = (hours * 3600) + (minutes * 60) + seconds;

        timerInterval = setInterval(updateTimer, 1000);
        timerRunning = true;
    }
}

/**
 * The function `updateTimer` updates a countdown timer displayed on a webpage by decrementing the
 * timer time and formatting it into hours, minutes, and seconds.
 */
function updateTimer() {
    if (timerTime >= 0) {
        var hours = Math.floor(timerTime / 3600).toString().padStart(2, '0');
        var minutes = Math.floor((timerTime % 3600) / 60).toString().padStart(2, '0');
        var seconds = (timerTime % 60).toString().padStart(2, '0');
        document.getElementById("timerDisplay").textContent = hours + ":" + minutes + ":" + seconds;
        timerTime--;
    } else {
        alert("Time out!")
        stopTimer();
    }
}

/**
 * The function `stopTimer` clears the interval of a timer and sets a variable `timerRunning` to false.
 */
function stopTimer() {
    clearInterval(timerInterval);
    timerRunning = false;
}

/**
 *********************** CHRONOMETER *******************************************************************
 */
var stopwatchInterval;
var stopwatchRunning = false;
var stopwatchTime = 0;

/**
 * The function `startStopwatch` starts a stopwatch by setting an interval to update the stopwatch
 * every second if it is not already running.
 */
function startStopwatch() {
    if (!stopwatchRunning) {
        stopwatchInterval = setInterval(updateStopwatch, 1000);
        stopwatchRunning = true;
    }
}

/**
 * The function `updateStopwatch` increments the stopwatch time by one second and updates the displayed
 * time in the format HH:MM:SS.
 */
function updateStopwatch() {
    stopwatchTime++;
    var hours = Math.floor(stopwatchTime / 3600).toString().padStart(2, '0');
    var minutes = Math.floor((stopwatchTime % 3600) / 60).toString().padStart(2, '0');
    var seconds = (stopwatchTime % 60).toString().padStart(2, '0');
    document.getElementById("stopwatchDisplay").textContent = hours + ":" + minutes + ":" + seconds;
}

/**
 * The function `stopStopwatch` stops the stopwatch by clearing the interval and setting the
 * `stopwatchRunning` variable to false.
 */
function stopStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
}

/**
 *********************** ALARM *******************************************************************
 */

/**
 * The function `setAlarm` takes the input alarm time, calculates the time until the alarm, and sets a
 * timeout to trigger an alert when the alarm time is reached.
 */
function setAlarm() {
    var alarmTime = document.getElementById("alarmTime").value;
    var now = new Date();
    var alarmDate = new Date(now.toDateString() + " " + alarmTime);

    if (alarmDate <= now) {
        alarmDate.setDate(alarmDate.getDate() + 1);
    }

    var timeUntilAlarm = alarmDate - now;
    setTimeout(function() {
        alert("Réveil !");
    }, timeUntilAlarm);
}


updateClock(); // Start the clock in page opening
showTab("clock"); // Print the clock as default tab