self.addEventListener("push", (event) => {
  console.log(self.Notification.permission);
  const data = event.data;
  const pushMessage = data.json();
  console.log("Pushed:", pushMessage);

  const showNotification = async () => {
    try {
      console.log("Showing notification");
      await self.registration.showNotification(pushMessage.title, {
        body: pushMessage.body,
        badge: "/badge.png",
        icon: "/divvy.png",
      });
      console.log("Notification shown");
    } catch (err) {
      console.log(err);
    }
  };

  event.waitUntil(showNotification());
});
