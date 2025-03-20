function count(item, list){
    // returns the number of occurences of an item in a said list
    const count = list.filter((ele) => ele == item)
    return count.length
}

function straight_split(list2) {
    // identifies the straights in list2
    // outputs the identified straights in output_list[0]
    // spits the remaining numbers in output_list[1]
    let kan = [];
    let list_operation = list2.slice();
    list_operation.sort()
    let k = 0
    let straight_start = null;
    while (k < list_operation.length){
        // find if a straight exists
        if (list_operation.includes(list_operation[k]+1) && 
        list_operation.includes(list_operation[k]+2))  {
            // straight exists, adds the terms to kan and removes from list_op.
            straight_start = list_operation[k];
            
            for (let i=0; i<3; i++){
                kan[kan.length] = straight_start + i;
                // finds the index of the added item to kan
                let index_removal = list_operation.indexOf(straight_start + i);
                list_operation.splice(index_removal,1); 
                // removes the item from list_op
            }
            k = 0;
        }
        else {
            k++
        }
    }

    let output = new Array(kan, list_operation)
    return output
}

function triplet_split(list2){
    let triplets = [];
    let list_op = list2.slice();
    list_op.sort();
    let k = 0;
    while (k < list2.length) {
        if (count(list_op[k], list_op) > 2){
            // identifies the triplets
            let add_arr = new Array(3)
            add_arr.fill(list_op[k])
            // list of len 3 with the correct value of list_op[k]
            triplets = triplets.concat(add_arr)
            // appends add_arr to the end of the existing triplets

            // removing the triplet from list_op
            list_op.splice(k, 3) 
        }
        else{
            k++
        }
    }
    const output = new Array(triplets, list_op);
    return output
}

function unique_occurence_count(list){
    // returns the occurence of each item in the list inside a dictionary
    let occ_dict = {};

    for (let item of list){
        if (occ_dict[item] == undefined){
            // Initialises the count if not inside dictionary
            occ_dict[item] = 1;
        }
        else{
            // adds one to count if already present
            occ_dict[item] ++;
        }
        
    }

    return occ_dict
}

function findPairs(hand_array){
    const pairMap = unique_occurence_count(hand_array.slice());
    let hand_array2 = hand_array.slice()
    hand_array2.sort()
    let pairCount = 0;
    for (const q of Object.keys(pairMap)) {
        if (pairMap[q] == 2) {
            // pairMap [q] shouldn't exceed 3 bcs if 3 --> identifie as triplet already
            pairCount ++
            // since it is sorted, we can remove the 2 elements together
            hand_array2.splice(hand_array2.indexOf(q), 2)
        }
    }

    return new Array(pairCount, hand_array2)
}

function find_open_straights(hand_array){
    // remove lucky tiles since we are considering straights here
    const LT_removal = removeLT(hand_array.slice());

    let hand_array_noLT = LT_removal[0];
    const hand_array_LT = LT_removal[1];

    let os_count = 0;

    hand_array_noLT.sort()
    for (const t of hand_array_noLT) {
        if (t%10==1 | t%10==8) {
            // since the array is sorted, any potential open straights starting with 1/8
            // is infact 1-2 or 8-9, which is edge straight --> leave til later
            continue
        }
        
        // if the array doesn't contain the successive tile --> index function returns -1
        if (hand_array_noLT.indexOf(t+1) != -1) {
            os_count ++
            // cannot do 2 here in case if the array contains two instances of t successively
            hand_array_noLT.splice(hand_array_noLT.indexOf(t), 1)
            hand_array_noLT.splice(hand_array_noLT.indexOf(t+1), 1)
        }

    }

    const resultingArray = hand_array_noLT.concat(hand_array_LT)

    return new Array(os_count, resultingArray)
}

function find_kalongs(hand_array) {
    // find kalongs, e.g. (3-5)
    // remove lucky tiles since we are considering straights here
    const LT_removal = removeLT(hand_array.slice());

    let hand_array_noLT = LT_removal[0];
    const hand_array_LT = LT_removal[1];

    let kl_count = 0;

    hand_array_noLT.sort()
    for (const t of hand_array_noLT) {
        if (t%10 == 9) {
            // since the array is sorted, the next potential tile after a 9, e.g. 19 is 21
            // which is obiously invalid
            continue
        }
        
        // if the array doesn't contain the kalong tile --> index function returns -1
        if (hand_array_noLT.indexOf(t+2) != -1) {
            kl_count ++
            // cannot do 2 here in case if the array contains two instances of t successively
            hand_array_noLT.splice(hand_array_noLT.indexOf(t), 1)
            hand_array_noLT.splice(hand_array_noLT.indexOf(t+2), 1)
        }

    }

    const resultingArray = hand_array_noLT.concat(hand_array_LT)

    return new Array(kl_count, resultingArray)
}

