#angular-chromecast-receiver

###Example app:

```js
angular.module('myApp', ['angular-chromecast'])

// configure the module's channels and logging levels
.config(['angularChromecast', function (angularChromecast) {
  angularChromecast.setChannels([
    {namespace: 'com.channel.namespace.one', type: 'JSON'},
    {namespace: 'com.channel.namespace.two', type: 'STRING'},
    {namespace: 'com.channel.namespace.three', type: 'CUSTOM'}
  ]);
  angularChromecast.setLoggingLevel('VERBOSE');
}])

// listen for events from the chromecast
.run(['$rootScope', function ($rootScope) {
  $rootScope.$on('chromecast.ready', function () {
    // chromecast is ready and connected
  });

  $rootScope.$on('chromecast.senderConnected', function (event, sender) {
    // sender connected
  });

  $rootScope.$on('chromecast.messageReceived', function (event, message) {
    // message from a sender
  });
}])

```
