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
