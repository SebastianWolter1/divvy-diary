self.addEventListener("push", (event) => {
  console.log(self.Notification.permission);
  const data = event.data;
  const pushMessage = data.json();
  console.log("Pushed:", pushMessage);

  const showNotification = () => {
    try {
      console.log("Showing notification");
      self.registration.showNotification(pushMessage.title, {
        body: pushMessage.body,
      });
      console.log("Notification shown");
    } catch (err) {
      console.log(err);
    }
  };

  event.waitUntil(showNotification());
});
