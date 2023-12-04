function doThingsWithCookies() {
  // document.cookie = 'foo=bar; SameSite=None; Secure; Partitioned;';
  document.cookie = 'foo=bar;';
}

async function handleCookieAccess() {
  if (!document.hasStorageAccess) {
    doThingsWithCookies()
  } else {
    const hasAccess = await document.hasStorageAccess();

    if (hasAccess) {
      doThingsWithCookies();
    } else {
      try {
        const permission = await navigator.permissions.query({
          name: 'storage-access',
        });

        if (permission.state === 'granted') {
          await document.requestStorageAccess();
          doThingsWithCookies();
        } else if (permission.state === 'prompt') {
          try {
            await document.requestStorageAccess();
            doThingsWithCookies()
          } catch (err) {
            console.log(`Error obtaining storage access: ${err}`);
          }
        } else if (permission.state === 'denied') {
          // nothing we can do
        }
      } catch (e) {
        console.log(`Could not access permission state. Error: ${e}`);
      }
    }
  }
}

(async () => {
  await handleCookieAccess();

  console.log('Cookies', document.cookie)
})();
