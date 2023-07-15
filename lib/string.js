// string functions

// capitalize the first letter of all words
export const capitalize = (string) => {
	return string
		.trim()
		.toLowerCase()
		.split(' ')
		.map((word) => word.at(0).toUpperCase() + word.slice(1))
		.join(' ');
};

