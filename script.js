//#region DataSource
class Game {
    constructor(name, price, imageUrl, genres) {
        this.name = name
        this.price = price
        this.imageUrl = imageUrl
        this.genres = genres
    }
}

const DevilMayCry5 = new Game('Devil May Cry 5', 99.90, 'PhImgs/DMC5.jpg', ["Hack N' Slash", 'Action'])
const GodOfWar = new Game('God Of War', 199.90, 'PhImgs/GOW5.jpg', ['Action', 'Adventure'])
const Bayonetta = new Game('Bayonetta', 36.99, 'PhImgs/Bayonetta.jpg', ["Hack N' Slash", 'Action'])
const NieRAutomata = new Game('NieR:Automata', 107.00, 'PhImgs/NieR.jpg', ['Action', 'RPG'])
const FinalFantasyXV = new Game('Final Fantasy XV', 125.00, 'PhImgs/FFXV.jpg', ['RPG', 'Fantasy'])
const ResidentEvilVillage = new Game('Resident Evil Village', 139.00, 'PhImgs/REVIII.jpg', ['Survival Horror', 'Action'])

const allGames = [
    ResidentEvilVillage,
    FinalFantasyXV,
    DevilMayCry5,
    GodOfWar,
    Bayonetta,
    NieRAutomata
]
//#endregion
//#region Dropdown Menu
const dropdownButton = document.querySelector('nav span')
const dropdownMenu = document.querySelector('nav div')

var showing = false
dropdownButton.onclick = () => {
    if (showing === false) {
        dropdownMenu.style.display = 'flex'
        setTimeout(() => {
            dropdownMenu.style.translate = '0'
            dropdownMenu.style.opacity = '1'
        }, 5)
        showing = true
    }
    else {
        dropdownMenu.style.translate = '20%'
        dropdownMenu.style.opacity = '0'
        setTimeout(() => {
            dropdownMenu.style.display = 'none'
        }, 250)
        showing = false
    }
}
//#endregion
//#region Slider
const slider = document.querySelector('.fr-slider')
const arrows = document.querySelectorAll('#featured-recommended .arrows span')
const lines = document.querySelectorAll('.slider-lines .line')

// Globals
const sliderPositions = ['0', '-100vw', '-200vw', '-300vw']
var currentSliderPos = 0
var timeToAutoSlide = 4

function autoSlide() {
    setTimeout(() => {
        --timeToAutoSlide
        autoSlide()
    }, 1000)

    if (timeToAutoSlide === 0) {
        timeToAutoSlide = 6
        ++currentSliderPos
        if (currentSliderPos > 3) currentSliderPos = 0
        slider.style.translate = sliderPositions[currentSliderPos]

        lines.forEach(line => line.classList.remove('active'))
        lines[currentSliderPos].classList.add('active')
    }

}
autoSlide(timeToAutoSlide)

arrows.forEach(arrow => {
    // Quick first apparition of the arrows
    arrow.style.opacity = '.7'
    setTimeout(() => arrow.style.opacity = '0', 1800)
    
    arrow.onclick = function() {
        if (arrow.textContent === 'arrow_back_ios') {
            --currentSliderPos
            if (currentSliderPos < 0) { currentSliderPos = 0 }
        }

        if (arrow.textContent === 'arrow_forward_ios') {
            ++currentSliderPos
            if (currentSliderPos > 3) { currentSliderPos = 3 }
        }

        slider.style.translate = sliderPositions[currentSliderPos]
        timeToAutoSlide = 8

        lines.forEach(line => line.classList.remove('active'))
        lines[currentSliderPos].classList.add('active')

        arrows.forEach(arrow => arrow.style.opacity = '.7')
        arrows.forEach(arrow => setTimeout(() => arrow.style.opacity = '0', 1500))
    }
})

//#endregion
//#region Load Data
function loadFeaturedGames() {
    for (var i = 0; i < 4; ++i) {
        const newFeaturedGame = document.querySelector('.fr-item').cloneNode(true)
        newFeaturedGame.querySelector('img').src = allGames[i].imageUrl
        newFeaturedGame.querySelector('.fr-item-details h1').textContent = allGames[i].name
        newFeaturedGame.querySelector('.fr-item-details h3').textContent = 'R$' + allGames[i].price.toFixed(2)
        newFeaturedGame.classList.remove('model')
        slider.appendChild(newFeaturedGame)
    }
}
loadFeaturedGames()


const gamesList = document.querySelector('#browse-games ul')
function loadGamesList() {
    var counter = 0
    allGames.forEach(game => {
        const newGame = document.querySelector('.game').cloneNode(true)
        newGame.querySelector('img').src = allGames[counter].imageUrl
        newGame.querySelector('.game h1').textContent = allGames[counter].name
        newGame.querySelector('.game h3').textContent = allGames[counter].genres[0] + ' ・ ' + allGames[counter].genres[1]
        newGame.querySelector('.game h5 span').textContent = 'R$' + allGames[counter].price.toFixed(2)
        newGame.classList.remove('model')
        gamesList.appendChild(newGame)
        ++counter
    })
}
loadGamesList()

//#endregion
//#region Browse Games
const browseGamesButtons = document.querySelectorAll('.games-nav-bar span')

browseGamesButtons.forEach(button => {
    button.onclick = () => {
        browseGamesButtons.forEach(btn => { btn.classList.remove('active') })
        button.classList.add('active')
    }
})

//#endregion
