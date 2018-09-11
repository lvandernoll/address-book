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
