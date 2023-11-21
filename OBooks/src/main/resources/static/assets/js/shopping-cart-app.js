const app = angular.module("shopping-cart-app", []);
app.controller("shopping-cart-ctrl", function($scope, $http) {
	/*
	* QUẢN LÝ GIỎ HÀNG
	*/

	$scope.cart = {
		items: [],

		//Thêm sản phẩm vào giỏ hàng
		add(id) {
			var item = this.items.find(item => item.id == id);
			if (item) {
				item.qty++;
				this.saveToLocalStorage();
			} else {
				$http.get(`rest/products/${id}`).then(resp => {
					resp.data.qty = 1;
					this.items.push(resp.data);
					this.saveToLocalStorage();
				})
			}
		},
		sub(id) {
			var item = this.items.find(item => item.id == id);
			if (item.qty == 1) {
				this.remove(item.id);
			} else {
				item.qty--;
				this.saveToLocalStorage();
			}
			if ($scope.cart.amount === 0) {
				location.href = "/cart/view";
			}
		},

		//Xoá sản phẩm khỏi giỏ hàng
		remove(id) {
			var index = this.items.findIndex(item => item.id == id);
			this.items.splice(index, 1);
			this.saveToLocalStorage();
			if ($scope.cart.amount === 0) {
				location.href = "/cart/view";
			}
		},

		//Xoá sạch các mặt hàng trong giỏ
		clear() {
			this.items = [];
			this.saveToLocalStorage();
			if ($scope.cart.amount === 0) {
				location.href = "/cart/view";
			}

		},

		//Tính thành tiền của một sản phẩm
		amt_of(item) { },

		//Tính tổng số lượng các mặt hàng trong giỏ
		get count() {
			return this.items
				.map(item => item.qty)
				.reduce((total, qty) => total += qty, 0);
		},

		//Tổng thành tiền các mặt hàng trong giỏ
		get amount() {
			return this.items
				.map(item => item.qty * item.price)
				.reduce((total, qty) => total += qty, 0);
		},
		//Lưu giỏ hàng vào local storage
		saveToLocalStorage() {
			//dùng angular để copy xong đổi các mặt hàng sang json
			var json = JSON.stringify(angular.copy(this.items));
			localStorage.setItem("cart", json);
		},

		//Đọc giỏ hàng từ local storage
		loadFromLocalStorage() {
			var json = localStorage.getItem("cart");
			this.items = json ? JSON.parse(json) : [];
		},
	};

	let changeSOL = 0;
	
	$scope.order = {
		createDate: new Date(),
		address: "",
		account: { username: $("#username").text() },
		get orderDetails() {
			return $scope.cart.items.map(item => {
				return {
					product: { id: item.id },
					price: item.price,
					quantity: item.qty
				}
			})
		},
		purchase() {
			var order = angular.copy(this);
			//Thực hiện đặt hàng
			$http.post("/rest/orders", order).then(resp => {
				alert("Đặt hàng thành công!");
				$scope.cart.clear();
				location.href = "/order/detail/" + resp.data.id;
			}).catch(err => {
				alert("Đặt hàng lỗi!")
				console.log(err);
			})
		},
		checkout() {
			
			if ($scope.cart.count === 0) {
				alert("Vui lòng chọn sản phẩm");
			} else {
				location.href = "/order/checkout";
			}
		},
		loadSOL() {
			var solInput = document.querySelector('input[name="SOL"]');
			if (solInput) {
				changeSOL = $scope.cart.amount * 0.0007 / 1000;
				solInput.value = changeSOL;
			} else {
				console.error('SOL chưa có.');
			}
		}

	};


	// ========== [CONNECT WALLET] ===========
	$scope.publicKey;

	// Manual connect
	$scope.connectWallet = function() {
		window.phantom.solana.connect().then(function() {
			$scope.publicKey = window.phantom.solana.publicKey.toBase58(); //[1,1,1,1]
			console.log($scope.publicKey);
			$scope.$apply();
		});
	};

	var SHYFT_API_KEY = "FvtQ-DsN9H3YDIYw";

	$scope.toTransaction = function(encodedTransaction) {
		return solanaWeb3.Transaction.from(Uint8Array.from(atob(encodedTransaction), function(c) {
			return c.charCodeAt(0);
		}));
	};

	// ========== [TRANSFER SOLANA] ==========
	$scope.transferSol = function() {
		var myHeaders = new Headers();
		myHeaders.append("x-api-key", SHYFT_API_KEY);
		myHeaders.append("Content-Type", "application/json");
		// Lấy giá trị của solInput
		var solInput = document.querySelector('input[name="SOL"]');
		var amount = solInput ? parseFloat(solInput.value) : 0;
		
		var raw = JSON.stringify({
			"network": "devnet",
			"from_address": "BZBVGqPj1dVPenWsHZQNmq3hXb2MeLn2HqiYEd3QXqXf", //Nguoi gui
			"to_address": "2YwqccssDUBJ1mUgNKK4mT3r5iAHwSx7tdL6e7pcTVED", //Nguoi nhan
			"amount": amount,
		});

		var requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow'
		};

		fetch("https://api.shyft.to/sol/v1/wallet/send_sol", requestOptions)
			.then(function(response) {
				return response.json();
			})
			.then(function(res) {
				var transaction = $scope.toTransaction(res.result.encoded_transaction);

				window.phantom.solana.signTransaction(transaction).then(function(signedTransaction) {
					var connection = new solanaWeb3.Connection("https://api.devnet.solana.com");
					connection.sendRawTransaction(signedTransaction.serialize()).then(function(signature) {
						console.log("TRANSFER SUCCESSFULLY!!!");
						$scope.order.purchase();
					});
				});
			})
			.catch(function(error) {
				console.log('error', error);
			});
	};
	$scope.cart.loadFromLocalStorage();
	$scope.order.loadSOL();
})