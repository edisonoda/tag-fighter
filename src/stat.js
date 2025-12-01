export class Modifier {
    constructor({ stat, type, value, origin }) {
        this.stat = stat;
        this.type = type;
        this.value = value;
        this.origin = origin;
    }
}

export class Stat {
    constructor(base) {
        this.base = base;
        this.add = [];
        this.mult = [];
    }

    get value() {
        let add = 0;
        let mult = 1;

        for (let mod in this.add)
            add += mod;

        for (let mod in this.mult)
            mult += mod;

        return (this.base + add) * mult;
    }
}