function imgSlider(anything) {
	document.querySelector('.fusetea').src = anything;
}

function changeBgColor(color) {
	const sec = document.querySelector('.sec');
	sec.style.background = color;
}

function changeText(txt) {
	document.querySelector('h3').innerHTML = txt;
}