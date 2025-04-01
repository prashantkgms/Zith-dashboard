import React from 'react';
import { Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const PostCard = ({ post, onDelete, onEdit }) => {
  return (
    <Card sx={{ padding: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6" gutterBottom>
          <strong>{post.title}</strong>
        </Typography>
        <Typography variant="body2" gutterBottom>
          {post.content}
        </Typography>
        <Typography variant="body2">
          <strong>Author: </strong>{post.author}
        </Typography>
      </CardContent>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'flex-end' }}>
        <IconButton color="primary" onClick={() => onEdit(post)}>
          <EditIcon />
        </IconButton>
        <IconButton color="error" onClick={() => onDelete(post)}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Card>
  );
};

export default PostCard;
