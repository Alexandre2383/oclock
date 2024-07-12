/**
 * The function `updateClock` displays the current time in hours, minutes, and seconds on a web page
 * and updates every second.
 */
function updateClock() {
  var now = new Date(),
    hours = now.getHours().toString().padStart(2, '0'),
    minutes = now.getMinutes().toString().padStart(2, '0'),
    seconds = now.getSeconds().toString().padStart(2, '0')
  document.getElementById('clockDisplay').textContent =
    hours + ':' + minutes + ':' + seconds
  setTimeout(updateClock, 1000)
}

//Notification permission
function permissionNotification() {
  Notification.requestPermission().then((result) => {
    if (result === 'granted') {
      printNotification()
    }
  })
}

//Notfication construct
function printNotification() {
  console.log('Notification granted')
  const notifTitle = `Alarm`
  const notifBody = `Created by Alex.`
  const notifImg = `img/clock800.svg`
  const options = {
    body: notifBody,
    icon: notifImg,
  }
  new Notification(notifTitle, options)
}

updateClock() // Start the clock in page opening
