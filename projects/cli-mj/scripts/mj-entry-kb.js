// initialises the mahjong entry keyboard.
// appends the child table to element with #id as parameter
// most definitely you want to add to a div...

function initialise_mj_kb(id_append_to, display_id){
    let mj_entry = document.createElement('TABLE');
    let newRow, cell, tileID, i, j;

    for (i = 1; i < 5; i ++){
        console.log(i)
        newRow = mj_entry.insertRow()
        if (i == 4) {
            // luckyTile Row
            for (j = 1; j < 8; j ++) {
                cell = newRow.insertCell()
                tileID = 10 * i + j
                cell.appendChild(new_mahjongButton(tileID, display_id))
            }
            continue
        }

        for (j = 1; j < 10; j++) {
            cell = newRow.insertCell()
            tileID = 10 * i + j
            cell.appendChild(new_mahjongButton(tileID, display_id))
        }

    }

    let target_div = document.getElementById(id_append_to);
    target_div.appendChild(mj_entry)
    return
}

function popHand(add_to_array, display_id){
    add_to_array.splice(add_to_array.length -1, 1)
    update_mj_display(hand_array, display_id)
    return
}


function new_mahjongButton(tile, display_id) {
    let mj_button = document.createElement('BUTTON')
    let btn_img = document.createElement('IMG')
    const PATH = '../mahjong_tile_images/' + String(tile) + '.png'
    btn_img.setAttribute("src", PATH)
    // formatting
    mj_button.setAttribute('class', 'mj-tile-entry-button')
    // functionality of inputting
    // create an anon function to pass tile into

    let input = function () {
        if (hand_array.length == 17) {
            alert('Too many tiles!!!')
            return
        }
        hand_array[hand_array.length] = tile
        console.log(hand_array)
        update_mj_display(hand_array, display_id)
        return
    }

    mj_button.addEventListener("click", input, false)
    mj_button.appendChild(btn_img)

    return mj_button
}

function update_mj_display(hand_arr, display_id) {
    // create table
    let mj_disp = document.createElement('TABLE');
    let dispRow = mj_disp.insertRow();
    let tileCount = 0;
    let cell, cellimg, imgPATH, cell_btn;

    
    
    // loop over hand_arr to make the tiles a thing
    for (const i of hand_arr) {
        imgPATH = '../mahjong_tile_images/' + String(i) + '.png'
        cellimg = document.createElement('IMG')
        cellimg.setAttribute('src', imgPATH)
        

        cell_btn = document.createElement('BUTTON')
        cell_btn.setAttribute("class", "mj-tile-disp-button")

        // create the delete functionality
        let deleteTile = function () {
            hand_array.splice(hand_array.indexOf(i), 1)
            update_mj_display(hand_array, display_id)
        }        

        cell_btn.appendChild(cellimg)
        cell_btn.addEventListener("click", deleteTile, false)

        
        cell = dispRow.insertCell()
        cell.appendChild(cell_btn)
    }

    const tiles_leftover = 17 - hand_arr.length;

    for (let j = 0; j < tiles_leftover; j++) {
        // create the extra cells
        cell = dispRow.insertCell()

        cellimg = document.createElement('IMG')
        cellimg.setAttribute('src', '../mahjong_tile_images/empty.png')

        cell.appendChild(cellimg)
    }

    document.getElementById(display_id).innerHTML = ''
    document.getElementById(display_id).appendChild(mj_disp)

    return
}

function main() {
    initialise_mj_kb("mj-kbb", "mj-disp")
    update_mj_display(hand_array, "mj-disp")
    return
}

// intialise the list so we can use later
// do not use this name anywhere else for non-function stuff
let hand_array = [];
main()
