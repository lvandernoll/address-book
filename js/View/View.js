class View {

	constructor() {
		// Set current page href to #address-book when loading page
		window.location = document.querySelector('#address-book').href;

		this.detailPage = document.querySelector('#detailPage');
		this.contactsPage = document.querySelector('#contactsPage');
		this.peopleList = document.querySelector('#peopleList');
		this.lineTemplate = document.querySelector('#lineTemplate');
		this.detailActive = false;

		document.querySelector('#returnButton').addEventListener('click', e => {this.switchDetailPage();});
	}

	showPeopleList(peopleArray) {
		// let allFirstLetters = [];
		let previousLetter = '';
		peopleArray.forEach(person => {
			// let newLetter = true;
			// allFirstLetters.forEach(letter => {
			// 	if(person.name.first[0] === letter) newLetter = false;
			// });
			// if(newLetter) allFirstLetters.push(person.name.first[0]);

			let newPersonNode = new Person(person.picture.large, `${person.name.first} ${person.name.last}`, person.phone);
			if(person.name.first[0] !== previousLetter) {
				newPersonNode.classList.toggle('person-block--no-border');
				const CLONE = this.lineTemplate.cloneNode(true);
				CLONE.classList.remove('hidden');
				CLONE.querySelector('.person-line__letter').innerText = person.name.first[0];
				this.peopleList.appendChild(CLONE);
				previousLetter = person.name.first[0];
			}
			newPersonNode.addEventListener('click', () => {
				this.fillDetailPage(person);
				this.switchDetailPage();
			});
			this.peopleList.appendChild(newPersonNode);
		});
		console.log(allFirstLetters);
	}

	fillDetailPage(person) {
		this.detailPage.querySelector('#detailImage').style.backgroundImage = `url(${person.picture.large})`;;
		this.detailPage.querySelector('#detailName').innerText = `${person.name.first} ${person.name.last}`;
		this.detailPage.querySelector('#detailFunction').innerText = 'Designer at Competa';
		this.detailPage.querySelector('#detailMobilePhone').innerText = person.cell;
		this.detailPage.querySelector('#detailWorkPhone').innerText = person.phone;
		this.detailPage.querySelector('#detailWorkMail').innerText = person.email;
		this.detailPage.querySelector('#detailPersonalMail').innerText = person.email;
	}

	switchDetailPage() {
		if(this.detailActive) {
			this.detailPage.style.left = '-150%';
			this.contactsPage.style.height = '91vh';
		} else {
			this.detailPage.style.left = '0';
			setTimeout(()=>{this.contactsPage.style.height = '0';}, 1000);
		}
		this.detailActive = !this.detailActive;
	}

	setPageTransition(time) {
		this.detailPage.style.transition = `left ${time} ease`
	}
}
