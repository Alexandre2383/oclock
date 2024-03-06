<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>O'Clock PWA</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="description" content="A clock application with chronometer, timer and alarm.">
    <meta name="author" content="Alexandre">
    <meta name="theme-color" content="#241a91"><!-- shadowblue -->
    <meta property="og:image" content="./img/clock800.svg">
    <link rel="shortcut icon" href="./img/clock800.svg">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="./oclock.webmanifest">
    <link rel="stylesheet" href="./sw.js">
    <script src="component/clock.js" defer></script>
    <script src="app.js" defer></script>
</head>
<body>
    <button id="notifications">Request dummy notifications</button>
    <div class="tabs">
        <button id="clockTab" onclick="showTab('clock')">Horloge</button>
        <button id="timerTab" onclick="showTab('timer')">Timer</button>
        <button id="stopwatchTab" onclick="showTab('stopwatch')">Chronomètre</button>
        <button id="alarmTab" onclick="showTab('alarm')">Réveil</button>
    </div>

    <div id="clock" class="tabContent">
        <h2>Horloge</h2>
        <div id="clockDisplay"></div>
    </div>

    <div id="timer" class="tabContent">
        <h2>Timer</h2>
        <input type="text" id="timerInput" placeholder="hh:mm:ss">
        <button onclick="startTimer()">Démarrer</button>
        <button onclick="stopTimer()">Arrêter</button>
        <div id="timerDisplay"></div>
    </div>

    <div id="stopwatch" class="tabContent">
        <h2>Chronomètre</h2>
        <button onclick="startStopwatch()">Démarrer</button>
        <button onclick="stopStopwatch()">Arrêter</button>
        <div id="stopwatchDisplay"></div>
    </div>

    <div id="alarm" class="tabContent">
        <h2>Réveil</h2>
        <input type="time" id="alarmTime">
        <button onclick="setAlarm()">Définir</button>
    </div>

    <script src="app.js"></script>
    <script src="./component/clock.js"></script>
</body>
</html>
