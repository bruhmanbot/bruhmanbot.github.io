import { genTable, fillInNavFooter } from "./report.js";
import { handScoreEval } from "./hand-val-interactive.js"
// valuation chart
genTable([31, 32, 33], "fullStraight")
genTable([41, 41, 41], "fullTrips")
genTable([25, 26], "openStraight")
genTable([14, 14], "pair")
genTable([17, 19], "hole")
genTable([28, 29], "edgeStraight")

// moving the button and giving it functionality
let eval_btn = document.getElementById("eval_hand_ps")

eval_btn.addEventListener("click", eval_hand, false)

function eval_hand() {
    eval_btn.setAttribute("class", "eval_hand_ps_moved")
    const handScore = handScoreEval(hand_array)
    document.getElementById("ScoreSpan").innerHTML = "Hand Score: " + String(handScore) 
    document.getElementById("ScoreSpan").setAttribute("class", "score-span")
    return
}

// footer
fillInNavFooter("Valuation chart")