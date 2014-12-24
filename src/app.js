(function () {

  angular.module('angular-chromecast', [])
  .run(function ($rootScope, ReceiverManager, MessageBus) {

    ReceiverManager.initialize().then(function () {
      return MessageBus.initialize();
    }).then(function () {
      $rootScope.$broadcast('chromecast.ready', true);
    });
  });

}).call(this);
