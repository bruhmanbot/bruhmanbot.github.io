import { genTable, expand, fillInNavFooter, makeTbl } from "./report.js"

genTable([11, 11, 13, 13, 24, 24, 25, 25, 27, 27, 31, 31, 41, 41, 45, 45, 45], "ligu-sample")
genTable([12, 12, 12, 15, 15, 15, 18, 18, 25, 25, 35, 35, 41, 42, 43, 45, 45], "ligu-sample2")

// table headers for comparison
const tileOptions = [12, 15, 41, 42, 43];
let arr;
for (let t of tileOptions) {
    genTable([t], String(t));
}

genTable([15, 41, 42, 43], "12-u")
genTable([12, 41, 42, 43], "15-u")
genTable([12, 15, 42, 43], "41-u")
genTable([12, 15, 41, 43], "42-u")
genTable([12, 15, 41, 42], "43-u")

// expansion
const exp_btn1 = document.getElementById("exp_btn")

function expand1(){
    expand(0)
    return
}

exp_btn1.addEventListener('click', expand1, false)

// table for drawing stats
const liguDiv = document.getElementById('ligu-results');
const occ_desc = document.createElement('P');

// paragraph heading 
occ_desc.innerHTML = 'Occurences of hands based on initial pair count **(Triplets counted as pairs; Quads counted as 2 pairs)';
liguDiv.appendChild(occ_desc)

// actual table itself
const pc_occ_data = {
    "Pairs": [0, 1, 2, 3, 4, 5, 6, 7, 8],
    "Occurences (Winning run)": [751.0, 3774.0, 7012.0, 5759.0, 2163.0, 405.0, 35.0, 0.0, 0.0],
    "Occurences (Calling run)": [725.0, 3874.0, 6997.0, 5658.0, 2286.0, 417.0, 41.0, 2.0, 0.0],
};

const occTbl = makeTbl(pc_occ_data);
occTbl.setAttribute('class', 'resultsTable')

liguDiv.appendChild(occTbl)

// tiles to finish
const finish_desc = document.createElement('P');
finish_desc.innerHTML = 'Average tiles used to complete hand';

liguDiv.appendChild(finish_desc);

const pc_finish_data = {
    "Pairs": [0, 1, 2, 3, 4, 5, 6, 7, 8],
    "Average Tiles to Finish": [58.4, 59.4, 58.1, 55.6, 53.2, 48.5, 42.0, '/', '/'],
    "&pm;": [0.8, 0.4, 0.3, 0.3, 0.6, 1.2, 4.0, '/', '/']
};

const winningTbl = makeTbl(pc_finish_data);
winningTbl.setAttribute('class', 'resultsTable');
liguDiv.appendChild(winningTbl);

// calling

const calling_desc = document.createElement('P');
calling_desc.innerHTML = 'Average tiles used to reach calling point';

liguDiv.appendChild(calling_desc)

const pc_calling_data = {
    "Pairs": [0, 1, 2, 3, 4, 5, 6, 7, 8],
    "Average tiles to calling": [31.4, 28.6, 26.7, 24.1, 20.9, 16.3, 13.9, 3.5, '/'],
    "&pm;": [0.6, 0.2, 0.1, 0.1, 0.2, 0.4, 1.1, 1.4, '/'],
}

const callingTbl = makeTbl(pc_calling_data);
callingTbl.setAttribute('class', 'resultsTable');
liguDiv.appendChild(callingTbl);

// graphs

function plotlyDatafromDict(Dict, key, name_curve) {
    const error_key = "&pm;"
    return {
        x: Dict["Pairs"],
        y: Dict[key],
        error_y: {
            type: 'data',
            array: Dict[error_key],
            visible: true
        },
        name: name_curve,
        type: 'scatter'
    };
}

const occ_graph_data = [
    {
    x: pc_occ_data['Pairs'],
    y: pc_occ_data['Occurences (Winning run)'],
    name: 'Winning run',
    type: 'scatter'
},
    {
    x: pc_occ_data['Pairs'],
    y: pc_occ_data['Occurences (Calling run)'],
    name: 'Calling run',
    type: 'scatter'
}];

const occgraph_Layout = {
    xaxis: {range: [0, 8.00], title: "Pairs"},
    yaxis: {range: [0, 7500], title: "Occurence"},
    title: "Occurence against pairs",
    font: {
        family: "Ubuntu, monospace",
        size: 16,
    }
};

Plotly.newPlot('occ_graph', occ_graph_data, occgraph_Layout);

// 2nd graph

const winning_data = plotlyDatafromDict(pc_finish_data, "Average Tiles to Finish", 'Finish');
const calling_data = plotlyDatafromDict(pc_calling_data, "Average tiles to calling", 'Calling');

const ligu_stats_graph_data = new Array(winning_data, calling_data);

