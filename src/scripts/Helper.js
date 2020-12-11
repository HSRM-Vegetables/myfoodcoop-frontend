
/**
 * Parses the input string as a float. Handles commas and points as denotion for decimal values
 * @param {String} money
 * @returns {number} The parsed value 
 */
export function moneyStyler(money) {
    let tmp = money;
    tmp = tmp.replace(',', '.');
    tmp = parseFloat(tmp);
    tmp = tmp.toFixed(2);
    return tmp;
}
