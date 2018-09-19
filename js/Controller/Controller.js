class Controller {
	
	constructor() {
		this.view = new View();

		this.footerIcons = document.querySelectorAll('.footer__image');
		this.searchBar = document.querySelector('#searchBar');

		let peopleAmount = 20;
		let pageTransitionTime = '1s';
		this.peopleArray = [];

		this.loadPeople(peopleAmount);
		this.view.setPageTransition(pageTransitionTime);
		this.setFooterIcons();
		this.setSearchBar();
	}
	
	loadPeople(peopleAmount) {
		fetch(`https://randomuser.me/api/?nat=nl&inc=picture,name,phone,cell,email&results=${peopleAmount}`)
		.then(response => response.json())
		.then(responseJSON => {
			this.peopleArray = responseJSON.results.sort((a, b) => {
				return (a.name.first > b.name.first) ? 1 : ((b.name.first > a.name.first) ? -1 : 0);
			});
			this.peopleArray.forEach(person => {
				person.name.full = `${person.name.first} ${person.name.last}`;
			});
			this.view.showPeopleList(this.peopleArray);
			this.view.setLetterList();
			this.view.fillDetailPage(this.peopleArray[0]);
		})
		.catch(error => console.error(error));
	}

	setFooterIcons() {
		this.footerIcons.forEach(footerIcon => {
			footerIcon.addEventListener('click', e => {
		this.peopleList = document.querySelector('#peopleList');
				this.footerIcons.forEach(icon => {
					icon.classList.remove('footer__image--selected');
				});
				e.target.classList.add('footer__image--selected');
			});
		});
	}

	setSearchBar() {
		this.searchBar.addEventListener('input', () => {
			if(this.searchBar.value === '') return this.view.showPeopleList(this.peopleArray);
			let filteredPeopleArray = [];
			this.peopleArray.forEach(person => {
				if(person.name.full.includes(this.searchBar.value)) filteredPeopleArray.push(person);
			});
			this.view.showPeopleList(filteredPeopleArray);
			this.view.setLetterList();
		});
	}
}
