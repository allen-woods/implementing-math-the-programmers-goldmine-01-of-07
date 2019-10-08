const { Point } = require('./point');

class Line {
  constructor(ptObj1, ptObj2, precise) {
    this.p1 = ptObj1;
    this.p2 = ptObj2;
    this.precision = precise || 15;
  }

  _valueIsNumber(param, name) {
    let t = typeof param;
    if (t === 'number') {
      return true;
    } else if (t !== 'number' && t !== 'undefined') {
      throw new Error(`${name} must be a number`);
    }
  }

  _valueIsPoint(obj) {
    if (
      typeof obj === 'object' &&
      obj['x'] !== undefined &&
      obj['y'] !== undefined &&
      typeof obj['x'] === 'number' &&
      typeof obj['y'] === 'number'
    ) {
      return true;
    } else {
      throw new Error(`p1 must be { x: number, y: number }`);
    }
  }

  _valueIsLine(obj) {
    let l = obj instanceof Line;
    if (l) {
      return true;
    } else {
      throw new Error(`intersect() requires instance of Line as argument`);
    }
  }

  set p1(ptObj1) {
    let legal = this._valueIsPoint(ptObj1);
    if (legal) {
      this._p1 = new Point(ptObj1.x, ptObj1.y);
    }
  }

  get p1() {
    return this._p1;
  }

  set p2(ptObj2) {
    let legal = this._valueIsPoint(ptObj2, 'p2');
    if (legal) {
      this._p2 = new Point(ptObj2.x, ptObj2.y);
    }
  }

  get p2() {
    return this._p2;
  }

  set precision(val) {
    let legal = this._valueIsNumber(val, 'precision');
    if (legal && val >= 1 && val <= 15) {
      this._precision = val;
    }
  }

  get precision() {
    return this._precision;
  }

  intersect(otherLine) {
    try {
      let legal = this._valueIsLine(otherLine);
      if (legal) {
        const x1 = this.p1.x;
        const y1 = this.p1.y;
        const x2 = this.p2.x;
        const y2 = this.p2.y;

        const x3 = otherLine.p1.x;
        const y3 = otherLine.p1.y;
        const x4 = otherLine.p2.x;
        const y4 = otherLine.p2.y;

        const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

        if (denominator === 0) {
          return {};
        } else {
          const tNumerator = (x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4);
          const t = tNumerator / denominator;

          const pointOfIntersection = {
            x: parseFloat((x1 + t * (x2 - x1)).toFixed(this.precision)),
            y: parseFloat((y1 + t * (y2 - y1)).toFixed(this.precision))
          };

          return pointOfIntersection;
        }
      }
    } catch (err) {
      console.error('ERROR:', err);
    }
  }
}

module.exports = {
  Line
};
