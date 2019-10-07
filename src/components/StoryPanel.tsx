import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Story } from '../interfaces/Story';
import Comments from '../components/Comments';

interface StoryPanelProps {
    story: Story,
    storyIndex: number,
    getComments: any,
  }

const StoryPanel: React.FC<StoryPanelProps> = ({ story, storyIndex, getComments }) => {
    return (
      <Paper>
        <h4><a href={story.url}>{story.title}</a></h4>
        <h5>By: {story.by}</h5>
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
