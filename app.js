if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js");
}


//Notification permission
const button = document.getElementById("notifications");
button.addEventListener("click", () => {
  Notification.requestPermission().then((result) => {
    if (result === "granted") {
      randomNotification();
    }
  });
});


function randomNotification() {
  console.log("Notification granted")
  // const randomItem = Math.floor(Math.random() * games.length);
  const notifTitle = `Alarm`;
  const notifBody = `Created by Alex.`;
  const notifImg = `img/clock800.svg`;
  const options = {
    body: notifBody,
    icon: notifImg,
  };
  new Notification(notifTitle, options);
};
