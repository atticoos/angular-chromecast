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

(function () {
  'use strict';

  angular.module('ngChromecast').provider('ngChromecast', function () {
    var getter,
        self = this;

    this.loggingLevel = 'NONE';
    this.channels = [];


    getter = function () {
      return {
        channels: this.channels,
        loggingLevel: this.loggingLevel
      }
    };

    return {
      setChannel: function (namespace, type) {
        this.setChannels([{namespace: namespace, type: type}]);
      },
      setChannels: function (channels) {
        var messageTypes = ['JSON', 'STRING', 'CUSTOM'];
        if (angular.isArray(channels)) {
          angular.forEach(channels, function (channel) {
            if (!angular.isObject(channel) || !channel.namespace || messageTypes.indexOf(channel.type) === -1) {
              throw new Error('Invalid channel object');
            } else {
              self.channels.push(channel);
            }
          }.bind(this));
        } else {
          throw new Error('Invalid channels array');
        }
      },
      setLoggingLevel: function (level) {
        var levels = ['DEBUG', 'ERROR', 'NONE', 'VERBOSE', 'WARNING'];
        if (levels.indexOf(level) > -1) {
          this.loggingLevel = level;
        }
      },
      $get: getter
    };
  });

}).call(this);

(function () {
  'use strict';

  function CastService ($q, $timeout) {
    var service = {};
    service.getInstance = function () {
      var deferred = $q.defer(),
          interval;

      if (cast) {
        deferred.resolve(cast);
      } else {
        interval = $interval(function () {
          if (cast) {
            $interval.cancel(interval);
            deferred.resolve(cast);
          }
        }, 100);
      }

      return deferred.promise;
    }
    return service;
  }

  angular.module('ngChromecast').factory('CastService', ['$q', '$interval', CastService]);
}).call(this);

(function () {
  'use strict';

  function MessageBus ($rootScope, ngChromecast, CastService) {
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
        angular.forEach(ngChromecast.channels, function (channel) {
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

  angular.module('ngChromecast').factory('MessageBus', ['$rootScope', 'ngChromecast', 'CastService', MessageBus]);
}).call(this);

(function () {
  'use strict';

  function ReceiverManager (CastService) {
    var service = {};

    service.start = function () {
      return CastService.getInstance().then(function (cast) {
        var instance = cast.receiver.CastReceiverManager.getInstance();
        instance.onSenderConnected = function (event) {
          $rootScope.$broadcast('chromecast.senderConnected', event);
        };
        instance.start();
      });
    };

    return service;
  }

  angular.module('ngChromecast').service('ReceiverManager', ['CastService', ReceiverManager]);
}).call(this);
