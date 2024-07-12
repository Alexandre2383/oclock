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
      seconds = Math.floor((time % 60000) / 1000),
      milliseconds = Math.floor((time % 1000) / 10)

    return {
      formattedTime: `${String(hours).padStart(2, '0')}:${String(
        minutes
      ).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`,
      milliseconds: String(milliseconds).padStart(2, '0'),
    }
  }

  function updateDisplay() {
    const { formattedTime, milliseconds } = formatTime(elapsedTime)
    chronoDisplay.innerHTML = `${formattedTime}<span class="millisecondes">${milliseconds}</span>`
  }

  function startChrono() {
    if (running) return
    running = true
    startTime = Date.now() - elapsedTime
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime
      updateDisplay()
    }, 10) // Update every 10 milliseconds for smoother display
  }

  function resetChrono() {
    clearInterval(timerInterval)
    running = false
    startTime = null
    elapsedTime = 0
    chronoDisplay.innerHTML = '00:00:00<span class="millisecondes">.00</span>'
    chronoSave.innerHTML = ''
  }

  function recordLap() {
    if (!running) return
    const { formattedTime, milliseconds } = formatTime(elapsedTime)
    const lapElement = document.createElement('div')
    lapElement.innerHTML = `${formattedTime}<span class="millisecondes">${milliseconds}</span>`
    chronoSave.prepend(lapElement) // Add the new lap at the beginning
  }

  playBtn.addEventListener('click', startChrono)
  resetBtn.addEventListener('click', resetChrono)
  lapBtn.addEventListener('click', recordLap)
})
