import {makeTbl, genTable, fillInNavFooter, expand} from "./report.js"

// expand button
const exp_btn = document.getElementById('exp_btn');
function expand1(){
    expand(0)
    return
}
exp_btn.addEventListener('click', expand1, false)

// oocurence table
let occ_table = document.createElement('TABLE');
occ_table.setAttribute('class', 'resultsTable')
// header row
const header_row = "<tr><td>Tile</td><td>Occurences</td><td>Tile</td><td>Occurences</td><td>Tile</td><td>Occurences</td><td>Tile</td><td>Occurences</td></tr>";
occ_table.innerHTML = header_row

const occ_data = {
    "11": 845,
    "12": 1589,
    "13": 1671,
    "14": 1642,
    "15": 1678,
    "16": 1642,
    "17": 1579,
    "18": 1164,
    "19": 792,
    "21": 885,
    "22": 1543,
    "23": 1597,
    "24": 1585,
    "25": 1661,
    "26": 1718,
    "27": 1574,
    "28": 1144,
    "29": 805,
    "31": 874,
    "32": 1598,
    "33": 1589,
    "34": 1703,
    "35": 1692,
    "36": 1645,
    "37": 1545,
    "38": 1128,
    "39": 809,
    "41": 191,
    "42": 179,
    "43": 188,
    "44": 185,
    "45": 180,
    "46": 163,
    "47": 202
}

const occ_keys = Object.keys(occ_data);

let row,cell, occ_cell, tile;

for (let i=0; i<9; i++) {
    row = occ_table.insertRow();
    for (let j = 0; j<4; j++) {

        tile = 10 * (j+1) + i + 1;

        if (!occ_keys.includes(String(tile))) {
            continue
        }

        cell = row.insertCell();
        occ_cell = row.insertCell();

        // generate the tile img
        let path = "../mahjong_tile_images/" + String(tile) + ".png";
        let tile_img = document.createElement('IMG');
        tile_img.setAttribute('src', path)
        tile_img.setAttribute('class', "mj_img")

        cell.appendChild(tile_img)

        // occurence number
        occ_cell.innerHTML = occ_data[String(tile)];
    }
}

const occ_tbl_div = document.getElementById("occ-tbl");
occ_tbl_div.appendChild(occ_table);

// Graph for occurences
const occurenceGraphData = [{
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    y: [845.0, 1589.0, 1671.0, 1642.0, 1678.0, 1642.0, 1579.0, 1164.0, 792.0],
    name: "Suit 1",
    mode: 'marker',
    type: 'scatter'
},
{
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    y: [885.0, 1543.0, 1597.0, 1585.0, 1661.0, 1718.0, 1574.0, 1144.0, 805.0],
    name: "Suit 2",
    mode: 'marker',
    type: 'scatter'
},
{
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    y: [874.0, 1598.0, 1589.0, 1703.0, 1692.0, 1645.0, 1545.0, 1128.0, 809.0],
    name: "Suit 3",
    mode: 'marker',
    type: 'scatter'
},
{
    x: [1, 2, 3, 4, 5, 6, 7],
    y: [191.0, 179.0, 188.0, 185.0, 180.0, 163.0, 202.0],
    name: "Lucky Tiles",
    mode: 'marker',
    type: 'scatter'
}]

const occurenceGraphLayout = {
    xaxis: {range: [0, 10], title: "Tile"},
    yaxis: {range: [0, 2000], title: "Occurences"},
    title: "Occurences of losing tiles",
    font: {
        family: "Ubuntu, monospace",
        size: 16,
    }
};

Plotly.newPlot("occ-graph", occurenceGraphData, occurenceGraphLayout);

// bottom nav
fillInNavFooter('Losing tiles');

