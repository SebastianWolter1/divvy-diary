// self.addEventListener("push", (event) =>{
//   console.log("Push received");
//   console.log("Push ", event.data.json());

// const message = event.data?.json();
//  const {title, body} = message;

//  async function handlePushEvent () {
//   try {
//     await self.registration.showNotification(title, {body});
//     console.log("Push Shown");
//   } catch (error) {
//     console.error('Error showing notification:', error);
//   }
// }
// event.waitUntil(handlePushEvent())
// });

// force-dynamic - server actions // 

self.addEventListener('push', (event) => {
  console.log(self.Notification.permission);
  const data = event.data;
  const pushMessage = data.json();
  console.log('Pushed:', pushMessage);

  const showNotification = async () => {
    try {
      console.log('Showing notification');
      await self.registration.showNotification(pushMessage.title, {
        body: pushMessage.body,
        badge: '/divvy.png',
        icon: '/divvy.png',
      });
      console.log('Notification shown');
    } catch (err) {
      console.log(err);
    }
  };

  event.waitUntil(showNotification());
});