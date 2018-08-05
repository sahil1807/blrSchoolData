blrData.service('SchoolService', ['$rootScope', '$http', '$window', '$state', '$stateParams', 'ENV', function ($rootScope, $http, $window, $state, $stateParam, ENV) {

    this.getSchoolData = function (options) {
        return $http.post('/schoolData/getSchoolData', options)
    }


}]);