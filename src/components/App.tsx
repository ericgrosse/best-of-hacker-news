import React from 'react';
import './App.scss';
import apiHelper from '../helpers/apiHelper';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

interface Props { }

interface State {
  topStories: Array<Story>
}

interface Story {
  by: string,
  kids: Array<string>, // kids are comments
  title: string,
  url: string,
}

class App extends React.Component<Props, State> {
  state: State = {
    topStories: []
  };

  async componentDidMount() {
    try {
      // Retrieve the top storyIDs
      let { data: storyIDs } = await apiHelper.getTopStories();

      // Filter down to the top 20 storyIDs
      if (storyIDs.length > 20) {
        storyIDs = storyIDs.slice(0, 20);
      }

      // For each storyID, make an API call to retrieve the relevant story and update state accordingly
      storyIDs.forEach(async (storyID: number) => {
        try {
          const { data } = await apiHelper.getStory(storyID);

          // If there are no comments, this property isn't set in the object returned by the API, so set it to an empty array.
          if (!data.kids) {
            data.kids = [];
          }

          // Filter down to top 10 commentIDs
          if (data.kids.length > 10) {
            data.kids = data.kids.slice(0, 10);
          }

          this.setState({
            topStories: [...this.state.topStories, { ...data }]
          });
        }
        catch (e) {
          console.error(e);
        }
      })
    }
    catch (e) {
      console.error(e);
      this.setState({ topStories: [] });
    }
  }

  render() {
    const { state } = this;

    return (
      <div className="App">
        <Grid container justify={'center'}>
          <Grid item xs={12} sm={6}>
            <h1>Best of Hacker News</h1>
            <TopStories stories={state.topStories} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

interface TopStoriesProps {
  stories: Array<Story>
}

interface StoryPanelProps {
  story: Story
}

interface CommentsProps {
  comments: Array<string>
}

const TopStories: React.FC<TopStoriesProps> = ({ stories }) => (
  <div>
    {
      stories.map((story, index) => (
        <StoryPanel
          key={index}
          story={story}
        />
      ))
    }
  </div>
);

const StoryPanel: React.FC<StoryPanelProps> = ({ story }) => (
  <Paper>
    <h4><a href={story.url}>{story.title}</a></h4>
    <h5>By: {story.by}</h5>
    <Comments comments={story.kids} />
  </Paper>
);

const Comments: React.FC<CommentsProps> = ({ comments }) => {
  return (
    <ExpansionPanel onClick={() => { console.log('doStuff') }}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Comments</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography>Sample comment</Typography>
        {/*
          comments.map((comment, index) => (
            <div>
              <Typography key={index}>{comment}</Typography>
            </div>
          ))
          */}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default App;