const ligugraph_Layout = {
    xaxis: {range: [0, 8.00], title: "Pairs"},
    yaxis: {range: [0, 60], title: "Tiles"},
    title: "Tiles to call/finish against pairs",
    font: {
        family: "Ubuntu, monospace",
        size: 16,
    }
};

Plotly.newPlot('ligu_graph', ligu_stats_graph_data, ligugraph_Layout);


// difference table
const diffTbl_data = {
    "Pairs": [0, 1, 2, 3, 4, 5, 6, 7],
    "0.5": ['-0.2', '-3.0', '/', '/', '/', '/', '/', '/'],
    "0.75": ['4.7', '1.9', '/', '/', '/', '/', '/', '/'],
    "1.0":['5.4', '2.6', '0.7', '/', '/', '/', '/', '/'],
    "1.25": ['6.3', '3.6', '1.6', '/', '/', '/', '/', '/'],
    "1.5": ['7.2', '4.4', '2.5', '-0.1', '/', '/', '/', '/'],
    "1.75": ['7.7', '4.9', '3.0', '0.4', '/', '/', '/', '/'],
    "2.0": ['8.9', '6.1', '4.2', '1.6', '-1.6', '/', '/', '/'],
    "2.25" : ['9.0', '6.2', '4.2', '1.6', '-1.5', '/', '/', '/'],
    "2.5": ['9.3', '6.5', '4.6', '2.0', '-1.2', '-5.8', '/', '/'],
    "2.75": ['9.6', '6.8', '4.9', '2.3', '-0.9', '-5.4', '/', '/'],
    "3.0": ['10.9', '8.2', '6.2', '3.6', '0.4', '-4.1', '-6.5', '/'],
    "3.25": ['10.9', '8.1', '6.2', '3.6', '0.4', '-4.2', '-6.6', '/'],
    "3.5":['11.6', '8.8', '6.9', '4.2', '1.1', '-3.5', '-5.9', '-16.3'],
    "3.75": ['12.7', '9.9', '7.9', '5.3', '2.2', '-2.4', '-4.8', '-15.2'],
    "4.0": ['13.0', '10.2', '8.3', '5.7', '2.5', '-2.0', '-4.5', '-14.9'],
    "4.25": ['13.3', '10.5', '8.6', '6.0', '2.8', '-1.7', '-4.2', '-14.6'],
    "4.5": ['14.1', '11.3', '9.4', '6.8', '3.6', '-1.0', '-3.4', '-13.8'],
    "4.75": ['14.6', '11.8', '9.9', '7.3', '4.1', '-0.5', '-2.9', '-13.3'],
    "5.0": ['15.4', '12.6', '10.7', '8.1', '4.9', '0.3', '-2.1', '-12.5'],
    "5.25": ['16.0', '13.2', '11.2', '8.6', '5.5', '0.9', '-1.5', '-11.9'],
    "5.5": ['16.1', '13.3', '11.4', '8.8', '5.6', '1.0', '-1.4', '-11.8'],
    "5.75": ['16.9', '14.1', '12.2', '9.6', '6.4', '1.8', '-0.6', '-11.0'],
    "6.0": ['18.4', '15.6', '13.7', '11.1', '7.9', '3.3', '0.9', '-9.5'],
    "6.25": ['17.1', '14.3', '12.4', '9.8', '6.6', '2.0', '-0.4', '-10.8'],
    "6.5": ['19.1', '16.3', '14.3', '11.7', '8.6', '4.0', '1.6', '-8.8'],
    "6.75": ['19.3', '16.5', '14.6', '11.9', '8.8', '4.2', '1.8', '-8.6'],
    "7.0": ['20.2', '17.4', '15.5', '12.9', '9.7', '5.1', '2.7', '-7.7'],
    "7.25": ['21.1', '18.3', '16.4', '13.7', '10.6', '6.0', '3.6', '-6.8'],
    "8.0": ['24.1', '21.3', '19.4', '16.8', '13.6', '9.1', '6.7', '-3.8']
};

const diffTbl = makeTbl(diffTbl_data);

diffTbl.setAttribute('class', 'resultsTable');

const diff_table_div = document.getElementById('diff-table');

diff_table_div.appendChild(diffTbl);


// bd sample hands

genTable([11, 14, 17, 22, 25, 28, 33, 36, 39, 41, 42, 43, 44, 45, 46, 47, 44], "bd1");
genTable([11, 15, 18, 21, 24, 29, 31, 31, 32, 34, 37, 41, 42, 44, 44, 45, 46], 'bd2');
genTable([12, 16, 19, 22, 25, 28, 33, 34, 37, 39, 41, 42, 43, 44, 45, 46, 47], 'bd3');

