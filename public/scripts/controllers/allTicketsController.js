srticket.controller('AllTicketsController', ['$http', '$scope', '$stateParams', '$state', '$rootScope', '$compile' ,  'ENV' , function ($http, $scope, $stateParams, $state, $rootScope , $compile , ENV) {

    $http.get('/ticket/getAllTickets').then(function (res) {
        $rootScope.isLoggedIn = true;
        $rootScope.windowLoaded = true;

        $scope.tickets = res.data;

        $scope.currentPage = 0;
        $scope.pageSize = 10;
        $scope.numberOfPages=function(){
            return Math.ceil($scope.tickets.length/$scope.pageSize);
        }

    }, function (error) {
        console.log(error);
    });

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
                console.log(typeSelected);
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
