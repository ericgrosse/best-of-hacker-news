import React from 'react';
import Typography from '@material-ui/core/Typography';
import './Comment.scss';
import { Comment } from '../interfaces/Comment';

interface CommentProps {
  comment: Comment
}

const _Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <div className="Comment">
      <p className="author">{comment.by}: </p>
      <div dangerouslySetInnerHTML={{ __html: comment.text }} />
    </div>
  );
}

export default _Comment;
