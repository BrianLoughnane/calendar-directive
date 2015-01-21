var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var getRandomMonthNumber = function() {
	return Math.floor(Math.random() * 12);
}

describe('calendarDemoApp', function() {
	it('should exist', function() {
		expect(module('calendarDemoApp')).not.toBeNull();
	})
});

describe('getYearRange', function() {
	beforeEach(module('calendarDemoApp'));

	it('should return a function', 
	inject(function (getYearRange) {
		expect(typeof getYearRange).toEqual('function');
	}));
	
	it('the function should return an array', 
	inject(function (getYearRange) {
		expect(Array.isArray(getYearRange())).toEqual(true);
	}));

	it('the array should have a length of 41',
	inject(function (getYearRange) {
		expect(getYearRange().length).toEqual(41);
	}));
});

describe('months', function() {
	beforeEach(module('calendarDemoApp'));

	it('should return an array', 
	inject(function (months) {
		expect(Array.isArray(months)).toEqual(true);
	}));

	it('the array should have a length of 12', 
	inject(function (months) {
		expect(months.length).toEqual(12);
	}));

	it('the array values should be months', 
	inject(function (months) {
		expect(months).toContain('January');
		expect(months).toContain('February');
		expect(months).toContain('March');
		expect(months).toContain('April');
		expect(months).toContain('May');
		expect(months).toContain('June');
		expect(months).toContain('July');
		expect(months).toContain('August');
		expect(months).toContain('September');
		expect(months).toContain('October');
		expect(months).toContain('November');
		expect(months).toContain('December');
	}));
});


describe('transposeToMonth', function() {
	beforeEach(module('calendarDemoApp'));

	it('should return a function',
	inject(function (transposeToMonth) {
		expect(typeof transposeToMonth).toEqual('function');
	}));

	it('the function should return a string', 
	inject(function (transposeToMonth) {
		expect(typeof transposeToMonth(0)).toEqual('string');
	}));

	it('the string should be a month name',
	inject(function (transposeToMonth) {
		expect(transposeToMonth(0)).toEqual('January');
		expect(transposeToMonth(1)).toEqual('February');
		expect(transposeToMonth(2)).toEqual('March');
		expect(transposeToMonth(3)).toEqual('April');
		expect(transposeToMonth(4)).toEqual('May');
		expect(transposeToMonth(5)).toEqual('June');
		expect(transposeToMonth(6)).toEqual('July');
		expect(transposeToMonth(7)).toEqual('August');
		expect(transposeToMonth(8)).toEqual('September');
		expect(transposeToMonth(9)).toEqual('October');
		expect(transposeToMonth(10)).toEqual('November');
		expect(transposeToMonth(11)).toEqual('December');
	}));
});

describe('transposeToNumber', function() {
	beforeEach(module('calendarDemoApp'));

	it('should return a function',
	inject(function (transposeToNumber) {
		expect(typeof transposeToNumber).toEqual('function');
	}));

	it('the function should return a string', 
	inject(function (transposeToNumber) {
		expect(typeof transposeToNumber('January')).toEqual('number');
	}));

	it('the number should be between 0 and 11',
	inject(function (transposeToNumber) {
		expect(transposeToNumber('January')).toEqual(0);
		expect(transposeToNumber('February')).toEqual(1);
		expect(transposeToNumber('March')).toEqual(2);
		expect(transposeToNumber('April')).toEqual(3);
		expect(transposeToNumber('May')).toEqual(4);
		expect(transposeToNumber('June')).toEqual(5);
		expect(transposeToNumber('July')).toEqual(6);
		expect(transposeToNumber('August')).toEqual(7);
		expect(transposeToNumber('September')).toEqual(8);
		expect(transposeToNumber('October')).toEqual(9);
		expect(transposeToNumber('November')).toEqual(10);
		expect(transposeToNumber('December')).toEqual(11);
	}));
});

describe('getWeeksForDateOf', function() {
	beforeEach(module('calendarDemoApp'));

	it('should return a function',
	inject(function (getWeeksForDateOf) {
		expect(typeof getWeeksForDateOf).toEqual('function');
	}));

	it('the function should return an array', 
	inject(function (getWeeksForDateOf) {
		expect(Array.isArray(getWeeksForDateOf(new Date()))).toEqual(true);
	}));

	it('the array should contain only sub-arrays', 
	inject(function (getWeeksForDateOf) {
		var arr = getWeeksForDateOf(new Date());
		arr.forEach(function(element) {
			expect(Array.isArray(element)).toEqual(true);
		});
	}));

	it('each sub-array length should equal 7',
	inject(function (getWeeksForDateOf) {
		var arr = getWeeksForDateOf(new Date());
		arr.forEach(function(array) {
			expect(array.length).toEqual(7);
		});
	}));
})


