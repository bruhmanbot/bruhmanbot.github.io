import { fillInNavFooter } from "./report.js";
// expand button functionality
function expand(){

    const tbl = document.getElementById("expandable");

    if (expanded) {
        expanded = false
        tbl.style.maxHeight = 0;
    }
    else {
        expanded = true;
        tbl.style.maxHeight = tbl.scrollHeight + "px";
    }
    return
}
let expanded = false;
let exp_btn = document.getElementById("expandButton");
exp_btn.addEventListener("click", expand, false)

// occurence vs score chart
let xValues = [];

for (let i = 0; i<41; i++) {
    xValues[xValues.length] = 0.25 * i;
}

// x values = [0, 0,25, ..., 10.0]

const yValues = [0, 0, 10,77,398,1264,2993,4886,6048,5614,4516,4216,6535,9442,
    11263,8964,6107,2997,3647,4525,5901,3932,2688,643,592,529,1013,515,486,59,34, 0, 61,18,27, 0, 0, 0, 0, 0, 0];


const occScoreData = [{
    x: xValues,
    y: yValues,
    mode: "markers",
    type:"scatter"
}];

const occChartLayout = {
    xaxis: {range: [0, 10.50], title: "Opening Score"},
    yaxis: {range: [0, 12000], title: "Occurences"},
    title: "Occurence for each opening score",
    font: {
        family: "Ubuntu, monospace",
        size: 16,
    }
};

Plotly.newPlot("occurenceChart", occScoreData, occChartLayout);

// cumalative plot

const cumValues = [0, 0, 10, 87, 485 ,1749, 4742, 9628, 15676, 21290, 25806, 30022, 36557, 45999, 57262, 66226, 72333, 
    75330, 78977, 83502, 89403, 93335, 96023, 96666, 97258, 97787, 98800, 99315, 99801, 99860, 99894, 99894, 99955, 99973, 100000,
    100000, 100000, 100000, 100000, 100000, 100000]

const cumData = [{
        x: xValues,
        y: cumValues,
        mode: "lines",
        type:"scatter"
    }];

const cumChartLayout = {
        xaxis: {range: [0, 10.50], title: "Opening Score"},
        yaxis: {range: [0, 100000], title: "Cumalative Occurences"},
        title: "Cumalative occurences against opening score",
        font: {
            family: "Ubuntu, monospace",
            size: 16,
        }
    };

Plotly.newPlot("cumChart", cumData, cumChartLayout);

// nav footer
fillInNavFooter("Opening")