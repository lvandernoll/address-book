window.onload = () => {
	const CONTROLLER = new Controller();
}

class Controller {
	
	constructor() {
		const VIEW = new View();
		const PEOPLE_LIST = document.querySelector('#peopleList');

		let peopleAmount = 2;
		
		this.loadPeople(peopleAmount, VIEW, PEOPLE_LIST);
	}
	
	loadPeople(peopleAmount, view, peopleList) {
		fetch(`https://randomuser.me/api/?nat=nl&inc=picture,name,phone,cell,email&results=${peopleAmount}`)
		.then(response => response.json())
		.then(responseJSON => {
			view.showPeopleList(peopleList, responseJSON.results);
		})
		.catch(error => console.error(error));
	}
}

class Person {

	constructor(imagePath, name, phoneNumber) {
		const PERSON_TEMPLATE = document.querySelector('#personTemplate');
		const CLONE = PERSON_TEMPLATE.cloneNode(true);
		CLONE.classList.remove('hidden');
		CLONE.querySelector('.person__image').src = imagePath;
		CLONE.querySelector('.person__name').innerText = name;
		CLONE.querySelector('.person__phone-number').innerText = phoneNumber;

		return CLONE;
	}
}

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
