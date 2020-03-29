export default class Segment {
    constructor(a, b, c, d) {
        this._a = a;
        this._b = b;
        this._c = c;
        this._d = d;
    }

    get a() {
        return this._a;
    }

    set a(value) {
        this._a = value;
    }

    get b() {
        return this._b;
    }

    set b(value) {
        this._b = value;
    }

    get c() {
        return this._c;
    }

    set c(value) {
        this._c = value;
    }

    get d() {
        return this._d;
    }

    set d(value) {
        this._d = value;
    }

    compute(t) {
        return (this._a * Math.pow(t, 3)) + (this._b * Math.pow(t, 2)) + (this._c * t) + this._d;
    }
}

