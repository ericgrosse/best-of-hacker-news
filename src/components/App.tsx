import React from 'react';
import './App.scss';
import apiHelper from '../helpers/apiHelper';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

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
      let { data : storyIDs } = await apiHelper.getTopStories();

      // Filter down to the top 20 storyIDs
      if (storyIDs.length > 20) {
        storyIDs = storyIDs.slice(0, 20);
      }
  
      // For each storyID, make an API call to retrieve the relevant story and update state accordingly
      storyIDs.forEach(async (storyID : number) => {
        try {
          const { data } = await apiHelper.getStory(storyID);

          // If there are no comments, this property isn't set in the object returned by the API, so set it to an empty array.
          if (!data.kids) {
            data.kids = [];
          }

          this.setState({
            topStories: [...this.state.topStories, {...data}]
          });
        }
        catch (e) {
          console.error(e);
        }
      })
    }
    catch (e) {
      console.error(e);
      this.setState({topStories: []});
    }
  }

  render() {
    const { state } = this;

    return (
      <div className="App">
        <Grid container justify={'center'}>
          <Grid item xs={12} sm={6}>
            <h1>Best of Hacker News</h1>
            {
              state.topStories.map((story, index) => {
                return (
                  <StoryPanel
                    key={index}
                    story={story}
                  />
                );
              })
            }
          </Grid>
        </Grid>
      </div>
    );
  }
}

interface SampleProps {
  story: Story
}

const StoryPanel : React.FC<SampleProps> = ({story}) => {
  return (
    <Paper>
      <h5><a href={story.url}>{story.title}</a></h5>
      <h6>By: {story.by}</h6>
    </Paper>
  );
}

export default App;
