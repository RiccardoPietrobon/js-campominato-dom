//Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
//Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell'array delle bombe non potranno esserci due numeri uguali.
//In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina.
//Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
//La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti(ovvero quando ha rivelato tutte le celle che non sono bombe).
//Errata corrige: rendere le caselle "non cliccabili" e far finire la partita è un superbonus, non è richiesto dalla consegna!
//Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l'utente ha cliccato su una cella che non era una bomba.

//Consigli del giorno: : party_wizard:
//Scriviamo prima cosa vogliamo fare passo passo in italiano, dividiamo il lavoro in micro problemi.

//Ad esempio
//Di cosa ho bisogno per generare i numeri ?
//Proviamo sempre prima con dei console.log() per capire se stiamo ricevendo i dati giusti.
//Le validazioni e i controlli possiamo farli anche in un secondo momento.

//SUPERBONUS 1
//Quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle.

//SUPERBONUS 2
//Quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste.

/************     CODICE     ********* */

const my_button = document.getElementById("push");
let bombe;

let is_game_over = false;


my_button.addEventListener(
    "click",
    startGame
)

function startGame() {

    const my_grid = document.getElementById("box");

    const chose = document.getElementById("tipo_di_griglia");

    generazione_griglia(my_grid, chose.value);

    is_game_over = false;
}

/*********** FUNZIONI **********/
/* 
* funzione per generare la mia griglia
*
*
*
 */
function generazione_griglia(grid, dimensione_grid) {

    //griglia vuota
    grid.innerHTML = "";

    bombe = generaBombe(1, dimensione_grid);
    console.log(bombe);


    //ciclo per generare il numero di celle desiderato
    for (let i = 0; i < dimensione_grid; i++) {

        //numeri da inserire
        const square_text = [i + 1];
        //console.log(square_text);

        //aggiungo un div
        const my_square = document.createElement("div");
        my_square.classList.add("square");

        let squareNumber = 100;

        //aggiungo le classi desiderate

        if (dimensione_grid == 49) {

            my_square.classList.add("square_7");
            squareNumber = 49;

        } else if (dimensione_grid == 81) {

            my_square.classList.add("square_9");
            squareNumber = 81;

        }


        //aggiungo il numero
        my_square.append(square_text);

        //funzione click
        my_square.addEventListener(
            "click",
            function () {
                if (!is_game_over) {
                    // PRENDO L'INDICE DELLA CELLA CORRENTE
                    const cellIndex = parseInt(this.getAttribute("data-index"));

                    // PRENDO TUTTE LE CELLE CLICCATE
                    const activeSquares = document.querySelectorAll(".square.active");

                    // SE LA CELLA CLICCATA è UNA BOMBA
                    if (bombe.includes(cellIndex)) {

                        // DO LA CLASSE BOMBA E TERMINO IL GIOCO
                        this.classList.add("bomb");
                        gameOver(activeSquares, false);
                    } else {

                        // ALTRIMENTI DO LA CLASSE ACTIVE
                        this.classList.add("active");
                    }

                    // SE ERA L'ULTIMA CELLA CLICCABILE
                    console.log(activeSquares.length);
                    console.log(squareNumber - bombe.length);

                    if (activeSquares.length == squareNumber - bombe.length - 1) {
                        gameOver(activeSquares, true);
                    }
                }
            }
        )

        grid.append(my_square);


    }
}



/**
 * genera un array casuale di 16 "bombe" (interi) in un range prescelto
 * 
 * @param {int} min 
 * @param {max} max 
 * @return {int[]}
 */
function generaBombe(min, max) {
    const boxbombs = [];

    while (boxbombs.length < 16) {
        const randomNumber = Math.floor(Math.random() * max - min + 1) + min;

        if (!boxbombs.includes(randomNumber)) {
            boxbombs.push(randomNumber);
        }
    }

    return boxbombs;
}




/**
 * funzione che termina il gioco
 * 
 * @param {HTMLElement[]} activeSquares 
 * @param {boolean} userWon 
 */
function gameOver(activeSquares, userWon) {
    is_game_over = true;

    console.log(activeSquares);
    if (userWon) {
        alert("Congratulazione, hai vinto!\nHai totalizzato " + activeSquares.length + " punti.");
    } else {
        alert("Peccato, hai perso!\nHai totalizzato " + activeSquares.length + " punti.");
    }

    const squares = document.querySelectorAll(".square");

    for (const square of squares) {
        const squareIndex = parseInt(square.getAttribute("data-index"));
        if (bombe.includes(squareIndex)) {
            square.classList.add("bomb");
        }
    }
}


