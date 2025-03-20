export function genTable(tileArray, tableId) {
    // generates the mahjong hand from an array with only integers, corresponding 
    let table = document.getElementById(tableId);
    const i = 0;
    // clear table
    while (i < table.length) {
        table.deleteRow(i)
    }

    const handRow = table.insertRow()
    let cell, imageHTML, tilePATH;
    for (const t of tileArray) {
        cell = handRow.insertCell(handRow.length)
        imageHTML = document.createElement("IMG");

        tilePATH = "../mahjong_tile_images/" + String(t) + ".png"

        imageHTML.setAttribute("src", tilePATH)
        imageHTML.setAttribute("class", "mj_img")


        cell.appendChild(imageHTML)
    }

    return
}

export async function getSequence(){
    let sequence = await fetch('../scripts/page_order.json')

    return sequence.json()
}

export async function fillInNavFooter(pageName){
    // array of the page sequencing; page_name: link
    let sequence = await getSequence()

    const keys = Object.keys(sequence)

    const currentIndex = keys.indexOf(pageName)

    if (currentIndex == 0) {
        // first page --> no previous tag
        let next_lk = document.createElement("a")
        next_lk.setAttribute('href',sequence[keys[currentIndex + 1]])
        next_lk.innerHTML = keys[currentIndex + 1]
        document.getElementById('h4_right').appendChild(next_lk)
        document.getElementById('h3_left').style = 'visibility: hidden;'
    }
    else if (currentIndex == keys.length - 1) {
        // last page --> no next tag
        let prev_lk = document.createElement('a')
        prev_lk.setAttribute('href', sequence[keys[currentIndex - 1]])
        prev_lk.innerHTML = keys[currentIndex - 1]
        document.getElementById('h4_left').appendChild(prev_lk)
    }
    else {
        // create both next and previous link
        let next_lk = document.createElement("a")
        next_lk.setAttribute('href',sequence[keys[currentIndex + 1]])
        next_lk.innerHTML = keys[currentIndex + 1]
        document.getElementById('h4_right').appendChild(next_lk)

        let prev_lk = document.createElement('a')
        prev_lk.setAttribute('href', sequence[keys[currentIndex - 1]])
        prev_lk.innerHTML = keys[currentIndex - 1]
        document.getElementById('h4_left').appendChild(prev_lk)
    }

    return
}

let expanded = false;
export function expand(table_index){
    
    const tbl = document.getElementsByClassName("expand-on-clk")[table_index];

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

export function makeTbl(data){
    let drawing_tbl = document.createElement('TABLE');

    const table_cols = Object.keys(data);

    let row = drawing_tbl.insertRow();
    let newCell;
    // intiating the column names
    for (let col of table_cols) {
        newCell = row.insertCell();
        newCell.innerHTML = col;
    }

    const anyArray = (Object.values(data)[0])

    const row_number = anyArray.length

    // create the remaining i rows
    for (let i=0; i<row_number;i++){
        row = drawing_tbl.insertRow();
        
        for (const k of table_cols){
            newCell = row.insertCell()
            newCell.innerHTML = data[k][i];
        }
    }

    return drawing_tbl
}