(function () {
  'use strict';

  function ReceiverManager (CastService) {
    var service = {},
        onSenderConnected,
        onSenderDisconnected,
        onShutdown,
        onStandbyChanged,
        onSystemVolumeChanged,
        onVisibilityChanged;

    onSenderConnected = function () {
      $rootScope.$broadcast('chromecast.senderConnected', event);
    };

    onSenderDisconnected = function () {
      $rootScope.$broadcast('chromecast.senderDisconnected', event);
    };

    onShutdown = function (event) {
      $rootScope.$broadcast('chromecast.shutdown', event);
    };

    onStandbyChanged = function (event) {
      $rootScope.$broadcast('chromecast.standbyChanged', event);
    };

    onSystemVolumeChanged = function (event) {
      $rootScope.$broadcast('chromecast.systemVolumeChanged', event);
    };

    onVisibilityChanged = function (event) {
      $rootScope.$broadcast('chromecast.visibilityChanged', event);
    };

    service.start = function () {
      return CastService.getInstance().then(function (cast) {
        var instance = cast.receiver.CastReceiverManager.getInstance();
        instance.onSenderConnected = onSenderConnected;
        instance.onSenderDisconnected = onSenderDisconnected;
        instance.onShutdown = onShutdown;
        instance.onStandbyChanged = onStandbyChanged;
        instance.onSystemVolumeChanged = onSystemVolumeChanged;
        instance.onVisibilityChanged = onVisibilityChanged;
        instance.start();
      });
    };

    return service;
  }

  angular.module('ngChromecast').service('ReceiverManager', ['CastService', ReceiverManager]);
}).call(this);
