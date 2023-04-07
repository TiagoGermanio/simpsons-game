const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player')
const timer = document.querySelector('.timer');
const cardPersonagems = [
    'bruxas',
    'cat',
    'familia',
    'irmas',
    'lisa',
    'marge',
    'palhaco',
    'quadro',
    'sorvete',
    'invertido',
];



const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let fristCard = '';
let secondCard = '';

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');
    if(disabledCards.length === 20){
        clearInterval(this.contador);
        alert(`Parabéns, ${spanPlayer.innerHTML} você conseguiu e seu tempo foi: ${timer.innerHTML}`);
        
    }
}

const checkCards = () => {
const fristPersonagem = fristCard.getAttribute('data-cardPersonagem');
const secondPersonagem = secondCard.getAttribute('data-cardPersonagem');

    if(fristPersonagem === secondPersonagem){
        fristCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        fristCard = '';
        secondCard = '';

        checkEndGame();

    }else {
    setTimeout(()=>{
    
    fristCard.classList.remove('reviw-card');
    secondCard.classList.remove('reviw-card');

    fristCard = '';
    secondCard = '';

    }, 500);
    
    }
}
const revelaCard = ({target}) => {
    if(target.parentNode.className.includes('reviw-card')){
        return;
    }
    if(fristCard === ''){

       target.parentNode.classList.add('reviw-card');
       fristCard = target.parentNode;

    }else if(secondCard === ''){
        
        target.parentNode.classList.add('reviw-card');
        secondCard = target.parentNode;

        checkCards()
    }

    
}

const createCard = (cardPersonagem) => {
    const card = createElement('div','card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../img/${cardPersonagem}.jpg')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revelaCard);
    card.setAttribute('data-cardPersonagem', cardPersonagem);

    return card;
}

const loadGame = () => {
const duplicatePersonagem = [ ...cardPersonagems, ...cardPersonagems ];
const sorteioDePersonagens = duplicatePersonagem.sort(() => Math.random() - 0.5);

sorteioDePersonagens.forEach((cardPersonagem) => {
        

        const card = createCard(cardPersonagem);
        grid.appendChild(card);
    });
}

const startTimer = () => {
    this.contador = setInterval(() => {
        const currentTime = + timer.innerHTML;
        timer.innerHTML = currentTime + 1;
    }, 1000);
}
window.onload = () => {
    const playerName = localStorage.getItem('player');
    spanPlayer.innerHTML = 'Jogador: ' + playerName;
    startTimer();
    loadGame();

}

