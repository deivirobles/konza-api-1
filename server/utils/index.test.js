const { sortCompactToStr } = require('./');

describe('Utils', () => {
  test('sortCompactStr', () => {
    const result = sortCompactToStr('createdAt', 'desc');
    expect(result).toEqual('-createdAt');
  });
});
