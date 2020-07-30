type playerValues = 'X' | 'O'
let currentPlayer: playerValues = 'X'
const container: Element = document.querySelector('.container')!

const changePlayer = (): void => {
	currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
}

class Box {
	currentValue: string = ''
	changeBoxValue = (): string => {
		if (this.currentValue === '') {
			this.currentValue = currentPlayer
		}
		return this.currentValue
	}
}

let objArray: Box[][] = []

const numberOfValuesFilled = (): number => {
	let count: number = 0
	objArray.map(objRow =>
		objRow.map(obj => (obj.currentValue !== '' ? count++ : null))
	)
	return count
}
//1 for win, 2 for draw
const check = (): number => {
	//check for draw
	if (numberOfValuesFilled() === 9) return 2

	//check for win

	//for all rows
	for (let i = 0; i < 3; i++) {
		let value1 = objArray[i][0].currentValue
		let value2 = objArray[i][1].currentValue
		let value3 = objArray[i][2].currentValue
		if (value1 === value2 && value2 === value3 && value1 !== '') return 1
	}

	//for column
	for (let j = 0; j < 3; j++) {
		let value1 = objArray[0][j].currentValue
		let value2 = objArray[1][j].currentValue
		let value3 = objArray[2][j].currentValue
		if (value1 === value2 && value2 === value3 && value1 !== '') return 1
	}

	//for diagonal

	//for major diagonal
	let majorDiagVal1 = objArray[0][0].currentValue
	let majorDiagVal2 = objArray[1][1].currentValue
	let majorDiagVal3 = objArray[2][2].currentValue

	if (
		majorDiagVal1 === majorDiagVal2 &&
		majorDiagVal2 === majorDiagVal3 &&
		majorDiagVal1 !== ''
	) {
		return 1
	}

	//for minor diagonal
	let minorDiagVal1 = objArray[0][2].currentValue
	let minorDiagVal2 = objArray[1][1].currentValue
	let minorDiagVal3 = objArray[2][0].currentValue

	if (
		minorDiagVal1 === minorDiagVal2 &&
		minorDiagVal2 === minorDiagVal3 &&
		minorDiagVal1 !== ''
	) {
		return 1
	}
	return 0
}

const createBoard = (): void => {
	for (let i = 0; i < 3; i++) {
		let objRow: Box[] = []
		let row: HTMLDivElement = document.createElement('div')
		row.classList.add('row')
		for (let j = 0; j < 3; j++) {
			let col: HTMLDivElement = document.createElement('div')
			col.classList.add(
				'col',
				'd-flex',
				'align-items-center',
				'justify-content-center'
			)
			col.id = `col${i + 1}${j + 1}`
			let obj = new Box()
			objRow.push(obj)
			col.innerHTML = obj.currentValue

			if (i !== 2) col.classList.add('border-bottom', 'border-light')
			if (j !== 2) col.classList.add('border-right', 'border-light')

			col.addEventListener('click', (): void => {
				col.innerText = obj.changeBoxValue()
				const status = check()
				if (status === 1) playerWin.innerHTML = `${currentPlayer} won!`
				else if (status === 2) playerWin.innerHTML = 'Game draw!'
				changePlayer()
				changePlayerIndicator()
			})
			row.appendChild(col)
		}
		objArray.push(objRow)
		container.appendChild(row)
	}
}
createBoard()

const changePlayerIndicator = (): void => {
	turnIndicator.innerHTML = `${currentPlayer}'s Turn`
}

const turnIndicator: HTMLHeadingElement = document.createElement('h4')
turnIndicator.innerHTML = `${currentPlayer}'s Turn`
document.body.appendChild(turnIndicator)

const playerWin = document.createElement('h4')
document.body.appendChild(playerWin)

const button: HTMLButtonElement = document.createElement('button')
button.classList.add('btn', 'btn-light', 'mt-5')
button.innerHTML = 'Reset'
button.addEventListener('click', (): void => {
	container.innerHTML = ''
	objArray = []
	createBoard()
	currentPlayer = 'X'
	changePlayerIndicator()
})
document.body.appendChild(button)