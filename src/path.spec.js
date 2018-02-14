const Path = require('./path');

describe('path', () => {
  it('should be a function', () => {
    expect(typeof Path).toBe('function');
  });

  it('should return an object with attributes "name" and "url"', () => {
    const path = Path();

    expect(path.hasOwnProperty('name')).toBe(true);
    expect(path.hasOwnProperty('url')).toBe(true);
  });
  
  it('should have "path" as string and "url" as function', () => {
    const path = Path('/some-path');

    expect(typeof path.name).toBe('string');
    expect(typeof path.url).toBe('function');
  });

  it('should replace path with parameters when calling url()', () => {
    const path = Path('/some-path/:someId/:anotherId');
    const params = {
      someId: 1,
      anotherId: 2
    };
    const expectedResult = '/some-path/1/2';

    expect(path.url(params)).toBe(expectedResult);
  });
});
