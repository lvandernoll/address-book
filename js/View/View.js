class View {

	constructor() {
		this.detailPage = document.querySelector('#detailPage');
		this.contactsPage = document.querySelector('#contactsPage');
		this.peopleList = document.querySelector('#peopleList');
		this.lineTemplate = document.querySelector('#lineTemplate');
		this.letterList = document.querySelectorAll('.letter-list__letter');
		this.detailActive = false;
		this.transitionTime;
		this.allFirstLetters = [];
		this.peopleListTemplates = [];
		this.peopleList.childNodes.forEach(child => {
			this.peopleListTemplates.push(child);
		});

		document.querySelector('#returnButton').addEventListener('click', () => {this.switchDetailPage();});
	}

	showPeopleList(peopleArray) {
		this.allFirstLetters = [];
		let previousLetter = '';
		this.peopleList.innerHTML = '';
		this.peopleListTemplates.forEach(template => {
			this.peopleList.appendChild(template);
		});
		peopleArray.forEach(person => {
			let newLetter = true;
			this.allFirstLetters.forEach(letter => {
				if(person.name.first[0] === letter) newLetter = false;
			});
			if(newLetter) this.allFirstLetters.push(person.name.first[0]);

			let newPersonNode = new Person(person.picture.large, person.name.full, person.phone);
			if(person.name.first[0] !== previousLetter) {
				newPersonNode.classList.toggle('person-block--no-border');
				const CLONE = this.lineTemplate.cloneNode(true);
				CLONE.classList.remove('hidden');
				CLONE.querySelector('.person-line__letter').innerText = person.name.first[0];
				CLONE.querySelector('.person-line__letter').setAttribute('id', person.name.first[0]);
				this.peopleList.appendChild(CLONE);
				previousLetter = person.name.first[0];
			}
			newPersonNode.addEventListener('click', () => {
				this.fillDetailPage(person);
				this.switchDetailPage();
			});
			this.peopleList.appendChild(newPersonNode);
		});
	}

	setLetterList() {
		this.letterList.forEach(letterNode => {
			let isActive = false;
			this.allFirstLetters.forEach(letter => {
				if(letterNode.innerHTML === letter) isActive = true;
			});
			if(isActive) {
				letterNode.setAttribute('href', `#${letterNode.innerHTML}`);
				letterNode.classList.remove('letter-list__letter--faded');
			} else {
				letterNode.removeAttribute('href');
				letterNode.classList.add('letter-list__letter--faded');
			}
		});
	}

	fillDetailPage(person) {
		this.detailPage.querySelector('#detailImage').style.backgroundImage = `url(${person.picture.large})`;;
		this.detailPage.querySelector('#detailName').innerText = person.name.full;
		this.detailPage.querySelector('#detailFunction').innerText = 'Designer at Competa';
		this.detailPage.querySelector('#detailMobilePhone').innerText = person.cell;
		this.detailPage.querySelector('#detailWorkPhone').innerText = person.phone;
		this.detailPage.querySelector('#detailWorkMail').innerText = person.email;
		this.detailPage.querySelector('#detailPersonalMail').innerText = person.email;
	}

	switchDetailPage() {
		if(this.detailActive) {
			this.detailPage.style.left = '-150%';
			this.contactsPage.style.height = '84vh';
		}
		else {
			this.detailPage.style.left = '0';
			setTimeout(() => {
				this.contactsPage.style.height = '0';
			}, this.transitionTime);
		}
		this.detailActive = !this.detailActive;
	}

	setPageTransition(time) {
		this.transitionTime = time.replace(/s/, '') * 1000;
		this.detailPage.style.transition = `left ${time} ease`
	}
}
