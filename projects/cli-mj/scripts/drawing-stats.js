import { genTable, fillInNavFooter, expand, makeTbl } from "./report.js";




// oragnise table data in {column name: [column values]}
const tbl_data = {
    "OpeningScore": [1.0, 1.25, 1.5, 1.75, 2.0, 2.25, 2.5, 2.75, 3.0, 3.25, 3.5, 3.75, 4.0, 4.25, 4.5, 4.75, 5.0, 5.25, 5.5, 5.75, 6.0, 6.25, 6.5, 6.75, 7.0, 7.25, 7.5, 8.0],
    
    "Mk1": [52.7, 48.0, 45.9, 44.8, 43.4, 42.2, 41.8, 43.5, 44.0, 43.1, 41.6, 41.6, 40.7, 41.1, 40.7, 41.3, 38.9, 40.4, 36.9, 38.8, 32.9, 37.2, 35.8, 36.6, 38.2, 37.8, 36.2, 22.7],
    "Mk1 &pm;": [2.8, 1.3, 0.9, 0.7, 0.6, 0.6, 0.7, 0.7, 0.6, 0.5, 0.4, 0.5, 0.6, 0.9, 0.8, 0.8, 0.6, 0.8, 0.9, 1.8, 1.8, 2.3, 1.5, 2.0, 2.3, 6.2, 11.7, 5.9],

    "Mk2": [43.7, 44.3, 41.5, 41.6, 42.3, 41.7, 42.0, 41.1, 39.9, 39.8, 39.2, 38.9, 39.1, 38.6, 37.4, 37.0, 36.8, 36.4, 35.6, 32.7, 35.4, 37.8, 36.5, 34.5, 28.9, 29.7, 30.9, 32.2],
    "Mk2 &pm;": [2.4, 1.6, 0.9, 0.6, 0.6, 0.6, 0.7, 0.7, 0.5, 0.5, 0.4, 0.5, 0.5, 0.7, 0.7, 0.7, 0.6, 0.7, 0.8, 1.6, 1.8, 2.3, 1.4, 2.1, 1.7, 0.8, 1.2, 0.9],

    "MkPair": [45.5, 42.3, 42.8, 42.4, 41.7, 42.1, 39.9, 41.0, 39.5, 39.4, 38.9, 38.3, 37.8, 38.9, 37.7, 37.4, 36.8, 36.6, 36.7, 39.3, 33.3, 38.2, 32.7, 32.0, 29.5, 32.6, 31.5, 31.8],
    "MkPair &pm;": [1.1, 0.8, 0.7, 0.6, 0.6, 0.7, 0.7, 0.6, 0.5, 0.4, 0.4, 0.6, 0.7, 1.0, 0.7, 0.7, 0.6, 0.9, 1.2, 2.6, 2.0, 1.9, 1.3, 2.3, 2.5, 1.0, 1.8, 0.8],

    "Mk3": [36.5, 40.3, 43.4, 41.8, 40.1, 42.2, 41.7, 41.7, 41.8, 38.4, 38.1, 38.5, 38.7, 38.8, 38.7, 37.9, 36.6, 36.3, 35.4, 36.4, 35.2, 35.3, 34.7, 33.7, 32.1, 28.5, 25.5, 26.1],
    "Mk3 &pm;": [3.7, 2.0, 1.7, 1.0, 0.9, 0.9, 1.1, 1.1, 0.9, 0.8, 0.6, 0.7, 0.9, 1.2, 1.3, 1.1, 1.0, 0.5, 0.5, 1.1, 1.1, 1.4, 0.9, 1.4, 1.3, 3.7, 5.9, 4.3],
}


// expand button for drawing tbl
let expanded = false;
const exp_btn = document.getElementById('exp_btn')

function expand_Res1(){
    expand(0)
}

exp_btn.addEventListener("click", expand_Res1, false);

// inserting the table

const resTbl = makeTbl(tbl_data);
resTbl.setAttribute("class", "resultsTable")

let resTblDiv = document.getElementById("drawing-stats-results-tbl");

resTblDiv.appendChild(resTbl);

// le graphs
// avg tiles against openingscore (winning)
function plotlyDatafromDict(Dict, key) {
    const error_key = String(key) + " &pm;"
    return {
        x: Dict["OpeningScore"],
        y: Dict[key],
        error_y: {
            type: 'data',
            array: tbl_data[error_key],
            visible: true
        },
        name: key,
        type: 'scatter'
    };
}

let mk1 = plotlyDatafromDict(tbl_data, "Mk1");

