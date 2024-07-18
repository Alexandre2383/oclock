/**
 * The function `updateClock` displays the current time in hours, minutes, and seconds on a web page
 * and updates every second.
 */
function updateClock() {
  // Instance of Date object
  var now = new Date(),
    // Get the actual hour and convert it to String, adding 0 to keeping the time format
    hours = now.getHours().toString().padStart(2, '0'),
    minutes = now.getMinutes().toString().padStart(2, '0'),
    seconds = now.getSeconds().toString().padStart(2, '0')

  // Get the paragrah with the id 'ClockDisplay and writte is content with the actual Time
  document.getElementById('clockDisplay').textContent =
    hours + ':' + minutes + ':' + seconds

  // Each 1 second, execute the updateClock function
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
