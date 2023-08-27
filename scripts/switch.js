const equation = "1+2-20";
const pattern = /(\d+|\+|\-|\*|\/|\(|\))/g;
let a = equation.match(pattern);
console.log(calculateMain());

function calculateMain(){	
	while(a.length > 1){
		let lengthCheck;
		performCalc("*","/");
		if(a.indexOf("*") === -1 && a.indexOf("/") === -1) { performCalc("+","-"); } // Only move to add/subtract if there are no more * or /
		if(lengthCheck === a.length) {
			console.log("Problem with calculation. Please make sure you're entering a valid equation.");
			break; // Exits the loop if the length hasn't changed, implying no successful operations took place on this iteration.
		}
	}
	return a[0];

	// The function that actually runs the calculations depending on which operator is chosen.
	function performCalc(op1,op2) {
		switch(whichFirst([op1,op2])) {
			case "*":
				const multIndex = a.indexOf("*"); // store the index of the first "*" found
				const multResult = parseFloat(a[multIndex-1]) * parseFloat(a[multIndex+1]);
				adjustEquation(multIndex,multResult);
				break;

			case "/":
				const divIndex = a.indexOf("/"); // store the index of the first "/" found
				const divResult = parseFloat(a[divIndex-1]) / parseFloat(a[divIndex+1]);
				adjustEquation(divIndex,divResult);
				break;

			case "+":
				const addIndex = a.indexOf("+"); // store the index of the first "+" found
				const addResult = parseFloat(a[addIndex-1]) + parseFloat(a[addIndex+1]);
				adjustEquation(addIndex,addResult);
				break;

			case "-":
				const minusIndex = a.indexOf("-"); // store the index of the first "-" found
				const minusResult = parseFloat(a[minusIndex-1]) - parseFloat(a[minusIndex+1]);
				adjustEquation(minusIndex,minusResult);
				break;

			default:
				break;

		}
	}

	// Function that determines the proper order of operations by finding which of two operators comes first.
	function whichFirst(operators) {
		for(let i=0; i<a.length; i++) {
			if(a[i] === operators[0] || a[i] === operators[1]) {
				return a[i];
			}
		}
	}

	// Function to adjust the equation array once a calculation is performed. 
	function adjustEquation(index,result) {
		a.splice(index+2,0,result); // Takes the result and places it after the equation (so in 1+2, places it after 2)
		a.splice(index-1,3); // Removes the equation from the array. So removes [1,+,2] from the array.
	}
}