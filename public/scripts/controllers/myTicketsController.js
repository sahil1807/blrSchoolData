srticket.controller('MyTicketsController', ['$http', '$scope', '$stateParams', '$state', '$rootScope', '$compile' ,  'ENV' , function ($http, $scope, $stateParams, $state, $rootScope , $compile , ENV) {

    $scope.all = true;
    $scope.sr = false;
    $scope.bug = false;
    $scope.feature = false;

    $scope.init = function () {
        if($rootScope.user) {
            $http.post('/users/revalidate', $rootScope.user).then(function (res) {
                $rootScope.userInfo = res.data.userInfo;
                window.localStorage.setItem(ENV.localStorageVariable, JSON.stringify($rootScope.user));
                $rootScope.isLoggedIn = true;
                $rootScope.windowLoaded = true;

                console.log($rootScope.userInfo);
                $scope.tickets = $rootScope.userInfo.tickets;
            }, function (error) {
                console.log(error);
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
                console.log(typeSelected);
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