# angular-chromecast

This project provides an interface to the chome cast sdk with angular. This is still in active development, still on the roadmap:

- [x] Channel/messaging integration
- [ ] Media integration
- [ ] Tests

## To Install:

```shell
> bower install angular-chromecast --save
```

And then include the dist file
```html
<script type="text/javascript" src="bower_components/dist/angular-chromecast.min.js"></script>
```

## Example Usage:

```js
angular.module('myApp', ['ngChromecast'])

// configure the module's channels and logging levels
.config(['ngChromecastProvider', function (ngChromecastProvider) {
  ngChromecastProvider.setChannels([
    {namespace: 'com.channel.namespace.one', type: 'JSON'},
    {namespace: 'com.channel.namespace.two', type: 'STRING'},
    {namespace: 'com.channel.namespace.three', type: 'CUSTOM'}
  ]);
  ngChromecastProvider.setLoggingLevel('VERBOSE');
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

## Contributing

Although this is in very early stages of devleopment, contributions are always welcome. Please open an issue or submit a pull request with any issues.
