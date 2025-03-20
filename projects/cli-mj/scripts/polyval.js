export function polyval(polynomial, x) {
    // returns the polynomial value of p(x)
    // polynomial is an array [] for the coefficients of p(x)
    // where p(x) = a_n x^n + a_(n-1) x^(n-1) + ... + a_1 x^1 + a_0
    let val = 0;
    for (let n = 0; n < polynomial.length; n++) {
        let x_n = x ** (polynomial.length - n - 1);
        val = val + polynomial[n] * x_n;
    }
    return val
}

export function generateFitXValues() {
    let x_arr = [];
    for (let i=0; i<800; i++) {
        const new_x = -6.2 + 10 * i / 800;
        x_arr.push(new_x)
    }

    return x_arr
}

export function randomWithPop(coloursArray) {
    // returns a random element from the list, along with removing said element from the list.
    const selectedColourIndex = Math.floor(Math.random() * coloursArray.length)
    const selectedColour = coloursArray[selectedColourIndex];

    let newArray = coloursArray.slice();
    newArray.splice(selectedColourIndex, 1);

    return [selectedColour, newArray]
}
