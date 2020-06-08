// from 'float explorer' source - http://dherman.github.io/float.js/

// typed arrays are endianness-sensitive!
const LITTLE_ENDIAN = !!((new Uint8Array((new Uint32Array([1])).buffer))[0]);

class Float {
    constructor(float32) {
        let bytes = [].map.call((new Uint8Array(new Float64Array([float32]).buffer)), (b) =>
            b.toString(2).padStart(8, "0"));

        if (LITTLE_ENDIAN) {
            bytes = bytes.reverse();
        }

        this._bytes = bytes;
    }

    get bytes() {
        return this._bytes;
    }

    get exponent() {
        return this._bytes[0].substring(1) + this._bytes[1].substring(0, 4);
    }

    get mantissa() {
        return this._bytes[1].substring(4) + this._bytes.slice(2).join("");
    }

    get isNegative() {
        return this._bytes[0][0] === "1";
    }

    get sign() {
        return this._bytes[0][0];
    }

    get value() {
        const bytes = (LITTLE_ENDIAN ? this._bytes.reverse() : this._bytes)
            .map((b) => parseInt(b, 2));
        const f = new Float64Array(new Uint8Array(bytes).buffer);
        return f[0];
    }

    * getBitPairs() {
        for (let i = 0; i < 32; i++) {
            yield this.toBitString().substring(i * 2, i * 2 + 2);
        }
    }

    setLSB(bits /* "00" two bits */) {
        if (bits.length !== 2) {
            throw new Error(`Invalid paramter '${bits}' (Float.setLSB()).`);
        }
        const bytes = LITTLE_ENDIAN ? this.bytes.reverse() : this.bytes;
        bytes[7] = bytes[7].substring(0, 6) + bits;
        this._bytes = bytes;
        return this;
    }

    toBitString() {
        return this.sign + this.exponent + this.mantissa;
    }

    toString() {
        return String(this.value);
    }

    valueOf() {
        return this.value;
    }
}

// --- TESTS ---

// const f = new Float(0.0002228827215731144);
// console.log(f.toBitString());
// for (const bits of f.getBitPairs()) {
//     console.log(bits);
// }

// const f1 = new Float(-0.0002228827215731147);
// console.log(f1.bytes);
// console.log(f1.value);
// f1.setLSB("10");
// console.log(f1.bytes);
// console.log(f1.value);

// const f2 = new Float(0.0002228827211231231);
// f2.setLSB("10");

// const f3 = new Float(0.0002228827215787686);
// f3.setLSB("10");
