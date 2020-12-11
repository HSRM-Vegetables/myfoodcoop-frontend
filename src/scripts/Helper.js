export function moneyStyler(money) {
    let tmp = money;
    tmp = tmp.replace(',', '.');
    tmp = parseFloat(tmp);
    tmp = tmp.toFixed(2);
    return tmp;
}
