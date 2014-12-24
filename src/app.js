(function () {

  angular.module('ngChromecast', [])
  .run(['$rootScope', 'ReceiverManager', 'MessageBus', function ($rootScope, ReceiverManager, MessageBus) {

    ReceiverManager.start().then(function () {
      return MessageBus.initialize();
    }).then(function () {
      $rootScope.$broadcast('chromecast.ready', true);
    });
  }]);

}).call(this);
