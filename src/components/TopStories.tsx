import React from 'react';
import { Story } from '../interfaces/Story';
import StoryPanel from '../components/StoryPanel';

interface TopStoriesProps {
  stories: Array<Story>,
  getComments: any,
}

const TopStories: React.FC<TopStoriesProps> = ({ stories, getComments }) => (
  <div>
    {
      stories.map((story, index) => (
        <StoryPanel
          key={index}
          story={story}
          storyIndex={index}
          getComments={getComments}
        />
      ))
    }
  </div>
);

export default TopStories;