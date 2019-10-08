const { Line } = require('../src/line');

test('Creates a Line with both points', () => {
  const l1 = new Line({ x: 1, y: 2 }, { x: 3, y: 4 });

  expect(l1.p1.x).toEqual(1);
  expect(l1.p1.y).toEqual(2);
  expect(l1.p2.x).toEqual(3);
  expect(l1.p2.y).toEqual(4);
});

test('Detects numeric values inside Line', () => {
  const l1 = new Line({ x: -5, y: 6 }, { x: -7, y: 8 });

  expect(l1._valueIsNumber(65536)).toEqual(true);
});

test('Detects valid arguments for Point inside Line', () => {
  const l1 = new Line({ x: 21, y: 34 }, { x: 7, y: 9 });
  const pt = { x: 0, y: 0 };

  expect(l1._valueIsPoint(pt)).toEqual(true);
});

test('Detects instances of Line inside Line', () => {
  const l1 = new Line({ x: 1, y: 2 }, { x: 3, y: 4 });
  const l2 = new Line({ x: 5, y: 6 }, { x: 7, y: 8 });

  expect(l1._valueIsLine(l2)).toEqual(true);
});

test('Creates a Line and updates position of p1', () => {
  const l1 = new Line({ x: 9, y: 10 }, { x: 7, y: 13 });
  l1.p1.setPos(2 / 3, 5 / 8);

  expect(l1.p1.getPos()).toEqual({ x: 2 / 3, y: 5 / 8 });
});

test('Creates a Line and updates position of p2', () => {
  const l1 = new Line({ x: 9, y: 10 }, { x: 7, y: 13 });
  l1.p2.setPos(2 / 3, 5 / 8);

  expect(l1.p2.getPos()).toEqual({ x: 2 / 3, y: 5 / 8 });
});

test('Can detect intersections accurately using 15 decimal places', () => {
  const precision = 15;
  const l1 = new Line(
    { x: Math.PI - 11, y: Math.sqrt(2) + 7 },
    { x: Math.PI + 11, y: Math.sqrt(2) - 7 },
    precision
  );
  const l2 = new Line(
    { x: Math.PI - 11, y: Math.sqrt(2) - 7 },
    { x: Math.PI + 11, y: Math.sqrt(2) + 7 },
    precision
  );
  const iPt = l1.intersect(l2);

  expect(iPt.x).toEqual(parseFloat(Math.PI.toFixed(l1.precision)));
  expect(iPt.y).toEqual(parseFloat(Math.sqrt(2).toFixed(l1.precision)));
});

test('Detects intersections very accurately using 14 decimal places', () => {
  const l1 = new Line(
    { x: Math.PI - 11, y: Math.sqrt(2) + 7 },
    { x: Math.PI + 11, y: Math.sqrt(2) - 7 },
    14
  );
  const l2 = new Line(
    { x: Math.PI - 11, y: Math.sqrt(2) - 7 },
    { x: Math.PI + 11, y: Math.sqrt(2) + 7 },
    14
  );
  const iPt = l1.intersect(l2);

  expect(iPt.x).toEqual(parseFloat(Math.PI.toFixed(l1.precision)));
  expect(iPt.y).toEqual(parseFloat(Math.sqrt(2).toFixed(l1.precision)));
});

test('Detects parallel and coincident lines and returns {}', () => {
  const l1 = new Line(
    { x: Math.PI - 11, y: Math.sqrt(2) + 7 },
    { x: Math.PI - 11, y: Math.sqrt(2) - 7 },
    14
  );
  const l2 = new Line(
    { x: Math.PI + 11, y: Math.sqrt(2) - 7 },
    { x: Math.PI + 11, y: Math.sqrt(2) + 7 },
    14
  );
  const iPt = l1.intersect(l2);

  expect(iPt).toEqual({});
});

test('Line should throw an error when created with no arguments', () => {
  expect(() => {
    new Line();
  }).toThrow();
});

test('Line should throw an error when created with only p1', () => {
  expect(() => {
    new Line({ x: 1, y: 2 });
  }).toThrow();
});

test('Line should throw an error when created with only p2', () => {
  expect(() => {
    new Line(undefined, { x: 1, y: 2 });
  }).toThrow();
});
