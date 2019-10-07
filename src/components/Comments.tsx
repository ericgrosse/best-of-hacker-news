import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Comment from '../components/Comment';

interface CommentsProps {
  commentIDs: Array<string>,
  comments: Array<string>,
  storyIndex: number,
  getComments: any,
}

const Comments: React.FC<CommentsProps> = ({ commentIDs, comments, storyIndex, getComments }) => {
  return (
    <ExpansionPanel onClick={() => { getComments(commentIDs, storyIndex) }}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Comments</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        {
          comments.length === 0 ?
            <CircularProgress /> :
            comments.map((comment, index) => (<Comment key={index} comment={comment} />))
        }
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default Comments;
