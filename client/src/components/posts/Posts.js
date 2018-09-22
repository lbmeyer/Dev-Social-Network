import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostForm from './PostForm';

class Posts extends Component {
  render() {
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
              {/* {postContent} */}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null)(Posts);