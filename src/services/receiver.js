(function () {
  'use strict';

  function ReceiverManager (CastService) {
    var service = {};

    service.start = function () {
      CastService.getInstance().then(function (cast) {
        var instance = cast.receiver.CastReceiverManager.getInstance();
        instance.onSenderConnected = function (event) {
          $rootScope.$broadcast('chromecast.senderConnected', event);
        };
        instance.start();
      });
    };

    return service;
  }

  agular.module('angular-chromecast').service('ReceiverManager', ['CastService', ReceiverManager]);
}).call(this);
