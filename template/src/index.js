/*
	Get configuration parameters and initialize the web page;
*/

(async function () {
	const fecthResult = await fetch('./onepunch.json');
	const config = await fecthResult.json();
	init(config);
})();

/*
	Initialize services
*/

function init(config) {
	addEventListeners(config);
	setBorders(config.width, config.height);
	addProgress(config);
}

/*
	Add event listeners
*/

function addEventListeners(config) {
	window.addEventListener(
		'keydown',
		handleOnkeydown,
	);
	window.addEventListener(
		'resize',
		() => setBorders(config.width, config.height),
	);
}

/*
 Set article borders
*/

function setBorders(width, height) {
	const articles = document.querySelectorAll('main > article');
	const borderLeft = Math.max(0, (window.innerWidth - width) / 2);
	const borderTop = Math.max(0, (window.innerHeight - height) / 2);
	articles.forEach(elt => {
		elt.style.borderWidth = `${borderTop}px ${borderLeft}px`;
	});
}

/*
	Change slide with arrow keys
*/

function handleOnkeydown(event) {
	const {keyCode} = event;
	const LEFT = 37;
	const UP = 38;
	const RIGHT = 39;
	const DOWN = 40;
	switch (keyCode) {
		case RIGHT:
		case DOWN:
			window.scrollBy(0, window.innerHeight);
			break;
		case UP:
		case LEFT:
			window.scrollBy(0, -window.innerHeight);
			break;
		// No default
	}
}

/*
	Add progress to each slide based on config
*/

function addProgress(config) {
	if(!config.progress || config.progress === 'none') {
		return;
	}

	const articles = [...document.querySelectorAll()('main > article')];

	if(config.progress === 'line') {
		articles.forEach((article, index) => {
			const line = document.createElement('div');
			line.classList.add("progress-line");
			article.appendChild(line);
	
			line.style.backgroundColor = 'var(--primary-color, #000)';
			
			line.style.height = '3px';
			line.style.position = 'absolute';
			
			line.style.bottom = '0';
			line.style.left = '0';
			
			const normIndex = index / (articles.length - 1);
	
			line.style.width = `${config.width * normIndex}px`;
		})
	}
}