const ranges = ['low-range', 'mid-range', 'high-range'];
let rangeArr, base;
for (const r of ranges) {
    base = ranges.indexOf(r) * 3;
    for (let s=1; s<4; s++) {
        rangeArr = [10*s+1+base, 10*s+2+base, 10*s+3+base];
        genTable(rangeArr, r)
    }
}

// discard evaluation
genTable([33], '33')
genTable([34], '34')
genTable([37], '37')
genTable([39], '39')

genTable([31], '33u')
genTable([36], '34u')
genTable([31, 36], '37u')
genTable([31], '39u')

// too many mid range
genTable([12, 16, 19, 22, 24, 25, 26, 27, 33, 36, 39, 41, 42, 44, 45, 46, 47], 'bd4');
genTable([22], '22');
genTable([27], '27');
genTable([25], '22c');
genTable([24], '27c');

genTable([13, 15, 16, 18, 22, 25, 28, 33, 36, 39, 41, 42, 43, 44, 45, 46, 47], 'bd5');
genTable([13], '13')
genTable([18], '18')
genTable([16], '13c')
genTable([15], '18c')
genTable([19], '13u')
genTable([11, 12], '18u')

genTable([12, 15, 15, 18, 22, 25, 28, 33, 36, 39, 41, 41, 43, 44, 45, 46, 47], 'bd6');

// expand button for bd results

// expansion
const exp_btn2 = document.getElementById("exp_btn2")

function expand2(){
    expand(1)
    return
}

exp_btn2.addEventListener('click', expand2, false)

const bd_div = document.getElementById('bd-div')
// occurence bd chart
const bd_occ_desc = document.createElement('P');
bd_occ_desc.innerHTML = 'Occurences of lucky tiles; Note that the later results used a different dataset that featured more low-scoring hands';
bd_div.appendChild(bd_occ_desc)

const bd_occ_data = {
    "Unique lucky tiles initially": [0, 1, 2, 3, 4, 5, 6, 7],
    "Occurences": [813.0, 5037.0, 11702.0, 13469.0, 8803.0, 3812.0, 1013.0, 92.0],
};

const bd_occ_tbl = makeTbl(bd_occ_data)
bd_occ_tbl.setAttribute('class', 'resultsTable')
bd_div.appendChild(bd_occ_tbl)

// finish bd chart
const bd_win_desc = document.createElement('P');
bd_win_desc.innerHTML = 'Average tiles to finish hand against initial score, data after score > 7 is omitted due to its irrelevance and high variance';
bd_div.appendChild(bd_win_desc);

const bd_win_data = {
    "Initial Score": [0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0, 2.25, 2.5, 2.75, 3.0, 3.25, 3.5, 3.75, 4.0, 4.25, 4.5, 4.75, 5.0, 5.25, 5.5, 5.75, 6.0, 6.25, 6.5, 6.75, 7.0],
    "Average Tiles to Finish": [29.6, 35.3, 37.8, 42.7, 43.2, 44.6, 46.5, 48.1, 48.0, 47.7, 46.4, 47.4, 48.2, 49.4, 49.5, 50.0, 48.8, 48.6, 50.2, 51.8, 52.4, 52.8, 51.8, 53.8, 52.1, 51.8, 54.1],
    "&pm;": [3.4, 1.0, 0.4, 1.3, 0.8, 0.6, 0.5, 0.5, 0.5, 0.6, 0.5, 0.4, 0.3, 0.4, 0.4, 0.7, 0.6, 0.6, 0.5, 0.6, 0.6, 1.3, 1.5, 1.7, 1.0, 1.4, 1.5],
}

const bd_win_tbl = makeTbl(bd_win_data);

bd_win_tbl.setAttribute('class', 'resultsTable');

bd_div.appendChild(bd_win_tbl);

// LT win_chart
const bd_win_desc_lt = document.createElement('P');
bd_win_desc_lt.innerHTML = 'Average tiles to finish hand against initial unique lucky tiles';
bd_div.appendChild(bd_win_desc_lt);

const bd_win_data_lt = {
    "Initial Unique Lucky Tiles": [0, 1, 2, 3, 4, 5, 6, 7],
    "Average tiles to Finish": [56.0, 53.5, 51.3, 47.9, 44.4, 39.3, 33.0, 23.3],
    "&pm;": [0.7, 0.3, 0.2, 0.2, 0.2, 0.4, 0.6, 1.2]
}

const bd_win_tbl_lt = makeTbl(bd_win_data_lt);

bd_win_tbl_lt.setAttribute('class', 'resultsTable')

bd_div.appendChild(bd_win_tbl_lt);

// calling chart against score
const bd_call_desc = document.createElement('P');
bd_call_desc.innerHTML = 'Average tiles to calling point against score';
bd_div.appendChild(bd_call_desc);

