document.addEventListener('DOMContentLoaded', function () {
  const chronoDisplay = document.getElementById('chronometreGeneral'),
    chronoSave = document.getElementById('chronometreSave'),
    resetBtn = document.getElementById('chronometreReset'),
    lapBtn = document.getElementById('chronometreTours'),
    playBtn = document.getElementById('chronometrePlay')

  let startTime,
    elapsedTime = 0,
    timerInterval,
    running = false

  function formatTime(time) {
    const hours = Math.floor(time / 3600000),
      minutes = Math.floor((time % 3600000) / 60000),
      seconds = Math.floor((time % 60000) / 1000)

    return `${String(hours).padStart(
      2,
      '0'
    )}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }

  function startChrono() {
    if (running) return
    running = true
    startTime = Date.now() - elapsedTime
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime
      chronoDisplay.textContent = formatTime(elapsedTime)
    }, 1000)
  }

  function resetChrono() {
    clearInterval(timerInterval)
    running = false
    startTime = null
    elapsedTime = 0
    chronoDisplay.textContent = '00:00:00'
    chronoSave.innerHTML = ''
  }

  function recordLap() {
    if (!running) return
    const lapTime = formatTime(elapsedTime)
    const lapElement = document.createElement('div')
    lapElement.textContent = lapTime
    chronoSave.prepend(lapElement) // Add the new lap at the beginning
  }

  playBtn.addEventListener('click', startChrono)
  resetBtn.addEventListener('click', resetChrono)
  lapBtn.addEventListener('click', recordLap)
})