function find_edge_straights(hand_array) {
    // find kalongs, e.g. (3-5)
    // remove lucky tiles since we are considering straights here
    const LT_removal = removeLT(hand_array.slice());

    let hand_array_noLT = LT_removal[0];
    const hand_array_LT = LT_removal[1];

    let es_count = 0;

    hand_array_noLT.sort()
    for (const t of hand_array_noLT) {
        // in a sorted array, we only need to care about edge straights if the tile
        // is an 1/8
        if (t%10 != 1 && t%10 != 8) {
            continue
        }

        if (hand_array_noLT.indexOf(t+1) != -1) {
            es_count ++
            // cannot do 2 here in case if the array contains two instances of t successively
            hand_array_noLT.splice(hand_array_noLT.indexOf(t), 1)
            hand_array_noLT.splice(hand_array_noLT.indexOf(t+1), 1)
        }
    }

    const resultingArray = hand_array_noLT.concat(hand_array_LT)

    return new Array(es_count, resultingArray)
}

function removeLT(hand_array){
    // removes lucky tiles
    const noLT_array = hand_array.filter((tile) => tile < 40)
    const LT_array = hand_array.filter((tile) => tile > 40)

    return new Array(noLT_array, LT_array)
}

export function handScoreEval(hand_arr) {
    // create copy to ensure original hand is not tampered with
    const hand_arr_wk = hand_arr.slice();
    // empty array for us to chuck our scores into later
    let handScores = [];

    // see which method gives more completed sets / higher score
    // way 1: triplet -> straight
    let out1 = triplet_split(hand_arr_wk);
    const triplets1 = out1[0];
    let remTiles1 = out1[1];

    out1 = straight_split(remTiles1);
    const straights1 = out1[0];
    remTiles1 = out1[1];

    let funcOutput1; // dummy variable to store the array of our function outputs
    // running pair checks
    funcOutput1 = findPairs(remTiles1);
    const pc1_count = funcOutput1[0];
    remTiles1 = funcOutput1[1];

    // running open straight check
    funcOutput1 = find_open_straights(remTiles1);
    const os1_count = funcOutput1[0];
    remTiles1 = funcOutput1[1];

    // running kalong check
    funcOutput1 = find_kalongs(remTiles1);
    const kl1_count = funcOutput1[0];
    remTiles1 = funcOutput1[1];

    // running edge straights check
    funcOutput1 = find_edge_straights(remTiles1);
    const es1_count = funcOutput1[0];
    
    handScores[handScores.length] = 2 * (straights1.length/3 + triplets1.length/3) + 0.5 * pc1_count 
                                    + 0.5 * os1_count + 0.25 * kl1_count + 0.25 * es1_count


    // extract pairs
    
    // way 2: straight -> triplet
    let out2 = straight_split(hand_arr_wk)
    const straights2 = out2[0]
    let remTiles2 = out2[1]

    out2 = triplet_split(remTiles2)
    const triplets2 = out2[0]
    remTiles2 = out2[1]

    let funcOutput2; // dummy variable to store the array of our function outputs

    // running open straight check
    funcOutput2 = find_open_straights(remTiles2);
    const os2_count = funcOutput2[0];
    remTiles2 = funcOutput2[1];

    // running pair checks
    funcOutput2 = findPairs(remTiles2);
    const pc2_count = funcOutput2[0];
    remTiles2 = funcOutput2[1];
    
    // running kalong check
    funcOutput2 = find_kalongs(remTiles2);
    const kl2_count = funcOutput2[0];
    remTiles2 = funcOutput2[1];

    // running edge straights check
    funcOutput2 = find_edge_straights(remTiles2);
    const es2_count = funcOutput2[0];

    handScores[handScores.length] = 2 * (straights2.length/3 + triplets2.length/3) + 0.5 * pc2_count 
                                    + 0.5 * os2_count + 0.25 * kl2_count + 0.25 * es2_count
    
    const maxScore = handScores.reduce((accumulator, currentValue) => Math.max(accumulator, currentValue), -1, );

    return maxScore
}




