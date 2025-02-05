class Calculator {
    constructor(prevTextElement, currTextElement){
        this.prevTextElement = prevTextElement
        this.currTextElement = currTextElement
        this.clear()
    }
    
    clear(){
        this.currOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }
    
    delete(){
        this.currOperand = this.currOperand.toString().slice(0,-1)
    }
    
    appendNumber(number){
        if(number==='.' && this.currOperand.includes('.')) return
        this.currOperand = this.currOperand.toString() + number.toString()
    }
    
    chooseOperation(operation){
        if(this.currOperand === '') return
        if(this.previousOperand !==''){
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currOperand
        this.currOperand = ''
    }
    
    compute(){
        let computation
        const prev = parseFloat(this.previousOperand)
        const curr = parseFloat(this.currOperand)
        if(isNaN(prev) || isNaN(curr)) return 
        switch (this.operation){
            case '+':
                computation = prev + curr
                break
            case '-':
                computation = prev - curr
                break
            case '*':
                computation = prev * curr
                break
            case '%':  
                computation = prev / curr
                break
            default:
                return
        }
        this.currOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        const floatNumber = parseFloat(number)
        let integerDisplay
        if(isNaN(integerDigits)){
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay(){
        this.currTextElement.innerText = this.getDisplayNumber(this.currOperand)
        if(this.operation != null){
            this.prevTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.prevTextElement.innerText = ''
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const ACButton = document.querySelector('[data-AC]')
const delButton = document.querySelector('[data-del]')
const prevTextElement = document.querySelector('[data-previousOperand]')
const currTextElement = document.querySelector('[data-currentOperand]')

const calc = new Calculator(prevTextElement, currTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calc.appendNumber(button.innerText)
        calc.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calc.chooseOperation(button.innerText)
        calc.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calc.compute()
    calc.updateDisplay()
})

ACButton.addEventListener('click', button => {
    calc.clear()
    calc.updateDisplay()
})

delButton.addEventListener('click', button => {
    calc.delete()
    calc.updateDisplay()
})