let mk2 = plotlyDatafromDict(tbl_data, "Mk2");

let mk3 = plotlyDatafromDict(tbl_data, "Mk3");

let mkp = plotlyDatafromDict(tbl_data, "MkPair");

const graph1_data = new Array(mk1, mk2, mkp, mk3);

const graph1_Layout = {
    xaxis: {range: [0, 8.50], title: "Opening Score"},
    yaxis: {range: [10, 60], title: "Average Tiles to Win"},
    title: "Average Tiles to Win against Opening Score",
    font: {
        family: "Ubuntu, monospace",
        size: 16,
    }
};

Plotly.newPlot("winningCompGraph", graph1_data, graph1_Layout);

// expand button for calling tbl
const exp_btn2 = document.getElementById('exp_btn2')

function expand_Res2(){
    expand(1)
    return
}

exp_btn2.addEventListener("click", expand_Res2, false);

// calling table

const tbl2_data = {
    "OpeningScore": [1.0, 1.25, 1.5, 1.75, 2.0, 2.25, 2.5, 2.75, 3.0, 3.25, 3.5, 3.75, 4.0, 4.25, 4.5, 4.75, 5.0, 5.25, 5.5, 5.75, 6.0, 6.25, 6.5, 6.75, 7.0, 7.25, 7.5, 8.0],
    
    "Mk2": [24.7, 23.4, 24.1, 23.2, 22.8, 22.6, 22.9, 21.7, 21.2, 20.2, 20.2, 19.6, 19.5, 18.9, 18.2, 16.7, 16.8, 16.0, 15.6, 16.0, 15.6, 12.9, 12.4, 11.2, 10.0, 8.4, 7.0, 7.4],
    "Mk2 &pm;": [0.9, 0.6, 0.4, 0.3, 0.2, 0.3, 0.3, 0.3, 0.2, 0.2, 0.2, 0.2, 0.2, 0.3, 0.3, 0.3, 0.2, 0.3, 0.4, 0.7, 0.7, 0.6, 0.5, 0.6, 0.7, 1.2, 2.1, 1.3],

    "MkPair": [27.8, 27.3, 25.6, 26.7, 26.7, 26.5, 26.4, 25.6, 23.4, 22.8, 23.0, 22.9, 22.7, 23.2, 19.5, 18.6, 18.2, 17.7, 16.8, 20.2, 16.2, 12.4, 12.3, 12.4, 12.9, 9.3, 4.1, 10.5],
    "MkPair &pm;": [1.9, 0.9, 0.5, 0.4, 0.4, 0.4, 0.4, 0.4, 0.3, 0.3, 0.2, 0.3, 0.3, 0.5, 0.4, 0.4, 0.3, 0.4, 0.4, 1.1, 0.8, 0.8, 0.5, 0.9, 1.0, 2.0, 1.4, 2.3],

    "Mk3": [23.2, 23.9, 23.0, 23.1, 23.1, 22.6, 22.7, 21.9, 21.0, 20.5, 19.8, 19.4, 19.2, 19.3, 18.1, 16.3, 16.2, 16.0, 15.4, 15.8, 14.1, 12.8, 11.2, 10.8, 9.4, 8.0, 5.9, 6.5],
    "Mk3 &pm;": [1.0, 0.5, 0.3, 0.3, 0.2, 0.2, 0.2, 0.3, 0.2, 0.2, 0.1, 0.2, 0.2, 0.3, 0.3, 0.2, 0.2, 0.2, 0.3, 0.6, 0.6, 0.6, 0.3, 0.5, 0.6, 1.3, 1.1, 1.3],
}

const resTbl2 = makeTbl(tbl2_data);
resTbl2.setAttribute('class', 'resultsTable');

const tbl2_div = document.getElementById('calling-stats-results-tbl');

tbl2_div.appendChild(resTbl2);

// Calling Graph

let mk2c = plotlyDatafromDict(tbl2_data, "Mk2");
let mkpc = plotlyDatafromDict(tbl2_data, "MkPair");
let mk3c = plotlyDatafromDict(tbl2_data, "Mk3");

const graph2_Data = new Array(mk2c, mkpc, mk3c);

const graph2_Layout = {
    xaxis: {range: [0, 8.50], title: "Opening Score"},
    yaxis: {range: [0, 30], title: "Average Tiles to Calling Point"},
    title: "Average Tiles to Win against Opening Score",
    font: {
        family: "Ubuntu, monospace",
        size: 16,
    }
};

Plotly.newPlot("calling-graph-div", graph2_Data, graph2_Layout);

// bottom nav

fillInNavFooter('Stats')
