var srticket = angular.module('srticket', ['ui.router', 'angular-medium-editor', 'angular-medium-editor-insert-plugin']);

srticket.constant('ENV',
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

srticket.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
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


        .state('app.create',{
            url:'create',
            views: {
                'content@': {
                    templateUrl: 'views/createTicket.html',
                    controller: 'CreateTicketController'
                }
            }
        })

        .state('app.myTickets',{
            url:'mytickets',
            views: {
                'content@': {
                    templateUrl: 'views/myTickets.html',
                    controller: 'MyTicketsController'
                }
            }
        })
        .state('app.allTickets',{
            url:'alltickets',
            views: {
                'content@': {
                    templateUrl: 'views/allTickets.html',
                    controller: 'AllTicketsController'
                }
            }
        })


    ;

    $locationProvider.html5Mode({
        enabled: true
    });
    $urlRouterProvider.otherwise('/');


});