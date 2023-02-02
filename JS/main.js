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

my_button.addEventListener(
    "click",
    function () {

        const my_grid = document.getElementById("box");

        const chose = document.getElementById("tipo_di_griglia").value;

        generazione_griglia(my_grid, chose);

    }
)

/*********** FUNZIONI **********/
/* 
* funzione per generare la mia griglia
*
*
*
 */
function generazione_griglia(grid, dimensione_grid) {

    /*     //inserisco le bombe
        const boxbombs = [];
    
        while (boxbombs.length < 16) {
            const random_number = Math.floor(Math.random() * 100) + 1;
    
            if (!boxbombs.includes(random_number)) {
                boxbombs.push(random_number);
            }
        }
        console.log(boxbombs);
    
     */

    //griglia vuota
    grid.innerHTML = "";

    //ciclo per generare il numero di celle desiderato
    for (let i = 0; i < dimensione_grid; i++) {

        //numeri da inserire
        const square_text = [i + 1];
        //console.log(square_text);

        //aggiungo un div
        const my_square = document.createElement("div");

        //aggiungo le classi desiderate
        my_square.classList.add("square");

        if (dimensione_grid == parseInt("100")) {

            my_square.classList.add("square_10");

        } else if (dimensione_grid == parseInt("81")) {

            my_square.classList.add("square_9");

        } else {

            my_square.classList.add("square_7");

        }

        //aggiungo il numero
        my_square.append(square_text);

        //inserisco le bombe
        const boxbombs = [];

        while (boxbombs.length < 16) {
            const random_number = Math.floor(Math.random() * 10) + 1;

            if (!boxbombs.includes(random_number)) {
                boxbombs.push(random_number);
            }
        }
        console.log(boxbombs);

        //funzione click
        my_square.addEventListener(
            "click",
            function () {
                this.classList.toggle("square_active");
                console.log(this.innerHTML);
            }
        )

        grid.append(my_square);
    }

}

