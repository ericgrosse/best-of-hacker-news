import React from 'react';
import Typography from '@material-ui/core/Typography';
import './Comment.scss';

interface CommentProps {
  comment: string
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <div className="Comment">
      <div dangerouslySetInnerHTML={{ __html: comment }} />
    </div>
    
  );
}

export default Comment;
