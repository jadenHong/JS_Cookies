
initialize();

function initialize() {
	var today = new Date();
	document.getElementById('currentDate').innerHTML = today;
}



function custInfo() {
	var fName, lName, address, phoneNumber;
	var customer = {};

	fName = document.getElementById('firstName').value;
	lName = document.getElementById('lastName').value;
	address = document.getElementById('address').value;
	phoneNumber = document.getElementById('phone').value;
	customer.fName = fName;
	customer.lName = lName;
	customer.address = address;
	customer.phoneNumber = phoneNumber;

	return customer;
}

function calcPizza() {
	var pizzaType, pizzaSize, pizzaToppings, pizzaTotalCost, pizzaPrice;
	var numOfPizza = 0;
	var toppingCost = 0;
	var toppingArray = [];
	var pizza = {};

	pizzaType = document.querySelector('input[name="pizzaType[]"]:checked').value;
	pizzaSize = document.getElementById('pizzaSize').value;
	switch (pizzaSize) {
		case 'Small':
			pizzaCost = 8.50;
			break;
		case 'Medium':
			pizzaCost = 11.50;
			break;
		case 'Large':
			pizzaCost = 14.00;
			break;
		case 'Extra Large':
			pizzaCost = 16.50;
			break;
		default:
			pizzaCost = 0;

	}

	numOfPizza = document.getElementById('numOfPizza').value;
	pizzaToppings = document.getElementsByName('pizzaToppings[]');
	for (var i = 0; i < pizzaToppings.length; i++) {
		if (pizzaToppings[i].checked == true) {
			toppingCost += 1.75;
			toppingArray.push(pizzaToppings[i].value);
		}
	}
	pizzaTotalCost = (pizzaCost + toppingCost) * numOfPizza;

	pizza.cost = pizzaCost;
	pizza.type = pizzaType;
	pizza.size = pizzaSize;
	pizza.toppings = toppingArray;
	pizza.quantity = numOfPizza;
	pizza.toTalCost = pizzaTotalCost;

	return pizza;
}

function calcSandwich() {
	var sandwichType, sandwichCost;
	var numOfSandwich = 0;
	var sandwich = {};

	sandwichCost = document.querySelector('input[name="sandwichType[]"]:checked').value;
	sandwichType = document.querySelector('input[name="sandwichType[]"]:checked + span').textContent;
	numOfSandwich = document.querySelector('input[name="numOfSandwich"').value;

	sandwich.cost = sandwichCost;
	sandwich.type = sandwichType;
	sandwich.numOfSandwich = numOfSandwich;
	sandwich.toTalCost = sandwichCost * numOfSandwich;

	return sandwich;
}

function calcDrink() {
	var drinkType, drinkCost, drinkSize
	var numOfDrink = 0;
	var drink = {};

	drinkType = document.querySelector('input[name="drinkType[]"]:checked').value;
	drinkSize = document.getElementById('drinkSize').value;
	switch (drinkSize) {
		case 'Small':
			drinkCost = 1.25;
			break;
		case 'Medium':
			drinkCost = 1.75;
			break;
		case 'Large':
			drinkCost = 2.00;
			break;
		default:
			drinkCost = 0;
	}
	numOfDrink = document.getElementById('numOfDrinks').value;

	drink.type = drinkType;
	drink.size = drinkSize;
	drink.cost = drinkCost;
	drink.toTalCost = numOfDrink * drinkCost;

	return drink;

}

function calcOrder() {
	var fName, lName, address, phoneNumber;

	fName = document.getElementById('firstName')
	lName = document.getElementById('lastName')
	address = document.getElementById('address')
	phoneNumber = document.getElementById('phone')


	var regFname = /[a-z]{1,15}/;
	var regLname = /[a-z]{1,15}/;
	var regPhoneNum = /[\d{2,3}-\d{3,4}-\d{4}]/;
	var fnameFormat = regFname.test(document.getElementById('firstName').value);
	var lnameFormat = regLname.test(document.getElementById('lastName').value);
	var phoneFormat = regPhoneNum.test(document.getElementById('phone').value);


	if(!fnameFormat){
		alert("You've got wrong first name format!!(a~z max 15 letters)");
		fName.value="";
		return fName.focus();
	}
	else if(!lnameFormat){
		alert("You've got wrong last name format!!(a~z max 15 letters)");
		lName.value="";
		return lName.focus();
	}
	else if(!phoneFormat){
		alert("Please make sure the correct phonenumber format!!");
		phoneNumber.value="";
		return phoneNumber.focus();
	}
	var Info = custInfo();

	/* if (fnameFormat && lnameFormat && phoneFormat) {
		var Info = custInfo();
	} else {
		return false;
	} */
	var pizza = calcPizza();
	var sandwich = calcSandwich();
	var drink = calcDrink();


	displayOrder(Info, pizza, sandwich, drink);
	checkCookie();
}



