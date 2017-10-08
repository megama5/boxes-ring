let ADD_EVENT = new Event('addRing',{ bubbles: true, cancelable: true });
let NOT_FOUND_EVENT = new Event('notFoundRing',{ bubbles: true, cancelable: true });
let FOUND_EVENT = new Event('foundRing',{ bubbles: true, cancelable: true });



document.addEventListener('DOMContentLoaded', (e) => {

	const clearDataSets = () =>{
		document.querySelectorAll('.room__person[data-lucky="1"]').forEach( (e) =>{
			delete e.dataset.lucky;
		});	
	}

	const initGame = () =>{
		
		clearDataSets();
		// init lucky button
		let buttons = document.querySelectorAll('.room__person');
		let luckyOne = Math.floor( Math.random() * buttons.length );
		buttons[luckyOne].dataset.lucky = 1;
		buttons[luckyOne].dispatchEvent(ADD_EVENT);
		return buttons;
	};

	let outPut = document.getElementById('output');
	const addMessage = (messege) =>{
		outPut.value += messege + '\n';
		outPut.scrollTop = outPut.scrollHeight;
	}

	//lets the game begin
	let p = '', p1 = '';
	document.getElementById('room').addEventListener('addRing', (e) => {
		addMessage('Начало игры - монетка добавлена');
	});
	document.getElementById('room').addEventListener('notFoundRing', (e) => {
		addMessage( p + 'тут монетки нет' + p1 );
		p = 'и '; p1 = ' тоже'
	});
	document.getElementById('room').addEventListener('foundRing', (e) => {
		addMessage( 'Монетка найдена - конец текущей игры' );
		addMessage( '*************************************' );
		addMessage( 'Данные обновлены! Игрe можно попробовать снова :)' );
		initGame();
		p = '';
		p1 = '';
	});

	let buttons = initGame();
	buttons.forEach( (b) => {
		b.addEventListener('click', (e) => {
				if( e.target.dataset.lucky === undefined ){
					e.target.dispatchEvent(NOT_FOUND_EVENT);
				}else{
					e.target.dispatchEvent(FOUND_EVENT);
				}
		});
	})


});