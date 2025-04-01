import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, addPost, removePost, editPost } from '../redux/postsSlice';
import { Grid, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, Box } from '@mui/material';
import PostCard from '../components/PostCard';
import AddIcon from '@mui/icons-material/Add';

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const postsStatus = useSelector((state) => state.posts.status);

  const [editingPost, setEditingPost] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    if (postsStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [dispatch, postsStatus]);

  const handleSubmitPost = () => {
    const newPost = { title, content, author };
    if (editingPost) {
      dispatch(editPost({ id: editingPost.id, updatedPost: newPost }));
    } else {
      dispatch(addPost(newPost));
    }
    setOpenDialog(false);
    setTitle('');
    setContent('');
    setAuthor('');
    setEditingPost(null);
  };

  const handleOpenEditDialog = (post) => {
    setEditingPost(post);
    setTitle(post.title);
    setContent(post.content);
    setAuthor(post.author);
    setOpenDialog(true);
  };

  const handleOpenCreateDialog = () => {
    setOpenDialog(true);
    setTitle('');
    setContent('');
    setAuthor('');
    setEditingPost(null);
  };

  const handleDeletePost = () => {
    if (postToDelete) {
      dispatch(removePost(postToDelete.id));
      setPostToDelete(null);
    }
  };

  return (
    <div className="mr-16 ml-16 mt-4 mb-4">
      <Box sx={{ padding: 3 }}>
        <Grid container spacing={2} justifyContent={"space-between"}>
          <Grid item>
            <Typography variant="h4" gutterBottom>
              Posts
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenCreateDialog}
              startIcon={<AddIcon />}
            >
              Create Post
            </Button>
          </Grid>
        </Grid>

        <Box sx={{ marginTop: 1 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column'}}>
            {posts.length > 0 ? (
              posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onDelete={() => setPostToDelete(post)}
                  onEdit={() => handleOpenEditDialog(post)}
                />
              ))
            ) : (
              <Typography>No posts available.</Typography>
            )}
          </Box>
        </Box>

        {/* Edit/Create Post Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>{editingPost ? 'Edit Post' : 'Create Post'}</DialogTitle>
          <DialogContent>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              fullWidth
              multiline
              rows={4}
              margin="normal"
            />
            <TextField
              label="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              fullWidth
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleSubmitPost} color="primary">
              {editingPost ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={!!postToDelete} onClose={() => setPostToDelete(null)}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete this post?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setPostToDelete(null)} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleDeletePost} color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
};

export default Posts;

