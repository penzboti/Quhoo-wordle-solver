var words_split0 = "ablak, agyag, agyar, ajánl, akció, aktív, alany, album, amőba, angol, anyag, anyós, apród, apály, arany, arasz, aroma, arzén, arány, aréna, audio, álarc, állat, árkád, ártér, árvíz, árbóc, bacon, balta, balti, banda, banán, barna, barát, beteg, beton, bodza, bogyó, bogár, bohóc, bolha, bomba, bronz, bálna, búvár, cetli, chili, chips, cukor, cékla, doboz, dzsem, dátum, dízel, dobat, ecset, email, ember, emelő, emlék, emlős, extra, ezüst, fahéj, fazék, fenyő, fertő, festő, firka, fogas, folyó, fonal, fotel, fáraó, férfi, fórum, főnix, fülke, fürdő, füzet, gatya, gazda, golyó, gomba, grill, gödör, gyors, gyufa, gyula, gyári, gyárt, gyász, gyáva, halál, hamis, hinta, hintó, homok, homár, hétfő, hévíz, hónap, index, indok, iroda, isler, jacht, joker, juhar, járda, jármű, kabin, kabát, kacsa, kajak, kakas, kakaó, kalap, kalóz, kanna, kanál, kanóc, kapor, keksz, kerék, kifli, kosár, kukac, kulcs, kupon, kutya, kvarc, kígyó, kórus, körte, körző, körít, kötél, labda, lábos, labor, lakat, lakás, lapát, lecke, lepke, leves, liget, lámpa, magma, magnó, majom, malac, malom, mangó, maszk, medve, medál, meggy, metró, mikró, mobil, málna, műsor, napló, nyelv, oltár, oltás, opera, orvos, oázis, óceán, ördög, ötlet, pacal, padló, pajta, pajzs, pamut, peron, plüss, pokol, polip, ponty, puska, pálca, párna, póker, radar, rádió, radír, repce, robot, sapka, sarló, sarok, seprű, sereg, sisak, sport, spóra, sugár, sáska, sátor, szaft, szoba, széna, szóda, szőlő, szörp, tabló, tajga, tamás, tanya, tanár, tarja, tarka, taréj, tasak, tehén, teknő, tepsi, toboz, tojás, torma, tálca, tárca, tócsa, tölgy, töltő, tömeg, tömlő, törpe, törzs, túzok, udvar, unoka, úszás, vacok, vagon, vasút, veréb, videó, vidra, vihar, villa, világ, viola, virág, vitéz, vodka, volán, vádli, vírus, vödör, völgy, vörös, zabla, zokni, zuzmó, zálog, zacsi, zsalu, zsaru, zselé, zsepi, zsűri"
// var test_words = "ablak, agyag, agyar, ajánl"

possible = [];
possible_split = [];

function start() {
    document.getElementById("words").innerHTML = "";
    possible = [];

    var words_split1;
    words_split1 = words_split0.split(", ");
    words_split1.forEach(element => {
        possible.push(element);
    });
}

async function guessWord() {
    await wordEliminator();
    // async cus these need to be run after wordEliminator();
    console.log(words);
    console.log(possible);
    document.getElementById("words").innerHTML = possible;
}

var guess;
var guess_split;
var feedback;
var feedback_split;

function wordEliminator() {
    // gets data from inputs, also resets the inputs.
    document.getElementById("guess").value = "";
    feedback = document.getElementById("feedback").value.toLowerCase();
    document.getElementById("feedback").value = "";
    document.getElementById("feedback").innerHTML = "";

    // splits the words to characters.
    feedback_split = feedback.split("");
    // also splits the "possible" array too
    possible_split = [];
    possible.forEach(element => {
        words_split2 = element.split("");
        possible_split.push(words_split2);
    });

    // eliminates the words.
    length = possible.length-1;
    for(w=length; 0<=w; w--) {
        for(i=0; i<5; i++) {
            if(feedback_split[i] == "w" && possible[w].includes(guess_split[i])) {
                possible.splice(possible.indexOf(possible[w]), 1);
                break;
            }
            else if(feedback_split[i] == "g" && guess_split[i] !== possible_split[w][i]) {
                possible.splice(possible.indexOf(possible[w]), 1);
                break;
            }
            else if(feedback_split[i] == "y" && !possible[w].includes(guess_split[i])) {
                possible.splice(possible.indexOf(possible[w]), 1);
                break;
            }

            else if(feedback_split[i] == "y" && guess_split[i] == possible_split[w][i]) {
                possible.splice(possible.indexOf(possible[w]), 1);
                break;
            }
        }
    }
}

// function addFeedbackLetter(letter) {
//     const node = document.createElement("p");
//     node.innerText = letter;
//     div = document.getElementById("feedback");
//     div.appendChild(node);
//     console.log(letter)
// }

start();

document.addEventListener("keyup", function(event) {
    // guess = document.getElementById("guess").value.toLowerCase();
    // if (guess.length == 5) {
    //     // document.getElementById("feedback").innerHTML = "";
    //     guess_split = guess.split("");
    //     for(i=0; i<=4; i++) {
    //         console.log(guess, guess_split, guess_split[i]);
    //         addFeedbackLetter(guess_split[i]);
    //     }
    // }

    if (event.keyCode === 13) {
        guessWord();
    }
})