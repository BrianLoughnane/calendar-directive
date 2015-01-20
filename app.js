angular.module('calendarDemoApp', [])

	.factory('getYearRange', function() {
		return function() {
			var year = cr.prepareDate(new Date()).year;
			var startYearRange = year - 20;
			var endYearRange = year + 20;
			var range = [];
			for (var i = startYearRange; i <= endYearRange; i++) {
				range.push(i);
			}
			return range;			
		}	
	})

	.factory('months', function() {
		return [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		];
	})

	.factory('transposeToMonth', function() {
		return function (monthNumber) {
			var collection = {
				0 : 'January',
				1 : 'February',
				2 : 'March',
				3 : 'April',
				4 : 'May',
				5 : 'June',
				6 : 'July',
				7 : 'August',
				8 : 'September',
				9 : 'October',
				10 : 'November',
				11 : 'December'
			}
			return collection[monthNumber];
		}
	})

	.factory('transposeToNumber', function() {
		return function (monthName) {
			var collection = {
				'January' : 0,
				'February' : 1,
				'March' : 2,
				'April' : 3,
				'May' : 4,
				'June' : 5,
				'July' : 6,
				'August' : 7,
				'September' : 8,
				'October' : 9,
				'November' : 10,
				'December' : 11
			}
			return collection[monthName];
		}
	})

	.factory('getWeeksForDateOf', function() {
		return function(dateObject){
			var days = cr.getMonthlyRange(dateObject).days;
			var weeks = [];
			function inner(start, end) {
				if(days[start] != void 0) {
					weeks.push(days.slice(start, end));							
					inner(start+7, end+7);
				} else {
					return;
				}
			}
			inner(0,7);
			return weeks;
		}
	})

	.factory('parseWeeks', function() {
		return function(arrayOfWeeks) {
			var delineate = true;

			arrayOfWeeks.forEach(function(arrayOfDays) {
				arrayOfDays.forEach(function(dayObject) {
					
					if(dayObject.day === 1) {
						delineate = !delineate;
					}

					dayObject.delineate = delineate;
				});
			});

			return arrayOfWeeks;
		}
	})

	.directive('navBar', function() {
		return {
			restrict: 'E',
			transclude: true,
			templateUrl: 'nav-bar.html',
			controller: function($scope, $element, getYearRange, months, transposeToMonth, transposeToNumber, getWeeksForDateOf, parseWeeks) {
				$scope.weeksThisMonth = parseWeeks(getWeeksForDateOf(new Date()));
	
				$scope.currentYear = cr.prepareDate(new Date()).year;
				$scope.currentMonthName = transposeToMonth(cr.prepareDate(new Date()).month);

				$scope.range = {
					months : months,
					years : getYearRange(),
				}
		
				$scope.dateSelection = {
					year: $scope.currentYear,
					month: $scope.currentMonthName
				}

				$scope.update = function() {
					var selectedDate = String($scope.dateSelection.month) + ' 1 ' + String($scope.dateSelection.year);
					$scope.weeksThisMonth = parseWeeks(getWeeksForDateOf(new Date(selectedDate)));			
				}

				$scope.toNextMonth = function() {
					var monthNumber = transposeToNumber($scope.dateSelection.month);
					monthNumber++;

					if (monthNumber === 12) { 
						monthNumber = 0; 
						$scope.dateSelection.year++; 
					}

					var monthName = transposeToMonth(monthNumber);
					$scope.dateSelection.month = monthName;
					$scope.update();
				}

				$scope.toPrevMonth = function() {
					var monthNumber = transposeToNumber($scope.dateSelection.month);
					monthNumber--;

					if (monthNumber === -1) { 
						monthNumber = 11; 
						$scope.dateSelection.year--; 
					}

					var monthName = transposeToMonth(monthNumber);
					$scope.dateSelection.month = monthName;
					$scope.update();	
				}
			}
		}
	})

	.directive('calendar', function() {
		return {
			require: '^navBar',
			restrict: 'E',
			templateUrl: 'calendar-directive-template.html'
		}
	});










