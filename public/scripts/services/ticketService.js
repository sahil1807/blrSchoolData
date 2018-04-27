srticket.service('TicketService', ['$rootScope', '$http', '$window', '$state', '$stateParams', 'ENV', function ($rootScope, $http, $window, $state, $stateParam, ENV) {

    this.getAlltickets = function () {
      return  $http.get('/ticket/getAllTickets');
    };

    this.createTicket = function (data) {
        $http.post('/ticket/createTicket', data).then(function (response) {
            $rootScope.userInfo = response.data.userInfo;
            $state.go('app.myTickets')

        }, function (error) {
            console.log(error);
        })
    };

}]);