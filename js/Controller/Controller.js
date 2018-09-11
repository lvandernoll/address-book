class Controller {
	
	constructor() {
		this.view = new View();

		let peopleAmount = 20;
		this.peopleArray = [];
		
		this.loadPeople(peopleAmount);
	}
	
	loadPeople(peopleAmount) {
		fetch(`https://randomuser.me/api/?nat=nl&inc=picture,name,phone,cell,email&results=${peopleAmount}`)
		.then(response => response.json())
		.then(responseJSON => {
			this.peopleArray = responseJSON.results
			this.view.showPeopleList(this.peopleArray);
			this.view.fillDetailPage(this.peopleArray[0]);
		})
		.catch(error => console.error(error));
	}
}
