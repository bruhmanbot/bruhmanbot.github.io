import { genTable, fillInNavFooter } from "./report.js";
//generate 2 hands
genTable([11, 11, 11, 12, 13, 14, 15, 16, 17, 18, 19, 19, 19], "cthand1")
genTable([11, 12, 13, 24, 24, 24, 27, 28, 29, 34, 35, 36, 41, 41, 47, 47, 47], "twhand1")

fillInNavFooter('Introduction')