describe('parseWeeks', function() {
	beforeEach(module('calendarDemoApp'));

	it('should return a function',
	inject(function (parseWeeks) {
		expect(typeof parseWeeks).toEqual('function');
	}));

	it('the function should return an array', 
	inject(function (parseWeeks, getWeeksForDateOf) {
		var arr = parseWeeks(getWeeksForDateOf(new Date()));
		expect(Array.isArray(arr)).toEqual(true);
	}));

	it('each sub-array length should equal 7',
	inject(function (parseWeeks, getWeeksForDateOf) {
		var arr = parseWeeks(getWeeksForDateOf(new Date()));
		arr.forEach(function(array) {
			expect(array.length).toEqual(7);
		});
	}));
});

describe('navBar', function() {
	var scope, element, compiled, html;

	beforeEach(module('calendarDemoApp'));
	beforeEach(module('nav-bar.html'));
	beforeEach(inject(function($rootScope, $compile) {
		html = '<nav-bar>transclusionTest</nav-bar>';
		scope = $rootScope.$new();
		compiled = $compile(html);
		element = compiled(scope);
		scope.$digest();
	}));

	it('should display the nav-bar template', function() {
		expect(element.text()).toContain('transclusionTest');
		expect(element.find('.nav-bar-directive').length).toEqual(1);
		expect(element.find('.calendar').length).toEqual(1);
		expect(element.find('div').length).toEqual(2);
		expect(element.find('nav').length).toEqual(1);
		expect(element.find('select').length).toEqual(2);
		expect(element.find('span').length).toEqual(3);
		expect(element.find('.month-dropdown').find('option').length).toEqual(12);
		expect(element.find('.year-dropdown').find('option').length).toEqual(41);
	});

	it('should expose a controller', function() {
		ctrl = element.data('$navBarController');		
		expect(ctrl).toBeDefined();
	});

	it('the controller should set different scope variables', function() {
		var wtm = scope.weeksThisMonth;
		expect(wtm).toBeDefined();
		expect(Array.isArray(wtm)).toEqual(true);

		var cy = scope.currentYear;
		expect(cy).toBeDefined();
		expect(typeof cy).toEqual('number');
		expect(cy).toBeGreaterThan(2014);

		var cmn = scope.currentMonthName;
		expect(cmn).toBeDefined();
		expect(months).toContain(cmn);

		var r = scope.range;
		expect(typeof r).toEqual('object');
		expect(r.months).toBeDefined();
		expect(r.years).toBeDefined();

		var ds = scope.dateSelection;
		expect(typeof ds).toEqual('object');
		expect(ds.month).toBeDefined();
		expect(ds.year).toBeDefined();
	});

	it('the controller should be able to update the month displayed', function() {
		scope.dateSelection.year = 2020;
		scope.dateSelection.month = 'March';
		scope.update();
		expect(scope.weeksThisMonth[0][0].day).toEqual(1);
	});

	it('controller should be able to go to next and previous months', function() {
		scope.dateSelection.year = 1999;
		scope.dateSelection.month = 'December';

		scope.toNextMonth();
		expect(scope.dateSelection.year).toEqual(2000);
		expect(scope.dateSelection.month).toEqual('January');

		scope.toPrevMonth();
		expect(scope.dateSelection.year).toEqual(1999);
		expect(scope.dateSelection.month).toEqual('December');		
	});
});


describe('calendar', function() {
	var scope, element, compiled, html;

	beforeEach(module('calendarDemoApp'));
	// beforeEach(module('nav-bar.html'));
	beforeEach(module('calendar-directive-template.html'));
	beforeEach(inject(function($rootScope, $compile, getWeeksForDateOf) {
		html = '<calendar></calendar>';
		scope = $rootScope.$new();
		compiled = $compile(html);
		element = compiled(scope);
		scope.weeksThisMonth = getWeeksForDateOf(new Date());
		scope.$digest();
	}));

	it('should display the calendar-directive-template', function() {
		expect(element.find('.row').length).toBeGreaterThan(3);
		expect(element.find('.square').length).toBeGreaterThan(21);
	});

	it('should be able to access the navBar control and scope', function() {
		expect(scope.weeksThisMonth).toBeDefined();
	});
});


















































