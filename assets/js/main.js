document.addEventListener('DOMContentLoaded', function () {
  const showClockButton = document.getElementById('showClock')
  const showTimerButton = document.getElementById('showTimer')
  const showChronoButton = document.getElementById('showChrono')
  const showAlarmButton = document.getElementById('showAlarm')
  const clockSection = document.getElementById('clockSection')
  const timerSection = document.getElementById('timerSection')
  const chronoSection = document.getElementById('chronoSection')
  const alarmSection = document.getElementById('alarmSection')

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