const bd_call_data = {
    "Initial Score": [0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0, 2.25, 2.5, 2.75, 3.0, 3.25, 3.5, 3.75, 4.0, 4.25, 4.5, 4.75, 5.0, 5.25, 5.5, 5.75, 6.0, 6.25, 6.5, 6.75, 7.0],
    "Average Tiles to Calling": [11.7, 17.2, 20.9, 24.1, 25.8, 28.1, 30.1, 31.4, 31.4, 30.8, 30.2, 30.9, 32.0, 33.4, 34.2, 34.5, 32.6, 33.9, 34.2, 34.4, 35.8, 36.2, 35.7, 35.2, 35.2, 35.8, 36.0],
    "&pm;": [1.6, 0.8, 0.3, 0.9, 0.6, 0.4, 0.3, 0.3, 0.4, 0.4, 0.3, 0.3, 0.2, 0.3, 0.3, 0.4, 0.4, 0.4, 0.4, 0.4, 0.5, 0.9, 1.2, 1.2, 0.8, 1.2, 1.1],
};

const bd_call_tbl = makeTbl(bd_call_data);

bd_call_tbl.setAttribute('class', 'resultsTable');

bd_div.appendChild(bd_call_tbl);

// calling chart against lucky tiles

const bd_call_desc_lt = document.createElement('P');
bd_call_desc_lt.innerHTML = 'Average tiles to calling point against lucky tiles';
bd_div.appendChild(bd_call_desc_lt);

const bd_call_data_lt = {
    "Initial Unique Lucky Tiles": [0, 1, 2, 3, 4, 5, 6, 7],
    "Average Tiles to Calling": [38.8, 37.4, 34.5, 31.8, 27.9, 22.7, 17.8, 14.4],
    "&pm;": [0.5, 0.2, 0.2, 0.1, 0.2, 0.2, 0.4, 1.3],
};

const bd_call_tbl_lt = makeTbl(bd_call_data_lt);

bd_call_tbl_lt.setAttribute('class', 'resultsTable');

bd_div.appendChild(bd_call_tbl_lt);


// bd Graphs
const bd_occ_graph_data = [{
    x: bd_occ_data["Unique lucky tiles initially"],
    y: bd_occ_data["Occurences"],
    name: 'Occurence',
    type: 'scatter'
}];

console.log(bd_occ_graph_data);

const bd_occGraph_Layout = {
    xaxis: {range: [0, 8.00], title: "Unique Lucky Tiles"},
    yaxis: {range: [0, 15000], title: "Occurences"},
    title: "Occurences against lucky tiles",
    font: {
        family: "Ubuntu, monospace",
        size: 16,
    }
};

Plotly.newPlot('bd-occ-graph',bd_occ_graph_data, bd_occGraph_Layout);

//bd winning/calling against initial score
function bd_plotlyDatafromDict(Dict, x_key, y_key, name_curve) {
    const error_key = "&pm;"
    return {
        x: Dict[x_key],
        y: Dict[y_key],
        error_y: {
            type: 'data',
            array: Dict[error_key],
            visible: true
        },
        name: name_curve,
        type: 'scatter'
    };
}

const bd_winningGraph_data = bd_plotlyDatafromDict(bd_win_data, "Initial Score", "Average Tiles to Finish", "Finish")

const bd_callingGraph_data = bd_plotlyDatafromDict(bd_call_data, "Initial Score","Average Tiles to Calling", "Calling")

const bd_graph1_data = new Array(bd_winningGraph_data, bd_callingGraph_data)

const bd_Graph1_Layout = {
    xaxis: {range: [0, 8.00], title: "Initial score"},
    yaxis: {range: [0, 60], title: "Tiles"},
    title: "Average tiles to finish/calling against initial score",
    font: {
        family: "Ubuntu, monospace",
        size: 16,
    }
};

Plotly.newPlot('bd-graph1', bd_graph1_data, bd_Graph1_Layout);


// bd calling/winning graph against initial LT

const bd_winningGraph_data_lt = bd_plotlyDatafromDict(bd_win_data_lt, "Initial Unique Lucky Tiles", "Average tiles to Finish", "Finish")
const bd_callingGraph_data_lt = bd_plotlyDatafromDict(bd_call_data_lt, "Initial Unique Lucky Tiles", "Average Tiles to Calling", "Calling")

const bd_graph2_data = new Array(bd_winningGraph_data_lt, bd_callingGraph_data_lt)

const bd_Graph2_Layout = {
    xaxis: {range: [0, 8.00], title: "Initial unique lucky tiles"},
    yaxis: {range: [0, 60], title: "Tiles"},
    title: "Average tiles to finish/calling against initial unique lucky tiles",
    font: {
        family: "Ubuntu, monospace",
        size: 16,
    }
};

Plotly.newPlot('bd-graph2', bd_graph2_data, bd_Graph2_Layout);

// bottom nav

fillInNavFooter('Specialty hands')