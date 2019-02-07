// Just initializes a submit button event handler
function init() {
	document.getElementById('submit-btn').addEventListener('click', function() {
		submitClicked();
	});
}

// Gets all the permutations of a string
// Stolen from Syntak on Stack Overflow
// https://stackoverflow.com/questions/39927452/recursively-print-all-permutations-of-a-string-javascript
function permut(string) {
	string = string.toLowerCase();
	if (string.length < 2) return string; // This is our break condition

	let permutations = []; // This array will hold our permutations

	for (let i = 0; i < string.length; i++) {
		let char = string[i];

		// Cause we don't want any duplicates:
		if (
			string.indexOf(char) != i // if char was used already
		)
			continue; // skip it this time

		let remainingString = string.slice(0, i) + string.slice(i + 1, string.length); //Note: you can concat Strings via '+' in JS

		for (let subPermutation of permut(remainingString)) permutations.push(char + subPermutation);
	}

	return permutations;
}

function addX(name) {
	let nameLen = name.length;
	let withoutXArr = permut(name);
	let nobodyNames = [];

	for (let i = 0; i <= nameLen; i++) {
		let temp = withoutXArr.map((elem) => elem.slice(0, i) + 'x' + elem.slice(i, nameLen));
		nobodyNames = nobodyNames.concat(temp);
	}

	return nobodyNames;
}

function purgeChildren(parentNode) {
	while (parentNode.firstChild) {
		parentNode.removeChild(parentNode.firstChild);
	}
}

function submitClicked() {
	// Take the name from the input field
	let name = document.getElementById('name-input').value;

	// For extra flair, a quote from the game
	let nameDiv = document.getElementById('name-div');
	nameDiv.textContent = `${name}. I can give you purpose...That is right - the new you.`;

	// Get all permutations of the name with an X added in at each possible position
	let results = addX(name);
	console.log(results);

	domResults = document.getElementById('results');

	purgeChildren(domResults);

	// Populate the ul element with all the results
	results.forEach((elem) => {
		let node = document.createElement('LI');
		let textnode = document.createTextNode(elem);
		node.appendChild(textnode);
		domResults.appendChild(node);
	});
}

init();
