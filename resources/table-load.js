async function loadFiles(){
    const fileInfo = await fetch('fileinfo.json')

    return fileInfo.json()
}

function addRowtoTable(valuesObject, tableId){
    // get table
    var table = document.getElementById(tableId);

    var row = table.insertRow(table.length)

    // insert values
    // Link and name
    let cell = document.createElement('td')
        
    const link_url = valuesObject['link'];
    const anchorTag = document.createElement('a');
    anchorTag.setAttribute('href', link_url);
    anchorTag.innerHTML = valuesObject['name'];
    cell.appendChild(anchorTag)
    row.appendChild(cell)

    // Type
    cell = resetCell();
    cell.innerHTML = valuesObject['type'];
    row.appendChild(cell)

    // Topic
    cell = resetCell();
    cell.innerHTML = valuesObject['topic'];
    row.appendChild(cell);

    return
}

function resetCell() {
    return document.createElement('td');
}

function drawTable(entries, tableId, sortFunction) {
    
    // If needed we can add a sort function here
    const Entries = Object.keys(entries)
    // Default: Sort by Key in object, i.e. sort by internal ID
    const sortedEntries = Entries.sort(sortFunction)
    
    for (q of sortedEntries) {
        addRowtoTable(entries[q], tableId)
    }

    return
}

function sortByObjectValue(Object, keyA, keyB, attribute, order) {
    let result;
    if (Object[keyA][attribute] > Object[keyB][attribute]) {
        result = true;
    }
    else {
        result = false;
    }

    // Flip the result if we are not sorting in asc order
    if (order == "desc") {
        result= !result;
    } 
    return result
}

function clearTable(tableId, leaveHeader=true){
    // Clears off all of the lower entries of the table of the specified ID.

    const tbl = document.getElementById(tableId);
    const tbl_body = tbl.children[0];

    while (tbl_body.childElementCount > 1) {
        tbl_body.removeChild(tbl_body.lastChild);
    }

    if (!leaveHeader) {
        tbl_body.removeChild(tbl_body.lastChild);
    }

    return
}

function redrawTableWithSort(sortAttribute, EntriesObject, lastSort) {
    // clears the table and then redraws it with the correct sort applied
    clearTable('phys_tbl');

    let sortOrder;

    if (lastSort["attr"] != sortAttribute) {
        sortOrder = "asc";
    }
    else if (lastSort["order"] == "asc") {
        sortOrder = "desc";
    }
    else {
        sortOrder = "asc";
    }

    drawTable(EntriesObject, "phys_tbl", (a,b) => sortByObjectValue(EntriesObject, a, b, sortAttribute, sortOrder));

    lastSort["attr"] = sortAttribute;
    lastSort["order"] = sortOrder;
    return
}

function sortButtonEventListenerHandler(idObj, fileInfo) {
    for (const i of Object.keys(idObj)) {
        const SortBTN = document.getElementById(i);
        SortBTN.addEventListener('click', () => redrawTableWithSort(sortAttribute=idObj[i], EntriesObject=fileInfo, lastSort))
    }
}

async function main(){
    const fileInfo = await loadFiles();

    // Sort by internal ID (default)
    drawTable(fileInfo, "phys_tbl", );

    // eventListener for sort by xxx
    ID_SortAttrMap = {
        "name-sort": "name",
        "filetype-sort": "type",
        "topic-sort": "topic",
    };
        
    sortButtonEventListenerHandler(ID_SortAttrMap, fileInfo);

    return
}

// DECLARE THE GLOBAL VARIABLES HERE
let lastSort = {
    "attr": "intID",
    "order": "asc"
};

// MAIN FUNCTION LOOP
main()

