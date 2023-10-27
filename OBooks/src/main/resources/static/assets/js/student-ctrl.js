var app = angular.module("app", []);
app.controller("student-ctrl", function($scope, $http) {
	$scope.initialize = function() {

		$http.get("/rest/student").then(resp => {
			$scope.items = resp.data;
		})
		$scope.reset();
	}

	$scope.reset = function() {
		$scope.form = {
		}
	}
	$scope.edit = function(st) {
		$scope.form = angular.copy(st);
	}
	$scope.create = function() {
		var acc = angular.copy($scope.form);
		$http.post(`/rest/student`, acc).then(resp => {
			$scope.items.push(resp.data);
			$scope.reset();
			alert("Thêm  mới thành công!");
		}).catch(error => {
			alert("Lỗi thêm mới !");
			console.log("Error", error);
		});
	}
		$scope.update = function(){
		var acc = angular.copy($scope.form);
		$http.put(`/rest/student/${acc.username}`, acc).then(resp => {
			var index = $scope.items.findIndex(a => a.username == acc.username);
			$scope.items[index] = acc;
			alert("Cập nhật  thành công!");		
		})
		.catch(error => {
			alert("Lỗi cập nhật tài khoản!");
			console.log("Error", error);
		});
	}
		$scope.delete = function(acc){
		if(confirm("Bạn muốn xóa student  này?")){
			$http.delete(`/rest/student/${acc.username}`).then(resp => {
				var index = $scope.items.findIndex(a => a.username == acc.username);
				$scope.items.splice(index, 1);
				$scope.reset();
				alert("Xóa  thành công!");
			}).catch(error => {
				alert("Lỗi xóa!");
				console.log("Error", error);
			})
		}
	}
	$scope.initialize();
});