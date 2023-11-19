app.controller("thongke-ctrl", function($scope, $http, $location,$filter) {
	$scope.firstRow = [];
	
	//2nd row content
	$scope.secondRowRevenueByDate = [];
	$scope.secondRowRevenueByRevenue = [];
	$scope.secondRowCateName = [];
	$scope.secondRowNumberOfProduct= [];
	//2nd row content edge
	
	//3rd row content
	$scope.thirdRowCateName = [];
	$scope.thirdRowPercentageByCate = [];
	$scope.thirdRowCateName2 = [];
	$scope.thirdRowAvailable = [];
	$scope.thirdRowUnAvailable = [];
	//3rd row content edge
	
	//4th row content
	$scope.fourthRowPhimName = [];
	$scope.fourthRowQuantity = []; 
	//4th row content edge
	
	//5th row content
	$scope.fifRowContent = [];
	//5th row content edge
	$scope.initialize = function() {
		
		$http.get("/rest/thongke/firstRow").then(resp=> {
			$scope.firstRow = resp.data;
		})
		
		//getSecondRow Content
		$http.get("/rest/thongke/secondRow").then(resp=>{
			//revenue last 7days
			resp.data.revenueLast7Days.forEach(e=>{
				$scope.secondRowRevenueByDate.push($filter('date')(e[0],'dd-MM-yyyy'));
				$scope.secondRowRevenueByRevenue.push(e[1]);
			})
		
			//line chart for Revenue last 7 days
			var dateListRevenue = $scope.secondRowRevenueByDate
			var revenueListByDays = $scope.secondRowRevenueByRevenue
			var lineRevenueChart = document.getElementById('myLineChartRevenue').getContext('2d');
			var myChart = new Chart(lineRevenueChart, {
		        type: 'line',
		        data: {
		            labels: dateListRevenue,
		            datasets: [{
		                // label: 'User By Roles',
		                data: revenueListByDays,
		                backgroundColor: [
		                'rgb(54, 162, 235,0.7)',//blue
		                'rgb(201, 203, 207,0.7)',//gray
		                'rgb(255, 205, 86,0.7)',//yellow
		                'rgb(75, 192, 192)',//green
		                'rgb(255, 99, 132)',//red
		                ],
		                borderColor: ['rgb(54, 162, 235,1)'],//green
		                fill: true,
		                lineTension:0,
		                borderWidth: 3
		            }]
		        },
		        options: {
		            indexAxis: 'x',
		            scales: {
		
		            },
		            responsive: true,
		            plugins: {
		                title: {
		                    display: false,
		                    // text: 'Number of Registered Users By Roles',
		                    padding: {
		                        bottom: 30,
		                    },
		                    font:{
		                        size:20
		                    }
		                },
		                legend: {
		                display:false
		                },
					
			        },
		        }
		    });
	
		})
		
		
		$http.get("/rest/thongke/fourthRow").then(resp=>{
			resp.data.top10SoldPhim.forEach(e=>{
				$scope.fourthRowPhimName.push(e[0]);
				$scope.fourthRowQuantity.push(e[1]);
			})
			var top10PhimName = $scope.fourthRowPhimName;
			var quantitySold = $scope.fourthRowQuantity;
			var barChartTop10Phim = document.getElementById('myBarChartTop10Phim').getContext('2d');
			var gradient = barChartTop10Phim.createLinearGradient(0, 0, 800, 0);
				gradient.addColorStop(0, 'rgba(1,133,251,1)');
		    	gradient.addColorStop(0.3, 'rgba(34,207,207,1)');
		    	gradient.addColorStop(1, 'rgba(249,49,84,0.7)');
		    var myChart = new Chart(barChartTop10Phim, {
		        type: 'bar',
		        data: {
		            labels: top10PhimName,
		            datasets: [
						{
			                label: 'Total sold quantity',
			                data: quantitySold,
			                backgroundColor  : gradient,
			                strokeColor : "#ff6c23",
			                pointColor : "#fff",
			                pointStrokeColor : "#ff6c23",
			                pointHighlightFill: "#fff",
			                pointHighlightStroke: "#ff6c23",
			
			                borderWidth: 1
				        }
		            ]
		        },
		        options: {
		            indexAxis: 'y',
		            scales: {
		                y: {
		                    beginAtZero: true
		                }
		            },
		            responsive: true,
		            plugins: {
		                title: {
		                    display: false,
		                    text: 'Number of products Available By Categories',
		                    padding: {
		                        bottom: 10,
		                    },
		                    font:{
		                        size:20
		                    }
		                },
		                legend: {
		                    display:false,
		                },
					
			        },
		        }
		    });
		})
		
			$http.get("/rest/thongke/fifthRow").then(resp=>{
			$scope.fifRowContent = resp.data.topCustomer;
			angular.element(document).ready(function () {
                dTable = $('#tableTopCustomer')
                dTable.DataTable({
                    "pageLength": 5,
                    "lengthMenu": [
                        [5, 16, 24, -1],
                        [5, 16, 24, "All"]
                    ],
                    "language": {
                        "paginate": {
                            'previous': '<i class="fas fa-backward"></i>',
                            'next': '<i class="fas fa-forward"></i>'
                        }
                    }
                });
            });
		})
	}
	
	//load dữ liệu thống kê
	$scope.initialize();
})
