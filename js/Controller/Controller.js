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
