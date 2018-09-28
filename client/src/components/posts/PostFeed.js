import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostItem from './PostItem';

const PostFeed = ({ posts }) => {
  return posts.map(post => <PostItem key={post._id} post={post} />);
};

export default PostFeed;
