app.controller("theloai-ctrl",function($scope,$http){
    $scope.items = [];
    $scope.form = {};

    $scope.initialize = function(){
        //load categories
        $http.get("/rest/categories").then(resp=>{
            $scope.items = resp.data;
        })
    }

    //Xoá form
    $scope.reset = function(){
		$scope.form = {
		}
    }

    //Hiển thị lên form
    $scope.edit = function(item){
		$scope.form = angular.copy(item);
		$('#pills-home-tab').tab('show');
    }

    //Thêm sản phẩm
    $scope.create = function(){
		var item = angular.copy($scope.form);
		$http.post(`/rest/categories`,item).then(resp=>{
			$scope.items.push(resp.data);
			$scope.reset();
			alert('Thêm mới sản phẩm thành công!');
			console.log(resp.data);
		}).catch(err=>{
			alert('Lỗi thêm mới sản phẩm!')
			console.log("Error ",err);
		})
    }

    //Update sản phẩm
    $scope.update = function(){
		var item = angular.copy($scope.form);
		$http.put(`/rest/categories/${item.id}`,item).then(resp=>{
			var index = $scope.items.findIndex(p=>p.id == item.id);
			$scope.items[index] = item;
			alert('Cập nhật sản phẩm thành công!');
			console.log(resp.data);
		}).catch(err=>{
			alert('Lỗi cập nhật sản phẩm!')
			console.log("Error ",err);
		})
	}

    //Remove sản phẩm
    $scope.delete = function(item){
		$http.delete(`/rest/categories/${item.id}`).then(resp=>{
			var index = $scope.items.findIndex(p=>p.id == item.id);
			$scope.items.splice(index,1);
			$scope.reset();
			alert('Xoá sản phẩm thành công!');
			console.log(resp.data);
		}).catch(err=>{
			alert('Lỗi xoá sản phẩm!')
			console.log("Error ",err);
		})
	}

    
    $scope.pager = {
		page:0,
		size:5,
		get items(){
			var start = this.page * this.size;
			return	$scope.items.slice(start,start+this.size);
		},
		get count(){
			return Math.ceil(1.0*$scope.items.length/this.size);
		},
		first(){
			this.page = 0;
		},
		previous(){
			this.page--;
			if(this.page<0){
				this.last();
			};
		},
		next(){
			this.page++;
			if(this.page >= this.count){
				this.first();
			};
		},
		last(){
			this.page = this.count -1;
		},
	}
	
	//Khởi đầu
    $scope.initialize();
	$scope.reset();
})