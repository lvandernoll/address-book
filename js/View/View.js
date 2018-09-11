class View {

	constructor() {
		// View
	}

	showPeopleList(output, peopleArray) {
		peopleArray.forEach(person => {
			output.appendChild(new Person(person.picture.large, `${person.name.first} ${person.name.last}`, person.phone));
		});
	}
}
