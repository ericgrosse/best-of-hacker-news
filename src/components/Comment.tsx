import React from 'react';
import Typography from '@material-ui/core/Typography';

interface CommentProps {
  comment: string
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <Typography>
      <div dangerouslySetInnerHTML={{ __html: comment }} />
    </Typography>
  );
}

export default Comment;
