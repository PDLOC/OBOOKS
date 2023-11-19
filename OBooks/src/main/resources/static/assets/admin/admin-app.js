app = angular.module("admin-app",["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/product",{
        templateUrl:"/assets/admin/doan/index.html",
        controller: "product-ctrl"
    })
    .when("/account",{
        templateUrl:"/assets/admin/card/index.html",
        controller: "account-ctrl"
    })
    
    .when("/authorize",{
        templateUrl:"/assets/admin/table/index.html",
        controller: "authority-ctrl"
    })
    .when("/unauthorized",{
        templateUrl:"/assets/admin/authority/unauthorized.html",
        controller: "authority-ctrl"
    })
    /*.otherwise({
        redirectTo: "/summary",
        controller: "summary-ctrl"
    })*/
    .otherwise({
        redirectTo: "/account",
        controller: "account-ctrl"
    })
})