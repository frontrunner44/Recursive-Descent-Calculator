//const equation = "1+2+10/(2-3)*60*20+(10/2+(5+6/(7+8*(9/10))/7-2.50*400))";
const pattern = /(\d+\.\d+|\d+|\+|\-|\*|\^|\/|\(|\))/g;

$("button").click(function(){
	const equation = document.getElementById('equation').value
	const finishedResult = calculateMain(equation.match(pattern));
	$("#scount").html(finishedResult);
});

function calculateMain(a){
	console.log(`Working with equation ${a}`);
	while(a.length > 1){
		let lengthCheck = a.length;
		if(a.includes("(")) { handlePara(a); } // Handles parenthesis if they are found.
		if(notPresent(["("])) {performCalc("^")} // If no parenthesis is found, move to exponents.
		if(notPresent(["(","^"])) { performCalc("*","/"); } // Only move to multiplication/division if there are no parenthesis or exponents.
		if(notPresent(["*","/"])) { performCalc("+","-"); } // Only move to add/subtract if there are no more * or /
		if(lengthCheck === a.length || isNaN(a[0])) {
			console.log("Problem with calculation. Please make sure you're entering a valid equation.");
			return "Error"; // Exits the loop if the length hasn't changed, implying no successful operations took place on this iteration.
		}
	console.log(`Continuing calculations with ${a}`);
	}
	return a[0];

	// The function that actually runs the calculations depending on which operator is chosen.
	function performCalc(op1,op2) {
		const opIndex = a.findIndex(operator => operator === op1 || operator === op2); // Finds the first of the two provided operators and returns it's index.
		if(opIndex !== -1) {
			const num1 = a[opIndex-1]; // Stores the number before the operator as a variable.
			const num2 = a[opIndex+1]; // Stores the number after the operator as a variable.
			 if (a[opIndex] === "/" && parseFloat(num2) === 0) {
            	console.log("Division by zero is not allowed.");
            	$("#scount").html("Division by zero is not allowed.");
            	return "Error";
        	}
			let result; // declare a variable to store the result of the calculation later

			switch(a[opIndex]) {
				case "^":
					result = num1 ** num2;
					break;
				case "*":
					result = num1 * num2;
					break;

				case "/":
					result = num1 / num2;
					break;

				case "+":
					result = parseFloat(num1) + parseFloat(num2); // REMEMBER + ON STRINGS WILL CONCAT THEM SO THEY MUST BE CONVERTED
					break;

				case "-":
					result = num1 - num2;
					break;
			}
			a.splice(opIndex-1,3,result); // Deletes the operator index as well as the index in front of and behind it, then adds the result where those indexes were.
		}
	}

	function notPresent(opsToCheck) {
		for(let i=0;i<opsToCheck.length;i++) {
			if(a.indexOf(opsToCheck[i]) !== -1) {
				return false;
			}
		}
		return true;
	}

	function handlePara(currentArray) {
		let openPara = currentArray.lastIndexOf("("); // Stores the index of the last "("
		if(openPara !== -1) {
			let closePara = currentArray.indexOf(")",openPara); // The last "(" is always associated with the next ")" to appear after it.
			let newArray = currentArray.slice(openPara+1,closePara); // Creates a new array from the old array's indexes that are between the parenthesis we're currently working with.
			console.log(`New equation found in parenthesis and being sent for calculation: ${newArray}`); 
			let spliceNum = closePara - openPara + 1;
			currentArray.splice(openPara,spliceNum,calculateMain(newArray)); // Sends this new array to be processed through the calcMain function, returns the result and replaces the parenthesized section it was taken from.
			console.log(`New equation after solving parenthesis is ${currentArray}. Continuing calculation.`);
		}
	}
}