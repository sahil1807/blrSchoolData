srticket.controller('CreateTicketController', ['$http', '$scope', '$stateParams', '$state', '$rootScope', '$compile', 'ENV', 'TicketService' ,  function ($http, $scope, $stateParams, $state, $rootScope, $compile, ENV , TicketService) {

    $scope.currentDate = new Date();
    $scope.type = 'ServiceRequest';
    $scope.currentPic = './images/bug.jpg';
    $scope.priority = "1";
    $scope.loading = false;
    $scope.error = false;
    $scope.sr = true;
    $scope.feature = false;
    $scope.bug = false;
    $scope.team = "IT";


    $scope.randomNumber = Math.floor(100000 + Math.random() * 900000);
    $scope.initial = 'SR-';
    $scope.ticketNumber = $scope.initial + $scope.randomNumber;

    $scope.selectType = function (value) {
        switch (value) {
            case 1:
                $scope.type = 'ServiceRequest';
                $scope.currentPic = './images/service.jpg';
                $scope.sr = true;
                $scope.feature = false;
                $scope.bug = false;
                $scope.initial = 'SR-';
                $scope.ticketNumber = $scope.initial + $scope.randomNumber;
                break;
            case 2:
                $scope.type = 'BugReport';
                $scope.currentPic = './images/bug.jpg';
                $scope.sr = false;
                $scope.feature = false;
                $scope.bug = true;
                $scope.initial = 'BUG-';
                $scope.ticketNumber = $scope.initial + $scope.randomNumber;
                break;
            case 3:
                $scope.type = 'FeatureUpdate';
                $scope.currentPic = './images/feature.jpg';
                $scope.sr = false;
                $scope.feature = true;
                $scope.bug = false;
                $scope.initial = 'FR-';
                $scope.ticketNumber = $scope.initial + $scope.randomNumber;
                break;
        }

    };

    $scope.createTicket = function () {
        $scope.loading = true;

        var data = {
            ticketNumber: $scope.ticketNumber,
            title: $scope.title,
            type: $scope.type,
            team: $scope.team,
            description: $scope.description,
            time: $scope.currentDate,
            priority: $scope.priority,
            image: $scope.currentPic,
            createdBy: {
                uid: $rootScope.user.uid,
                name: $rootScope.user.displayName,
                url: ENV.apiEndPoint + 'profile/' + $rootScope.userInfo.username
            }

        };

        TicketService.createTicket(data);
    }


}]);