srticket.controller('MyTicketsController', ['$http', '$scope', '$stateParams', '$state', '$rootScope', '$compile' ,  'ENV' , 'AuthService' ,  function ($http, $scope, $stateParams, $state, $rootScope , $compile , ENV , AuthService) {

    $scope.all = true;
    $scope.sr = false;
    $scope.bug = false;
    $scope.feature = false;

    $scope.init = function () {
        if($rootScope.user) {
            AuthService.updateUser()
                .then(function (res) {
                    $rootScope.userInfo = res.data.userInfo;
                    window.localStorage.setItem(ENV.localStorageVariable, JSON.stringify($rootScope.user));
                    $rootScope.isLoggedIn = true;
                    $rootScope.windowLoaded = true;

                    $scope.tickets = $rootScope.userInfo.tickets;
                }, function (error) {
                    $scope.status = 'Unable to load all tickets data: ' + error.message;
                });
        }
        else {
            $state.go('app')
        }
    };


    $scope.typeSort = function (typeSelected) {
        $scope.myFilter = {type : typeSelected};
        switch (typeSelected) {
            case '':
                $scope.all = true;
                $scope.sr = false;
                $scope.bug = false;
                $scope.feature = false;
                break;
            case 'ServiceRequest':
                $scope.all = false;
                $scope.sr = true;
                $scope.bug = false;
                $scope.feature = false;
                break;
            case 'FeatureUpdate':
                $scope.all = false;
                $scope.sr = false;
                $scope.bug = false;
                $scope.feature = true;
                break;
            case 'BugReport':
                $scope.all = false;
                $scope.sr = false;
                $scope.bug = true;
                $scope.feature = false;
                break;

        }
    }



}]);