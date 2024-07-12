document.addEventListener('DOMContentLoaded', function () {
  const timerH = document.getElementById('minuteurH'),
    timerM = document.getElementById('minuteurM'),
    timerS = document.getElementById('minuteurS'),
    playBtn = document.getElementById('minuteurPlay'),
    pauseBtn = document.getElementById('minuteurPause'),
    resetBtn = document.getElementById('minuteurReset'),
    hUpBtn = document.getElementById('hUp'),
    mUpBtn = document.getElementById('mUp'),
    sUpBtn = document.getElementById('sUp'),
    hDownBtn = document.getElementById('hDown'),
    mDownBtn = document.getElementById('mDown'),
    sDownBtn = document.getElementById('sDown'),
    finalDisplay = document.getElementById('minuteurFinal')

  const stopAlarmBtn = document.createElement('button') // Create the stop button
  stopAlarmBtn.id = 'stopAlarmBtn'
  stopAlarmBtn.textContent = 'Stop Alarm'
  stopAlarmBtn.classList.add('hidden') // Hide button initially
  document.body.appendChild(stopAlarmBtn) // Append stop button to the body

  let timer,
    isRunning = false,
    totalSeconds = 0,
    ringtone = new Audio('./assets/fontAudio/ringtone.mp3'),
    alarmTimeout,
    alarmInterval

  function updateDisplay() {
    const hours = Math.floor(totalSeconds / 3600),
      minutes = Math.floor((totalSeconds % 3600) / 60),
      seconds = totalSeconds % 60

    timerH.value = String(hours).padStart(2, '0')
    timerM.value = String(minutes).padStart(2, '0')
    timerS.value = String(seconds).padStart(2, '0')
  }

  function startTimer() {
    if (isRunning) return
    isRunning = true
    timer = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds--
        updateDisplay()
      } else {
        clearInterval(timer)
        isRunning = false
        playAlarm()
      }
    }, 1000)
  }

  function playAlarm() {
    ringtone.play()
    stopAlarmBtn.classList.remove('hidden')

    alarmInterval = setInterval(() => {
      ringtone.play()
    }, 2000)

    alarmTimeout = setTimeout(stopAlarm, 3000)
  }

  function stopAlarm() {
    clearInterval(alarmInterval)
    clearTimeout(alarmTimeout)
    ringtone.pause()
    ringtone.currentTime = 0 // Reset the audio to the beginning

    stopAlarmBtn.classList.add('hidden')
  }

  function pauseTimer() {
    clearInterval(timer)
    isRunning = false
  }

  function resetTimer() {
    clearInterval(timer)
    isRunning = false
    totalSeconds = 0
    updateDisplay()
    finalDisplay.textContent = ''
    stopAlarm() // Stop any ongoing alarm
  }

  function adjustTime(unit, amount) {
    if (isRunning) return
    if (unit === 'hours') {
      const newHours = parseInt(timerH.value) + amount
      if (newHours >= 0 && newHours <= 24) {
        totalSeconds += amount * 3600
      }
    } else if (unit === 'minutes') {
      const newMinutes = parseInt(timerM.value) + amount
      if (newMinutes >= 0 && newMinutes < 60) {
        totalSeconds += amount * 60
      }
    } else if (unit === 'seconds') {
      const newSeconds = parseInt(timerS.value) + amount
      if (newSeconds >= 0 && newSeconds < 60) {
        totalSeconds += amount
      }
    }
    updateDisplay()
  }

  playBtn.addEventListener('click', startTimer)
  pauseBtn.addEventListener('click', pauseTimer)
  resetBtn.addEventListener('click', resetTimer)
  hUpBtn.addEventListener('click', () => adjustTime('hours', 1))
  mUpBtn.addEventListener('click', () => adjustTime('minutes', 1))
  sUpBtn.addEventListener('click', () => adjustTime('seconds', 1))
  hDownBtn.addEventListener('click', () => adjustTime('hours', -1))
  mDownBtn.addEventListener('click', () => adjustTime('minutes', -1))
  sDownBtn.addEventListener('click', () => adjustTime('seconds', -1))
  stopAlarmBtn.addEventListener('click', stopAlarm)
})
