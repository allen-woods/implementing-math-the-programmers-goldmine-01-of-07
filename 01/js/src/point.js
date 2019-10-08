class Point {
  constructor(x, y) {
    this.x = 0;
    this.y = 0;
    this.setPos(x, y);
  }

  _valueIsNumber(param, name) {
    let t = typeof param;
    if (t === 'number') {
      return true;
    } else if (t !== 'number' && t !== 'undefined') {
      throw new Error(`${name} must be a number`);
    }
  }

  set x(x) {
    let legal = this._valueIsNumber(x, 'x');
    if (legal) {
      this._x = x;
    }
  }

  get x() {
    return this._x;
  }

  set y(y) {
    let legal = this._valueIsNumber(y, 'y');
    if (legal) {
      this._y = y;
    }
  }

  get y() {
    return this._y;
  }

  setPos(x, y) {
    this.x = x;
    this.y = y;
  }

  getPos() {
    let pos = {
      x: this._x,
      y: this._y
    };
    return pos;
  }
}

module.exports = {
  Point
};
