import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Story } from '../interfaces/Story';
import Comments from '../components/Comments';
import { makeStyles } from '@material-ui/core/styles';
import './StoryPanel.scss';

const useStyles = makeStyles(theme => ({
  root: {
    background: '#e65050',
    color: 'white',
    padding: '0',
    margin: '16px 0',
  }
}));

interface StoryPanelProps {
    story: Story,
    storyIndex: number,
    getComments: any,
  }

const StoryPanel: React.FC<StoryPanelProps> = ({ story, storyIndex, getComments }) => {
    const classes = useStyles();
    return (
      <Paper className={`${classes.root} StoryPanel`}>
        <div className="story-info">
          <h4><a href={story.url}>{story.title}</a></h4>
          <p>By: {story.by}</p>
        </div>
        <Comments
          commentIDs={story.kids}
          comments={story.comments}
          storyIndex={storyIndex}
          getComments={getComments}
        />
      </Paper>
    );
  };

  export default StoryPanel;
