document.addEventListener('DOMContentLoaded', function () {
  let heures = 0
  let minutes = 0
  let secondes = 0

  document.getElementById('minuteurReset').style.display = 'none'
  document.getElementById('minuteurPause').style.display = 'none'
  document.getElementById('minuteurFinal').style.display = 'none'

  function formatNumber(t) {
    return t < 10 ? '0' + t : t
  }

  /*** Les Flèches pour modifier le temps ***/

  /*** Gestion des heures */
  document.getElementById('hUp').addEventListener('click', function () {
    if (heures < 24) {
      heures++
      heures = formatNumber(heures)
    } else {
      heures = 0
    }
    document.getElementById('minuteurH').value = heures
  })

  document.getElementById('hDown').addEventListener('click', function () {
    if (heures > 0) {
      heures--
      heures = formatNumber(heures)
    } else {
      heures = 24
    }
    document.getElementById('minuteurH').value = heures
  })

  /*** Gestion des minutes */
  document.getElementById('mUp').addEventListener('click', function () {
    if (minutes < 59) {
      minutes++
      minutes = formatNumber(minutes)
    } else {
      minutes = 0
    }
    document.getElementById('minuteurM').value = minutes
  })

  document.getElementById('mDown').addEventListener('click', function () {
    if (minutes > 0) {
      minutes--
      minutes = formatNumber(minutes)
    } else {
      minutes = 59
    }
    document.getElementById('minuteurM').value = minutes
  })

  /*** Gestion des secondes */
  document.getElementById('sUp').addEventListener('click', function () {
    if (secondes < 59) {
      secondes++
      secondes = formatNumber(secondes)
    } else {
      secondes = 0
    }
    document.getElementById('minuteurS').value = secondes
  })

  document.getElementById('sDown').addEventListener('click', function () {
    if (secondes > 0) {
      secondes--
      secondes = formatNumber(secondes)
    } else {
      secondes = 59
    }
    document.getElementById('minuteurS').value = secondes
  })

  /*** Les boutons Play / Pause / Reset ***/

  /*** Gestion de play */
  document
    .getElementById('minuteurPlay')
    .addEventListener('click', function () {
      this.style.display = 'none'
      document.querySelector('.minuteurGrid').style.display = 'none'
      document.getElementById('minuteurFinal').style.display = 'block'
      document.getElementById('minuteurReset').style.display = 'block'
      document.getElementById('minuteurPause').style.display = 'block'
      play = 1
    })

  /*** Gestion de Pause */
  document
    .getElementById('minuteurPause')
    .addEventListener('click', function () {
      this.style.display = 'none'
      document.getElementById('minuteurPlay').style.display = 'block'
      play = 2
    })

  /*** Gestion de Reset */
  document
    .getElementById('minuteurReset')
    .addEventListener('click', function () {
      this.style.display = 'none'
      document.getElementById('minuteurPause').style.display = 'none'
      document.getElementById('minuteurPlay').style.display = 'block'
      document.querySelector('.minuteurGrid').style.display = 'block'
      document.getElementById('minuteurFinal').style.display = 'none'
      play = 0
      heures = 0
      minutes = 0
      secondes = 0
      document.getElementById('minuteurH').value = 0
      document.getElementById('minuteurM').value = 0
      document.getElementById('minuteurS').value = 0
    })

  /*** Compte à rebours ***/

  let chrono = document.getElementById('minuteurFinal')
  let resetBtn = document.getElementById('minuteurReset')
  let stopBtn = document.getElementById('minuteurPause')
  let startBtn = document.getElementById('minuteurPlay')

  let timeout

  let estArrete = true

  const demarrer = () => {
    if (estArrete) {
      estArrete = false
      defilerTemps()
    }
  }

  const arreter = () => {
    if (!estArrete) {
      estArrete = true
      clearTimeout(timeout)
    }
  }

  const defilerTemps = () => {
    if (estArrete) return

    secondes = parseInt(secondes)
    minutes = parseInt(minutes)
    heures = parseInt(heures)

    if (secondes == -1 && minutes >= 0) {
      minutes--
      secondes = 59
    }

    if (minutes == -1 && heures > 0) {
      heures--
      minutes = 59
    }

    // Affichage
    secondes = formatNumber(secondes)
    minutes = formatNumber(minutes)
    heures = formatNumber(heures)

    chrono.textContent = `${heures}:${minutes}:${secondes}`

    secondes--
    if (heures == 0 && minutes == 0 && secondes == -1) {
      alert('BIP BIP BIP')
      resetBtn.style.display = 'none'
      stopBtn.style.display = 'none'
      startBtn.style.display = 'block'
      document.querySelector('.minuteurGrid').style.display = 'block'
      document.getElementById('minuteurFinal').style.display = 'none'
      play = 0
      heures = 0
      minutes = 0
      secondes = 0
      document.getElementById('minuteurH').value = '00'
      document.getElementById('minuteurM').value = '00'
      document.getElementById('minuteurS').value = '00'
      reset()
      return
    }

    timeout = setTimeout(defilerTemps, 1000)
  }

  const reset = () => {
    chrono.textContent = '00:00:00'
    estArrete = true
    heures = 0
    minutes = 0
    secondes = 0
    clearTimeout(timeout)
  }

  startBtn.addEventListener('click', demarrer)
  stopBtn.addEventListener('click', arreter)
  resetBtn.addEventListener('click', reset)
})