/* function calcOrder() {
	var Info = custInfo();
	var pizza = calcPizza();
	var sandwich = calcSandwich();
	var drink = calcDrink();


	displayOrder(Info, pizza, sandwich, drink);
} */



function displayOrder(custInfo, pizzaObj, sandwichObj, drinkObj) {
	var receipt = '';
	var receipt_CSS;
	receipt += '<h4>Customer Order</h4>';
	receipt += '<p><b>Full Name: </b>' + custInfo.fName + ' ' + custInfo.lName + '</p>';
	receipt += '<p><b>Address: </b>' + custInfo.address + '</p>';
	receipt += '<p><b>Phone Number: </b>' + custInfo.phoneNumber + '</p>';
	receipt += '<h4>Order Details</h4>';
	receipt += '<p>' + pizzaObj.quantity + ' ' + pizzaObj.size + ' ' + pizzaObj.type + ' $' + pizzaObj.cost.toFixed(2) + ' = $' + pizzaObj.toTalCost.toFixed(2) + '</p>';
	receipt += '<ul>';
	for (var i = 0; i < pizzaObj.toppings.length; i++) {
		receipt += '<li>' + pizzaObj.toppings[i] + '</li>';
	}
	receipt += '</ul>';
	receipt += '<h4>Sandwiches</h4>'
	receipt += '<p>' + sandwichObj.type + ' (' + sandwichObj.cost + ') ' + 'x ' + sandwichObj.numOfSandwich + ' = $' + sandwichObj.toTalCost + '</p>';
	receipt += '<p>' + drinkObj.numOfDrink + ', ' + drinkObj.size + ' ' + drinkObj.type + ' = $' + drinkObj.toTalCost + '</p>';
	receipt += '<p>Total Cost</p>';
	totalCostOfOrder = Number(pizzaObj.toTalCost.toFixed(2)) + Number(sandwichObj.toTalCost) + Number(drinkObj.toTalCost);
	receipt += '<h3>' + '$' + totalCostOfOrder.toFixed(2) + '</h3>';

	receipt_CSS = document.getElementById('displayOrder').innerHTML = receipt;
}





// /* Cookie Usage Functions */
// function submitForm() {
// 	checkCookie();
// 	// setCookie('sessionID', 'wefqwefqwef');
// }

/* checkCookie: 쿠키 체크 */
function checkCookie() {
	// alert(document.cookie);
	var fname = document.getElementById('firstName').value;
	
	var user = getCookie("username");
	if (user.username == fname && user.visited) {
		alert("Welcome back " + user.username + ", you visited here on " +  new Date(user.visitedOn).toTimeString());
		// console.log(document.cookie);
		setCookie("username", user.username, 365);
	} else {
		alert("Welcome New Customer!!");
		var newUser = fname;
		// console.log(newUser);
		if (newUser != null) {
			setCookie("username", newUser, 365);
		}
	}
}

/* setCookie : 쿠키 저장하기 */
function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	cvalue = JSON.stringify({
		username: cvalue,
		visited: true,
		visitedOn : d.getTime()
	});
console.log(cvalue);
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires+";date="+d+ ";path=/";
	// console.log(document.cookie);
	localStorage.setItem("username", cvalue);
}

/* getCookie : 쿠키 가져오기 */
function getCookie(cname) {
	var name = cname + "=";
	var cookieArray = document.cookie.split(';');
	
	for (var i = 0; i < cookieArray.length; i++) {
		
		var thisCookie = cookieArray[i];//console.log(thisCookie); 찍어보면 " username=저장된 value " 까지 나온다.

		/* while loop 없어도 되는듯 */
		while (thisCookie.charAt(0) == ' ') {
			thisCookie = thisCookie.substring(1,cookieArray.length);
			console.log('hi');
		}
		
		if ((thisCookie.indexOf(name) == 0)) { // console.log(name); 찍어보면 username= 까지 나온다. console.log(thisCookie.indexOf(name)); 해보면 0 이 나온다.
			console.log(name);														//즉 username= 이걸 찾으라는 거라서 0번째에서 찾았으므로 0이 출력된다.
			console.log(thisCookie.substring(name.length, thisCookie.length));

			var thisCookie = thisCookie.substring(name.length, thisCookie.length);//name의 길이 즉 username= 이것의 길이 부터, username=value 끝까지 찾는다. 즉 9번 부터 끝까지.
			return JSON.parse(thisCookie);
		}
	}
	return "";
}






/* Local Storage */
function submitForm(){
	var fname = document.getElementById('fname').value;
	var lname = document.getElementById('lname').value;

	var customer = {};
	customer.fname = fname;
	customer.lname = lname;
	
	localStorage.setItem("username", fname);//그냥 문자열을 넣어주려면 이렇게 한다.
	localStorage.setItem("username", JSON.stringify(customer));//객체를 받을 경우 이렇게 JSON 을 통해 문자열로 변환후 저장해야 할수 있다.
	console.log(JSON.parse(localStorage.getItem("username"))); //받은 객체를 출력 하려면 JSON.parse 를 사용한다. 
}