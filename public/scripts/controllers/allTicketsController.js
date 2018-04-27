srticket.controller('AllTicketsController', ['$http', '$scope', '$stateParams', '$state', '$rootScope', '$compile' ,  'ENV' , 'TicketService',  function ($http, $scope, $stateParams, $state, $rootScope , $compile , ENV , TicketService) {

    $scope.currentPage = 0;
    $scope.pageSize = 10;
    getTickets();
    function getTickets() {
        TicketService.getAlltickets()
            .then(function (response) {
                $scope.tickets = response.data;
                $rootScope.isLoggedIn = true;
                $rootScope.windowLoaded = true;
                $scope.numberOfPages=function(){
                    return Math.ceil($scope.tickets.length/$scope.pageSize);
                }
            }, function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    }

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
