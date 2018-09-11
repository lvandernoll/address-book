class Controller {
	
	constructor() {
		this.view = new View();

		let peopleAmount = 2;
		
		this.loadPeople(peopleAmount);

		this.view.switchDetailPage();
	}
	
	loadPeople(peopleAmount) {
		fetch(`https://randomuser.me/api/?nat=nl&inc=picture,name,phone,cell,email&results=${peopleAmount}`)
		.then(response => response.json())
		.then(responseJSON => {
			this.view.showPeopleList(responseJSON.results);
		})
		.catch(error => console.error(error));
	}
}
