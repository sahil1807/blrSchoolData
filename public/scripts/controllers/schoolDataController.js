blrData.controller('SchoolDataController', ['$http', '$scope', '$stateParams', '$state', '$rootScope', '$compile' ,  'ENV' , 'AuthService', 'SchoolService' ,  function ($http, $scope, $stateParams, $state, $rootScope , $compile , ENV , AuthService, SchoolService) {

    $scope.all = true;
    $scope.sr = false;
    $scope.bug = false;
    $scope.feature = false;
    $scope.searchField ='';
    $scope.categoryValue ='Select Category';
    $scope.mediumValue ='Select Medium';
    $scope.currentPage = 1;

    $scope.init = function () {
        if($rootScope.user) {
            SchoolService.getSchoolData()
                .then(function (res) {
                    $rootScope.isLoggedIn = true;
                    $rootScope.windowLoaded = true;

                    $scope.schoolData = res.data;
                    console.log($scope.schoolData);
                }, function (error) {
                    $scope.status = 'Unable to load all data: ' + error.message;
                });
        }
        else {
            $state.go('app')
        }
    };

    $scope.sortColumn = function(sort){
        SchoolService.getSchoolData({sort:sort})
            .then(function (res) {
                $scope.schoolData = res.data;
                console.log($scope.schoolData);
            }, function (error) {
                $scope.status = 'Unable to load all data: ' + error.message;
            });
    };

    $scope.search = function () {

        SchoolService.getSchoolData({search:$scope.searchField})
            .then(function (res) {
                $scope.schoolData = res.data;
                console.log($scope.schoolData);
            }, function (error) {
                $scope.status = 'Unable to load all data: ' + error.message;
            });
    };

    $scope.filterData = function () {

        let query = {};
        if($scope.categoryValue!=='Select Category'){
            query.category =$scope.categoryValue
        }
        if($scope.mediumValue!=='Select Medium'){
            query.medium_of_inst =$scope.mediumValue
        }
        console.log(query);

        SchoolService.getSchoolData(query)
            .then(function (res) {
                $scope.schoolData = res.data;
                console.log($scope.schoolData);
            }, function (error) {
                $scope.status = 'Unable to load all data: ' + error.message;
            });
    };

    $scope.gotoPage = function (pageNumber) {
        let query = {};
        if($scope.categoryValue!=="Select Category"){
            query.category =$scope.categoryValue
        }
        if($scope.mediumValue!=='Select Medium'){
            query.medium_of_inst =$scope.mediumValue
        }

        query.page = pageNumber;
        console.log(query);

        SchoolService.getSchoolData(query)
            .then(function (res) {
                $scope.schoolData = res.data;
                console.log($scope.schoolData);
            }, function (error) {
                $scope.status = 'Unable to load all data: ' + error.message;
            });
    }

}]);