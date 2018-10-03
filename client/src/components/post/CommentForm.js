import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addComment } from '../../actions/postActions';

class CommentForm extends Component {
  state = {
    text: '',
    errors: {}
  };

  componentDidUpdate(prevProps) {
    if(prevProps.errors !== this.props.errors) {
      this.setState({errors: this.props.errors})
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { postId } = this.props;
    console.log(postId)

    const newComment = {
      text: this.state.text,
    };

    this.props.addComment(postId, newComment);
    this.setState({text: ''});
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Make a comment...</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Reply to post"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                  error={errors.text}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

CommentForm.propTypes = {
  postId: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired

};

const mapStateToProps = state => ({
  errors: state.errors
})

export default connect(mapStateToProps, { addComment })(CommentForm);
