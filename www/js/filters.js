/**
 * Created by b4uloveme on 2/14/15.
 */
angular.module('investMagicFilters', []).filter('FloatToPercentage', function() {
    return function(input) {
        var rate = Math.floor(parseFloat(input)*100)
        return rate ;
    };
});