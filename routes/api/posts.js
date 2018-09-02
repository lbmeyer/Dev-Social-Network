const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Post Model
const Post = require('../../models/Post');
// Profile Model
const Profile = require('../../models/Profile');

// Validation
const validatePostInput = require('../../validation/post');

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Posts Works' }));

// @route   GET api/posts
// @desc    Get posts
// @access  Public
router.get('/', (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }));
});

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ nopostfound: 'No post found with that ID' })
    );
});

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors send 400 with errors object
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost.save().then(post => res.json(post));
  }
);

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // Check Id of owner post
    Post.findOneAndRemove({ _id: req.params.id, user: req.user.id })
      .then(post => {
        return post
          ? res.status(200).json({ post: 'Post deleted' })
          : res.status(404).json({ post: 'No post was found' });
      })
      .catch(err =>
        res.status(404).json({ post: 'There was a problem deleting the post' })
      );
  }
);

// router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
//   Profile.findOne({ user: req.user.id })
//     .then(Profile => {
//       Post.findById(req.params.id)
//         .then(post => {
//           // Check for post owner
//           if(post.user.toString() !== req.user.id) {
//             // 401 -> authorization status
//             return res.status(401).json({ notauthorized: 'User not authorized'});
//           }

//           // Delete
//           post.remove().then(() => res.json({ success: true}));
//         })
//         .catch(err => res.status(404).json({ postnotfound: 'No post found'}));
//     })
// })

// @route   POST api/posts/like/:id
// @desc    Like Post
// @access  Private
router.post(
  '/like/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // Check Id of owner post
    Post.findById( req.params.id )
      .then(post => {
        // find if current user is in like array
        const indexOfUser = post.likes.findIndex(like => req.user.id === like.user.toString());
        indexOfUser === -1 ?
          // user not found, so let's add user to array
          post.likes.unshift({ user: req.user.id }) :
          // user already liked it, let's remove user from array (unlike)
          post.likes.splice(indexOfUser, 1);
          // save post
          post.save().then(post => res.json(post));

        /*** Code for 2 separate routes. Below is the like route. ***/
        // if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
        //   return res.status(400).json({ alreadyliked: 'User already liked this post'});
        // }

        // // Add user id to likes array
        // post.likes.unshift({ user: req.user.id });

        // post.save().then(post => res.json(post));
      })
      .catch(err =>
        res.status(404).json({ post: 'There was a problem liking/unliking the post' })
      );
  }
);

module.exports = router;
