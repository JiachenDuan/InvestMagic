angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
        // Form data for the login modal
        $scope.loginData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function () {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function () {
            $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function () {
            console.log('Doing login', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function () {
                $scope.closeLogin();
            }, 1000);
        };
    })

    .controller('PlaylistsCtrl', function ($scope) {
        $scope.playlists = [
            {title: 'Reggae', id: 1},
            {title: 'Chill', id: 2},
            {title: 'Dubstep', id: 3},
            {title: 'Indie', id: 4},
            {title: 'Rap', id: 5},
            {title: 'Cowbell', id: 6}
        ];
    })

    .controller('PlaylistCtrl', function ($scope, $stateParams) {
    })

    .controller('cadtousdCtrl',function($scope,$http,$rootScope,currencyFactory){
        $scope.price = {pricebeforetax:null,usdBeforeTax:0,usdAfterTax:0};
        $scope.UsdToCadRate = 1.25;
        $scope.taxRate = {CADTaxRate :'0.12'  ,USDTaxRate:'0.09'};

        $scope.range = 2;

         $scope.getUSDtoCADCurrency = function(){
            currencyFactory.getUSDtoCADCurrency().then(function(data){
                $scope.UsdToCadRate = data;
            });
        }

        $scope.getUSDtoCADCurrency();



       $scope.testngchange = function(){

             var cadtax = 1+ parseFloat($scope.taxRate.CADTaxRate);
           $scope.price.afterTaxCAD = $scope.price.pricebeforetax * cadtax ;
           $scope.price.usdBeforeTax =  ($scope.price.afterTaxCAD/$scope.UsdToCadRate)/(1+parseFloat($scope.taxRate.USDTaxRate));
           $scope.price.usdAfterTax = ($scope.price.afterTaxCAD/$scope.UsdToCadRate)
       }

        $scope.cadrangechange = function(){
            console.log( $scope.taxRate.CADTaxRate)
        }

        $scope.closekeyboardonrange = function(){
            cordova.plugins.Keyboard.close();
        }

    })
    .controller('InvestCtrl', function ($scope,$filter,$rootScope, $stateParams,$cordovaKeyboard) {

        //${{invest.amount}} | {{invest.year}} | {{invest.ratio}}
        $scope.invests = [];

        var finalmaxcol = 4
        var maxcol = 4;
        $scope.years ;
        $scope.returnRatio ;
        $scope.investAmount ;
        $scope.addmoreinvest ;
        $scope.checkAdvance = { checked: false };
        //$scope.$watch('investAmount', function() {
        //
        //});
        var currentAmount = $scope.investAmount;
        var moreInvestAmount ; //only add more invest from the second year
        $scope.totalInvestAmount;
        $scope.test = 0;
        ;

        /**
         * When no invest more amount, just pass 0 as investMoreAmount
         * @param curamount
         * @param investMoreAmount
         * @returns {number}
         */
        $scope.compoundCaculate = function (curamount,investMoreAmount) {
            console.log("curamount " + curamount )
            console.log("investMoreAmout " + investMoreAmount)
            console.log("curamount+investMoreAmount " + (curamount+investMoreAmount))
            var amout = (parseFloat(curamount)+parseFloat(investMoreAmount))* (1 + $scope.returnRatio / 100);
            console.log("amout " + amout)
            console.log("")
            return amout;
        }





        $scope.updateInvestGrid = function () {
         console.log("updateInvestGrid is called")
            $scope.invests = [];
            currentAmount = $scope.investAmount;
            moreInvestAmount = parseFloat($scope.investAmount)-parseFloat($scope.addmoreinvest);
            $scope.totalInvestAmount = parseFloat($scope.investAmount)-parseFloat($scope.addmoreinvest);
            //handle the case when maxcol>years, user years as maxcol
            if(maxcol>$scope.years){
                maxcol = $scope.years;
            }else{
                maxcol = finalmaxcol;
            }

            for (var i = 0,yearcount = 1; i < $scope.years / maxcol; i++) {

                $scope.invests.push([]);

                for (var col = 0; col < maxcol && yearcount<=$scope.years; col++) {


                    //update currentAmount after compound calculation
                    //Notes: have to calculate moreInvenstAmount first, cause it is using currentAmount as parameter
                    moreInvestAmount = $scope.compoundCaculate(moreInvestAmount,$scope.addmoreinvest);
                    currentAmount = $scope.compoundCaculate(currentAmount,0);
                    $scope.totalInvestAmount += parseFloat($scope.addmoreinvest)
                    $scope.invests[i][col] = {
                        amount: currentAmount,
                        year: yearcount++,
                        ratio: $scope.returnRatio,
                        moreInvestAmount:moreInvestAmount,
                        totalInvestAmount:$scope.totalInvestAmount
                    }
                }
            }
        }
        //update Invest Grid when page loaded
        //(function(){$scope.updateInvestGrid()});

        $scope.testngchange = function() {
            console.log("ng change is called" + $scope.years)
            //$scope.investAmount = $filter('currency')($scope.investAmount);

            $scope.updateInvestGrid()
        }


        $scope.submit = function() {
            alert('submit')
            //cordova.plugins.Keyboard.close();
           // $cordovaKeyboard.close();
        }



    })










