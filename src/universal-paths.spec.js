const universalPaths = require('./universal-paths');

describe('universal-paths', () => {
  it('should be a function', () => {
    expect(typeof universalPaths).toBe('function');
  });
  
  it('should return a function', () => {
    expect(typeof universalPaths()).toBe('function');
  });
  
  it('should throw error when name does not exist', () => {
    const paths = universalPaths({
      users: '/users'
    });

    expect(() => paths('posts')).toThrow();
  });
    
  it('should map to paths and urls correctly', () => {
    const mapping = {
      users: '/users',
      user: '/users/:userId',
      userPosts: '/users/:userId/posts',
      userPost: '/users/:userId/posts/:postId'
    };
    const paths = universalPaths(mapping);

    expect(paths('users').name).toBe(mapping.users);
    expect(paths('users').url()).toBe(mapping.users);
    expect(paths('user').name).toBe(mapping.user);
    expect(paths('user').url()).toBe(mapping.user);
    expect(paths('user').url({ userId: 123 })).toBe('/users/123');
    expect(paths('userPosts').name).toBe(mapping.userPosts);
    expect(paths('userPosts').url()).toBe(mapping.userPosts);
    expect(paths('userPosts').url({ userId: 123 })).toBe('/users/123/posts');
    expect(paths('userPost').name).toBe(mapping.userPost);
    expect(paths('userPost').url()).toBe(mapping.userPost);
    expect(paths('userPost').url({ userId: 123, postId: 456 })).toBe('/users/123/posts/456');
  });
});
