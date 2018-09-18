class View {

	constructor() {
		this.detailPage = document.querySelector('#detailPage');
		this.contactsPage = document.querySelector('#contactsPage');
		this.peopleList = document.querySelector('#peopleList');
		this.lineTemplate = document.querySelector('#lineTemplate');
		this.letterList = document.querySelectorAll('.letter-list__letter');
		this.footerIcons = document.querySelectorAll('.footer__image');
		this.detailActive = false;
		this.allFirstLetters = [];

		document.querySelector('#returnButton').addEventListener('click', e => {this.switchDetailPage();});
	}

	showPeopleList(peopleArray) {
		this.allFirstLetters = [];
		let previousLetter = '';
		peopleArray.forEach(person => {
			let newLetter = true;
			this.allFirstLetters.forEach(letter => {
				if(person.name.first[0] === letter) newLetter = false;
			});
			if(newLetter) this.allFirstLetters.push(person.name.first[0]);

			let newPersonNode = new Person(person.picture.large, `${person.name.first} ${person.name.last}`, person.phone);
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
			} else {
				letterNode.classList.add('letter-list__letter--faded');
			}
		})
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
		if(this.detailActive) this.detailPage.style.left = '-150%';
		else this.detailPage.style.left = '0';
		this.detailActive = !this.detailActive;
	}

	setPageTransition(time) {
		this.detailPage.style.transition = `left ${time} ease`
	}

	setFooterIcons() {
		this.footerIcons.forEach(footerIcon => {
			footerIcon.addEventListener('click', e => {
				this.footerIcons.forEach(icon => {
					icon.classList.remove('footer__image--selected');
				});
				e.target.classList.add('footer__image--selected');
			});
		});
	}
}
