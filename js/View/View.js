class View {

	constructor() {
		// View
		this.detailPage = document.querySelector('#detailPage');
		this.peopleList = document.querySelector('#peopleList');

		this.detailActive = false;
	}

	showPeopleList(peopleArray) {
		peopleArray.forEach(person => {
			this.peopleList.appendChild(new Person(person.picture.large, `${person.name.first} ${person.name.last}`, person.phone));
		});
	}

	switchDetailPage() {
		if(this.detailActive) this.detailPage.style.left = '0';
		else this.detailPage.style.left = '150%';
		this.detailActive = !this.detailActive;
	}
}
