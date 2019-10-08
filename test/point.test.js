const { Point } = require('../src/point');

test('should create a point with no arguments', () => {
  const p1 = new Point();

  expect(p1.x).toEqual(0);
  expect(p1.y).toEqual(0);
});

test('should be able to detect numeric values inside Point', () => {
  const p1 = new Point(22, 51);

  expect(p1._valueIsNumber(-20)).toEqual(true);
});

test('should create a Point with only an x argument', () => {
  const p1 = new Point(1 / 3);

  expect(p1.x).toEqual(1 / 3);
  expect(p1.y).toEqual(0);
});

test('should create a Point with only a y argument', () => {
  const p1 = new Point(undefined, 0.1 + 0.2);

  expect(p1.x).toEqual(0);
  expect(p1.y).toEqual(0.1 + 0.2);
});

test('should create a point with (x, y) coordinates', () => {
  const p1 = new Point(Math.PI, Math.sqrt(2));

  expect(p1.x).toEqual(Math.PI);
  expect(p1.y).toEqual(Math.sqrt(2));
});

test('should create a point and update its position', () => {
  const p1 = new Point();
  p1.setPos(2 / 3, 5 / 8);

  expect(p1.getPos()).toEqual({ x: 2 / 3, y: 5 / 8 });
});

test('should return undefined when undefined is detected', () => {
  const p1 = new Point(89, 144);

  expect(p1._valueIsNumber(undefined)).toEqual(undefined);
});

test('Point should throw an error when passed strings', () => {
  const p1 = new Point(100, 250);

  expect(() => {
    p1.x = 'a';
  }).toThrow();

  expect(() => {
    p1.y = 'b';
  }).toThrow();

  expect(() => {
    p1.setPos('c', 'd');
  }).toThrow();

  expect(() => {
    p1._valueIsNumber('e');
  }).toThrow();
});

test('Point should throw an error when passed objects', () => {
  const p1 = new Point(34, 55);

  expect(() => {
    p1.x = {};
  }).toThrow();

  expect(() => {
    p1.y = [];
  }).toThrow();

  expect(() => {
    p1.setPos(null, 'an ' + {});
  }).toThrow();

  expect(() => {
    p1._valueIsNumber({});
  }).toThrow();

  expect(() => {
    p1._valueIsNumber([]);
  }).toThrow();
});
