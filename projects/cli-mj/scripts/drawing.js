import { genTable, fillInNavFooter } from "./report.js";

// partial sets
genTable([16, 17], "os1")
genTable([15, 18], "os1-u")
genTable([24, 26], "kl1")
genTable([25], "kl1-u")
genTable([31, 32], "es1")
genTable([33], "es1-u")

genTable([43, 43], "pc1")
genTable([43], "pc1-u")

genTable([35], "thinking1")
genTable([34, 36], "os2")
genTable([33, 37], "kl2")
genTable([35], "pc2")

genTable([21, 22, 23], "deadset1")
// set the 23 tile to grayscale
const tile23 = document.evaluate("//*[@id='deadset1']/tbody/tr/td[3]/img", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
tile23.setAttribute("style", "filter: grayscale(0.8);")

genTable([21, 22, 23, 24, 25, 26, 14, 15, 16, 32, 33, 38, 38, 41, 41, 41], "noSingulars")

fillInNavFooter("Drawing Tiles")