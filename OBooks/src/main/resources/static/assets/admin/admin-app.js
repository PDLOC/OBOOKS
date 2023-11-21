app = angular.module("admin-app", ["ngRoute"]);

app.config(function($routeProvider) {
	$routeProvider
		.when("/product", {
			templateUrl: "/assets/admin/product/index.html",
			controller: "product-ctrl"
		})
		.when("/order", {
			templateUrl: "/assets/admin/hoadon/index.html",
			controller: "hoadon-ctrl"
		})
		.when("/account", {
			templateUrl: "/assets/admin/account/index.html",
			controller: "account-ctrl"
		})
		.when("/thongke", {
			templateUrl: "/assets/admin/summary/index.html",
			controller: "summary-ctrl"
		})
	
		.when("/authorize", {
			templateUrl: "/assets/admin/authority/index.html",
			controller: "authority-ctrl"
		})
		.when("/unauthorized", {
			templateUrl: "/assets/admin/authority/unauthorized.html",
			controller: "authority-ctrl"
		})
		.otherwise({
			templateUrl: "/assets/admin/summary/index.html",
			controller: "summary-ctrl"
		})
})