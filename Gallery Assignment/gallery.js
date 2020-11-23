const albumView = document.querySelector('#album-view');
const modalView = document.querySelector('#modal-view');
var index = 0;
const photo_list = [
'Images/image1.jpg',
'Images/image2.jpg',
'Images/image3.jpg',
'Images/image4.jpg',
'Images/image5.jpg',
'Images/image6.jpg',
'Images/image7.jpg',
'Images/image8.jpg'
];

function createImage(src) {
	const image = document.createElement('img');
	image.src = src;
	return image;
}

function onThumbnailClick(event) {
	const image = createImage(event.currentTarget.src);
	index = parseInt(event.currentTarget.classList[0]);
	document.body.classList.add('no-scroll');
	modalView.style.top = window.pageYOffset + 'px';
	modalView.appendChild(image);
	modalView.classList.remove('hidden');
}

function onModalClick() {
	document.body.classList.remove('no-scroll');
	modalView.classList.add('hidden');
	modalView.innerHTML = '';
}

function onKeyUp(event) {
  if (event.key == 'ArrowRight' && index < photo_list.length-1) {
  	index = index + 1;
  	modalView.innerHTML = '';
  	var image = createImage(photo_list[index]);
  	modalView.appendChild(image);
  }
  else if (event.key == 'ArrowLeft' && index > 0) {
  	index = index - 1;
  	modalView.innerHTML = '';
  	var image = createImage(photo_list[index]);
  	modalView.appendChild(image);
  }
}


for(let i = 0; i < photo_list.length; i++) {
	const photoSrc = photo_list[i];
	const image = createImage(photoSrc);
	image.classList.add(i);
	image.addEventListener('click', onThumbnailClick);
	albumView.appendChild(image);
}

modalView.addEventListener('click', onModalClick);
document.addEventListener('keyup', onKeyUp);
