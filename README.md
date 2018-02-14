# universal-paths
Declare your paths once, use them everywhere.

## Problem
If you have a Single Page Application on the front-end, but you want to support server-side rendering as well, you often find yourself in the situation where you need to manage routes on both the client as well as the server. Additionally, you need to construct parameterized urls on the front-end to match the corresponding server-side routes.

With `universal-paths` you declare your paths once and use them both on the client as well as on the server.

```javascript
import universalPaths from 'universal-paths';

const paths = universalPaths({
  posts: '/posts',
  comments: '/posts/:postId/comments'
});

paths('posts').name;
// => /posts

paths('comments').url({ postId: 1337 });
// => /posts/1337/comments
```

For params matching `universal-paths` uses the regular expression `/A-Za-z0-9_/` as described in the [Express documentation](http://expressjs.com/en/guide/routing.html#route-parameters).

## Example

Following example is using universal-paths, React, React-Router and Express. Paths are configured once and used everywhere.

**paths.js**
```javascript
import universalPaths from 'universal-paths';

const PATH_POSTS = 'posts';
const PATH_COMMENTS = 'comments';

export {
  PATH_POSTS,
  PATH_COMMENTS
};

export default universalPaths({
  [PATH_POSTS]: '/posts',
  [PATH_COMMENTS]: '/posts/:postId/comments'
});
```

**Router.jsx**
```javascript
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Posts from './components/Posts';
import Comments from './components/Comments';
import paths, { PATH_POSTS, PATH_COMMENTS } from './paths';

export default () => (
  <Router history={browserHistory}>
    <Route path={paths(PATH_POSTS).name} component={Posts} />
    <Route path={paths(PATH_COMMENTS).name} component={Comments} />
  </Router>
);
```

**Posts.jsx**
```javascript
import React from 'react';
import { Link } from 'react-router';

import paths, { PATH_COMMENTS } from '../paths';

const pathComments = paths(PATH_COMMENTS);

export default ({ posts }) => (
  <ul>
    {posts.map(({ id, title }) => (
      <li>
        <Link to={pathComments.url({ postId: id })}>{title}</Link>
      </li>
    ))}
  </ul>
);
```

**server.js**
```javascript
const express = require('express');

const paths, { PATH_POSTS, PATH_COMMENTS } = require('./paths');

const app = express();

const pathPosts = paths(PATH_POSTS);
const pathComments = paths(PATH_COMMENTS);

app.get(pathPosts.name, (req, res, next) => {
  // render /posts here
});

app.get(pathComments.name, (req, res, next) => {
  // render /posts/:postId/comments here
});
```
