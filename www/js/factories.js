angular.module('starter.factories', [])

    .factory('currencyFactory', function ($http,$rootScope,$q) {
        return {
            getUSDtoCADCurrency: function () {
                var url = 'http://www.freecurrencyconverterapi.com/api/v3/convert?q=USD_CAD&compact=y&callback=JSON_CALLBACK'
                var deferred = $q.defer();
                $http.jsonp(url).then(function(data){
                    console.log(data.data.USD_CAD.val)
                    deferred.resolve(data.data.USD_CAD.val)

                })
                //.success(function (data) {
                //    console.log(data);
                //    console.log(data.USD_CAD.val)
                //    //  $rootScope.UsdToCadRate = data.USD_CAD.val;
                //        deferred.resolve(data.USD_CAD.val);
                //}).error(function (error) {
                //    //if currency api can not be accessed, just used the default rate 1.25
                //    alert('Oops... can not connct to currency API, just use the default rate 1.25')
                //});
                //alert(deferred.promise.data.USD_CAD.val)
                return deferred.promise;
            }
        }
    })