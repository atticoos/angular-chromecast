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
