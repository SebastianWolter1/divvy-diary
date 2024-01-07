self.addEventListener("push", (event) => {
  const data = event.data;
  const pushMessage = data.json();

  const showNotification = async () => {
    try {
      await self.registration.showNotification(pushMessage.title, {
        body: pushMessage.body,
        badge: "/badge.png",
        icon: "/divvy.png",
      });
    } catch (err) {
      console.log(err);
    }
  };

  event.waitUntil(showNotification());
});
