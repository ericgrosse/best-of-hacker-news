import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Comment from '../components/Comment';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    background: '#e65050',
    color: 'white',
  },
  details: {
    display: 'block'
  },
  icon: {
    color: 'white'
  },
}));

interface CommentsProps {
  commentIDs: Array<string>,
  comments: Array<string>,
  storyIndex: number,
  getComments: any,
}

const Comments: React.FC<CommentsProps> = ({ commentIDs, comments, storyIndex, getComments }) => {
  const classes = useStyles();

  return (
    <ExpansionPanel className={classes.root} onClick={() => { getComments(commentIDs, storyIndex) }}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon className={classes.icon} />}>
        <Typography>Comments</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.details}>
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
