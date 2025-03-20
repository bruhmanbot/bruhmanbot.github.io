import { genTable, fillInNavFooter } from "./report.js";

// generate hands 1 and hands 2

genTable([11, 11, 11, 15, 16, 17, 23, 24, 26, 27, 34, 35, 36, 41, 41, 45, 46], "hand1")
genTable([11, 12, 15, 18, 19, 21, 22, 24, 25, 32, 33, 35, 37, 41, 43, 45, 47], "hand2")

// table for mk1 chart
genTable([17, 18, 19], "fullStraight")
genTable([39, 39, 39], "fullTrips")
genTable([26, 27], "openStraight")
genTable([45, 45], "pair")
genTable([24, 26], "hole")
genTable([31, 32], "edgeStraight")

// mk1 issues
genTable([11, 12, 13, 24, 25, 26, 32, 33, 34, 37, 37, 37, 39, 43, 45, 47], "hand3")
genTable([12, 13, 16, 17, 24, 25, 27, 28, 33, 33, 35, 36, 42, 42, 44, 44], "hand4")
genTable([12, 13, 16, 17, 24, 25, 27, 28, 33, 33, 35, 36, 42, 42, 42, 44, 44], "hand4-2")
genTable([13, 16, 17, 24, 25, 27, 28, 33, 33, 35, 36, 42, 42, 42, 44, 44], "hand4-3")



// footer nav bar
fillInNavFooter("Hand valuation")