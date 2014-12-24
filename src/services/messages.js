(function () {
  'use strict';

  function MessageBus ($rootScope, angularChromecast, CastService) {
    var CHANNEL_URN = 'urn:x-cast:',
        service = {},
        onMessageReceived;

    onMessageReceived = function (message) {
      console.log('[angular-chromecast]', 'messageRecieved', message);
      $rootScope.$broadcast('chromecast.messageReceived', message);
    };

    service.initialize = function () {
      return CastService.getInstance().then(function (cast) {
        var instance = cast.receiver.CastReceiverManager.getInstance(),
            messageBus;
        angular.forEach(angularChromecast.channels, function (channel) {
          messageBus = instance.getCastMessageBus(
            channel.namespace,
            cast.receiver.CastMessageBus.MessageType[channel.type]
          );
          messageBus.onMessage = onMessageReceived;
        });
      });
    };

    service.broadcast = function (namespace, message) {
      return service.getMessageBus(namespace).then(function (messageBus) {
        return messageBus.broadcast(mssage);
      });
    };

    service.send = function (namespace, senderId, message) {
      return service.getMessageBus(namespace).then(function (messageBus) {
        return messageBus.send(senderId, message);
      });
    };

    service.getMessageBus = function (namespace) {
      return CastService.getInstance().then(function (cast) {
        var instance = cast.receiver.CastReceiverManager.getInstance(),
            messageBus = instance.getCastMessageBus(namespace);
        return messageBus;
      });
    };

    service.getCastChannel = function (namespace, senderId) {
      return service.getMessageBus(namespace).then(function (messageBus) {
        return messageBus.getCastChannel(senderId);
      });
    };

    return service;
  }

  angular.module('angular-chromecast').factory('MessageBus', ['$rootScope', 'angularChromecast', 'CastService', MessageBus]);
}).call(this);
