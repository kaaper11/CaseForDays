class StrategiaLosowania {
    constructor(items) {
        if(this.constructor === StrategiaLosowania){
            throw new Error("Klasa Abstrakcyjna")
        }
        this.items = items;
    }
    roll(){
        throw new Error("Klasa Abstrakcyjna")
    }
}

module.exports = StrategiaLosowania;