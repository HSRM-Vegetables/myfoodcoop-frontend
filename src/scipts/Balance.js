export default class Balance {
    constructor(money) {
        this.money = money;
    }

    get balance (){
        return this.money()
    }
    set balance(newMoney){
        this.money = newMoney;
    }
}