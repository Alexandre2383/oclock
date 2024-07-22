document.addEventListener('DOMContentLoaded', function () {
  const showClockButton = document.getElementById('showClock'),
    showTimerButton = document.getElementById('showTimer'),
    showChronoButton = document.getElementById('showChrono'),
    showAlarmButton = document.getElementById('showAlarm'),
    clockSection = document.getElementById('clockSection'),
    timerSection = document.getElementById('timerSection'),
    chronoSection = document.getElementById('chronoSection'),
    alarmSection = document.getElementById('alarmSection'),
    getWeatherButton = document.getElementById('searchButton')

  showClockButton.addEventListener('click', function () {
    clockSection.classList.remove('hidden')
    timerSection.classList.add('hidden')
    chronoSection.classList.add('hidden')
    alarmSection.classList.add('hidden')
  })

  showTimerButton.addEventListener('click', function () {
    clockSection.classList.add('hidden')
    timerSection.classList.remove('hidden')
    chronoSection.classList.add('hidden')
    alarmSection.classList.add('hidden')
  })

  showChronoButton.addEventListener('click', function () {
    clockSection.classList.add('hidden')
    timerSection.classList.add('hidden')
    chronoSection.classList.remove('hidden')
    alarmSection.classList.add('hidden')
  })

  showAlarmButton.addEventListener('click', function () {
    clockSection.classList.add('hidden')
    timerSection.classList.add('hidden')
    chronoSection.classList.add('hidden')
    alarmSection.classList.remove('hidden')
  })
})
