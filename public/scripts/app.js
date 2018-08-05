let blrData = angular.module('blrData', ['ui.router', 'angular-medium-editor', 'angular-medium-editor-insert-plugin']);

blrData.constant('ENV',
    // Production

    {
        'apiEndPoint': 'http://localhost:3000/',
        'firebaseApiKey': 'AIzaSyAiPtRNiNsWjCST3WTKRx34y_S9yLx0tEg',
        'firebaseAuthDomain': 'srticket-1234.firebaseapp.com',
        'firebaseDatabaseURL': "https://srticket-1234.firebaseio.com",
        'firebaseProjectId': "srticket-1234",
        'firebaseStorageBucket': "srticket-1234.appspot.com",
        'firebaseMessagingSenderId': "408628424347",
        'localStorageVariable': 'srticketUser'
    }
);

blrData.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider

        .state('app',{
            url:'/',
            views: {
                'header': {
                    templateUrl: 'views/header.html',
                    controller: 'HeaderController'
                },
                'content': {
                    templateUrl: 'views/homepage.html',
                    controller: 'HomePageController'
                },
                'footer': {
                    templateUrl: 'views/footer.html',
                    controller: 'FooterController'
                }
            }
        })

        .state('app.login',{
            url:'login',
            views: {
                'header@': {
                },
                'content@': {
                    templateUrl: 'views/login.html',
                    controller: 'LoginController'
                },
                'footer@': {
                }
            }
        })

        .state('app.signup',{
            url:'signup',
            views: {
                'header@': {
                },
                'content@': {
                    templateUrl: 'views/signup.html',
                    controller: 'SignupController'
                },
                'footer@': {
                }
            }
        })

        .state('app.forgot',{
            url:'forgot-password',
            views: {
                'header@': {
                },
                'content@': {
                    templateUrl: 'views/forgot-password.html',
                    controller: 'ForgotPasswdController'
                },
                'footer@': {
                }
            }
        })

        .state('app.schoolData',{
            url:'schoolData',
            views: {
                'content@': {
                    templateUrl: 'views/school-data.html',
                    controller: 'SchoolDataController'
                }
            }
        });

    $locationProvider.html5Mode({
        enabled: true
    });
    $urlRouterProvider.otherwise('/');


});