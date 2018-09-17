class Controller {
	
	constructor() {
		this.view = new View();

		let peopleAmount = 20;
		let pageTransitionTime = '1s';
		this.peopleArray = [];
		
		this.loadPeople(peopleAmount);
		this.view.setPageTransition(pageTransitionTime);
		this.view.setFooterIcons();
	}
	
	loadPeople(peopleAmount) {
		fetch(`https://randomuser.me/api/?nat=nl&inc=picture,name,phone,cell,email&results=${peopleAmount}`)
		.then(response => response.json())
		.then(responseJSON => {
			this.peopleArray = responseJSON.results.sort((a, b) => {
				return (a.name.first > b.name.first) ? 1 : ((b.name.first > a.name.first) ? -1 : 0);
			});
			this.view.showPeopleList(this.peopleArray);
			this.view.setLetterList();
			this.view.fillDetailPage(this.peopleArray[0]);
		})
		.catch(error => console.error(error));
	}
}
