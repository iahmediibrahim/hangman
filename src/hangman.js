class Hangman {
    constructor(word = [], remainingGuesses) {
        this.word = word.toLowerCase().split('')
        this.remainingGuesses = remainingGuesses
        this.gussedLetters = []
        this.status = 'playing'
    }
    makeGuess(guess) {
        guess = guess.toLowerCase()
        const isUnique = !this.gussedLetters.includes(guess)
        const isBadGuess = !this.word.includes(guess)
        if (this.status !== 'playing') return
        if (isUnique) {
            this.gussedLetters.push(guess)
        }
        if (isUnique && isBadGuess) {
            this.remainingGuesses--
        }
        this.calculateStatus()
    }
    get puzzle() {
        let puzzle = ''
        this.word.forEach(letter => {
            if (this.gussedLetters.includes(letter) || letter === ' ') {
                puzzle += letter
            } else {
                puzzle += '*'
            }
        })
        return puzzle
    }
    calculateStatus() {
        const finished = this.word.every(letter => this.gussedLetters.includes(letter) || letter === ' ')

        if (this.remainingGuesses === 0) {
            this.status = 'failed'
        } else if (finished) {
            this.status = 'finished'
        } else {
            this.status = 'playing'
        }
    }
    get statusMessage() {
        let result = ''
        if (this.status === 'playing') {
            result = `Guesses left: ${this.remainingGuesses}.`
        } else if (this.status === 'failed') {
            result = `Nice try! The word was "${this.word.join('')}".`
        } else {
            result = `Great work! You guessed the word.`
        }
        return result
    }
}

export {
    Hangman as
    default
}