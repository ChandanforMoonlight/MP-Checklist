/* MP Checklist Web Push service worker: GitHub Pages scope */
self.addEventListener('push',event=>{
 let data={title:'MP Checklist',body:'Please review your pending tasks.',url:'./'};
 try{if(event.data)data={...data,...event.data.json()};}catch(e){}
 const url=new URL(data.url||'./',self.registration.scope).href;
 event.waitUntil(self.registration.showNotification(String(data.title||'MP Checklist'),{
  body:String(data.body||'Please review your pending tasks.'),
  tag:'mp-checklist-tasks',renotify:true,data:{url}
 }));
});
self.addEventListener('notificationclick',event=>{
 event.notification.close();
 const target=event.notification.data?.url||self.registration.scope;
 event.waitUntil((async()=>{
 const tabs=await self.clients.matchAll({type:'window',includeUncontrolled:true});
 for(const tab of tabs){if(tab.url.startsWith(self.registration.scope)){await tab.focus();return;}}
 await self.clients.openWindow(target);
 })());
});
