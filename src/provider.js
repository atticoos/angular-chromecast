(function () {
  'use strict';

  angular.module('angular-chromecast').provider('angularChromecast', function () {
    var getter;

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
        this.setChannelNamespaces([{namespace: namespace, type: type}]);
      },
      setChannels: function (channels) {
        var messageTypes = ['JSON', 'STRING', 'CUSTOM'];
        if (angular.isArray(channels)) {
          angular.forEach(channels, function (channel) {
            if (!angular.isObject(channel) || !channel.namespace || messagesTypes.indexOf(channel.type) === -1) {
              throw new Error('Invalid channel object');
            } else {
              this.channels.push(channel);
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
