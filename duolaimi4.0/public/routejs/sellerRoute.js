/**
 * Created by lx on 2016/11/16.
 */
/**
 * Created by lx on 2016/11/1.
 */
angular.module('myApp',['ui.router'])
    .config(function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('sellerPage',{
                url:'/sellerPage',
                abstract:true,
                templateUrl:'sellerPage.html'
                //controller:"sellerPageController"
            })
            .state('sellerPage.test',{
                url:'/test',
                //controller:'newsController',
                templateUrl:'test.html'
            })
        .state('sellerPage.issuedCommodity',{
            url:'/issuedCommodity',
            //controller:'newsController',
            templateUrl:'issuedCommodity.html'
        });
        $urlRouterProvider.otherwise('/sellerPage/test');
    })

