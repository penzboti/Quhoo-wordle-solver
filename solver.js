var words_split0 = "ablak, agyag, agyar, ajánl, akció, aktív, alany, album, amőba, angol, anyag, anyós, apród, apály, arany, arasz, aroma, arzén, arány, aréna, audio, álarc, állat, árkád, ártér, árvíz, árbóc, bacon, balta, balti, banda, banán, barna, barát, beteg, beton, bodza, bogyó, bogár, bohóc, bolha, bomba, bronz, bálna, búvár, cetli, chili, chips, cukor, cékla, doboz, dzsem, dátum, dízel, dobat, ecset, email, ember, emelő, emlék, emlős, extra, ezüst, fahéj, fazék, fenyő, fertő, festő, firka, fogas, folyó, fonal, fotel, fáraó, férfi, fórum, főnix, fülke, fürdő, füzet, gatya, gazda, golyó, gomba, grill, gödör, gyors, gyufa, gyula, gyári, gyárt, gyász, gyáva, halál, hamis, hinta, hintó, homok, homár, hétfő, hévíz, hónap, index, indok, iroda, isler, jacht, joker, juhar, járda, jármű, kabin, kabát, kacsa, kajak, kakas, kakaó, kalap, kalóz, kanna, kanál, kanóc, kapor, keksz, kerék, kifli, kosár, kukac, kulcs, kupon, kutya, kvarc, kígyó, kórus, körte, körző, körít, kötél, labda, lábos, labor, lakat, lakás, lapát, lecke, lepke, leves, liget, lámpa, magma, magnó, majom, malac, malom, mangó, maszk, medve, medál, meggy, metró, mikró, mobil, málna, műsor, napló, nyelv, oltár, oltás, opera, orvos, oázis, óceán, ördög, ötlet, pacal, padló, pajta, pajzs, pamut, peron, plüss, pokol, polip, ponty, puska, pálca, párna, póker, radar, rádió, radír, repce, robot, sapka, sarló, sarok, seprű, sereg, sisak, sport, spóra, sugár, sáska, sátor, szaft, szoba, széna, szóda, szőlő, szörp, tabló, tajga, tamás, tanya, tanár, tarja, tarka, taréj, tasak, tehén, teknő, tepsi, toboz, tojás, torma, tálca, tárca, tócsa, tölgy, töltő, tömeg, tömlő, törpe, törzs, túzok, udvar, unoka, úszás, vacok, vagon, vasút, veréb, videó, vidra, vihar, villa, világ, viola, virág, vitéz, vodka, volán, vádli, vírus, vödör, völgy, vörös, zabla, zokni, zuzmó, zálog, zacsi, zsalu, zsaru, zselé, zsepi, zsűri"

var possible = [];
var possible_split = [];

function start() {
    // this runs at the start, and at every restart
    document.getElementById("words").innerHTML = "";
    document.getElementById("guess").value = "";
    document.getElementById("feedback").innerHTML = "";
    feedback = ["w", "w", "w", "w", "w"]

    // resets possible words too
    possible = [];
    var words_split1;
    words_split1 = words_split0.split(", ");
    words_split1.forEach(element => {
        possible.push(element);
    });
}


async function guessWordStart() {
    console.log(possible);
    await wordEliminator();
    // async cus these need to be run after wordEliminator();
    document.getElementById("words").innerHTML = possible;
    console.log(possible);
}

var guess;
var guess_split;
var feedback;

function wordEliminator() {
    // resets the input for next guess
    document.getElementById("guess").value = "";

    // splits every word in the possible array to charachters
    possible_split = [];
    possible.forEach(element => {
        words_split2 = element.split("");
        possible_split.push(words_split2);
    });

    // eliminates the words.
    length = possible.length-1;
    for(w=length; 0<=w; w--) {
        for(i=0; i<5; i++) {
            // explaining every thing here is hard, so ill just skip it
            if(feedback[i] == "w" && possible[w].includes(guess_split[i])) {
                possible.splice(possible.indexOf(possible[w]), 1);
                break;
            }
            else if(feedback[i] == "g" && guess_split[i] !== possible_split[w][i]) {
                possible.splice(possible.indexOf(possible[w]), 1);
                break;
            }
            else if(feedback[i] == "y" && !possible[w].includes(guess_split[i])) {
                possible.splice(possible.indexOf(possible[w]), 1);
                break;
            }

            else if(feedback[i] == "y" && guess_split[i] == possible_split[w][i]) {
                possible.splice(possible.indexOf(possible[w]), 1);
                break;
            }
        }
    }

    // also resets feedback
    feedback = ["w", "w", "w", "w", "w"]
}


document.addEventListener("keyup", function(event) {
    // run at every key stopped being held
    if (event.keyCode !== 13){
        document.getElementById("feedback").innerHTML = "";
        guess = document.getElementById("guess").value.toLowerCase();
        guess_split = guess.split("");
        // adds every letter to feedback div. Never adds more then 5
        length = guess.length-1; if (length > 4) { length = 4; };
        for(i=0; i<=length; i++) {
            addFeedbackLetter(guess_split[i], i);
        }
    }
    else {
        // if you press enter the guessing will start
        guessWordStart();
    }
});

function addFeedbackLetter(letter, position) {
    // adds the letters to the div
    // also adds the text, class, and onclick func
    const node = document.createElement("p");
    node.innerText = letter;
    node.classList.add("letter", "letter-white")
    node.setAttribute("onclick",'feedbackToggler('+position+')');
    node.id = position;
    document.getElementById("feedback").appendChild(node);
}

var classWh;
var classYl;
var classGr;
function feedbackToggler(id) {
    // Toggles letter colors
    // also changes the colors in the feedback array
    e = document.getElementById(id).classList;
    classWh = e.contains("letter-white");
    classYl = e.contains("letter-yellow");
    classGr = e.contains("letter-green");

    if (classWh == true) {
        e.replace("letter-white", "letter-yellow");
        feedback[id] = "y";
    }
    else if (classYl == true) {
        e.replace("letter-yellow", "letter-green");
        feedback[id] = "g";
    }
    else if (classGr == true) {
        e.replace("letter-green", "letter-white");
        feedback[id] = "w";
    }
}


// starts the entire thing
start();