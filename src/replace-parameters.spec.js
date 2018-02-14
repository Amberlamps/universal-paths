const replaceParameters = require('./replace-parameters');

describe('replace-parameters', () => {
  it('should be a function', () => {
    expect(typeof replaceParameters).toBe('function');
  });

  it('should return a function', () => {
    expect(typeof replaceParameters()).toBe('function');
  });

  const testCases = [{
    path: '',
    params: {},
    expectedResult: ''
  }, {
    path: '/users',
    params: {},
    expectedResult: '/users'
  }, {
    path: '/users/:userId',
    params: {},
    expectedResult: '/users/:userId'
  }, {
    path: '/users/:userId',
    params: { userId: 123 },
    expectedResult: '/users/123'
  }, {
    path: '/users/:userId/',
    params: { userId: 123 },
    expectedResult: '/users/123/'
  }, {
    path: '/users/:userId',
    params: { userId: 0 },
    expectedResult: '/users/0'
  }, {
    path: '/users/:userId',
    params: { userId: undefined },
    expectedResult: '/users/undefined'
  }, {
    path: '/users/:userId',
    params: { userId: null },
    expectedResult: '/users/null'
  }, {
    path: '/users/:userId/:userId',
    params: { userId: 123 },
    expectedResult: '/users/123/123'
  }, {
    path: '/users/:userId/:userId',
    params: { userId: 123, postId: 456 },
    expectedResult: '/users/123/123'
  }, {
    path: '/users/:userId/posts/:postId',
    params: { userId: 123, postId: 456 },
    expectedResult: '/users/123/posts/456'
  }];

  testCases.forEach(({ path, params, expectedResult }) => {
    it(`should resolve to "${expectedResult}" for "${path}" and "${JSON.stringify(params)}"`, () => {
      expect(replaceParameters(path)(params)).toEqual(expectedResult);
    });
  });
});
