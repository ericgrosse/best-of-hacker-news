import React from 'react';
import './App.scss';
import { Story } from '../interfaces/Story';
import apiHelper from '../helpers/apiHelper';
import TopStories from '../components/TopStories';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

interface Props { }

interface State {
  topStories: Array<Story>
}

class App extends React.Component<Props, State> {
  state: State = {
    topStories: []
  };

  async componentDidMount() {
    this.getTopStories();
  }

  getTopStories = async () => {
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
          data.comments = []; // Add a comments property to the data, which is populated when getComments() is called.

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

  getComments = async (commentIDs: Array<number>, storyIndex: number) => {
    const { state } = this;

    const comments = await Promise.all(
      commentIDs.map(async (commentID: number) => {
        try {
          const { data } = await apiHelper.getComment(commentID);
          return data.text;
        }
        catch (e) {
          console.error(e);
          return null;
        }
      })
    );

    let currentStory = Object.assign({}, this.state.topStories[storyIndex]);
    currentStory.comments = comments;

    this.setState({
      topStories: [
        ...state.topStories.slice(0, storyIndex),
        currentStory,
        ...state.topStories.slice(storyIndex + 1),
      ]
    });
  }

  render() {
    const { state } = this;

    return (
      <div className="App">
        <Grid container justify={'center'}>
          <Grid item xs={12} sm={8}>
            <h1>Best of Hacker News</h1>
            {
              state.topStories.length === 0 ?
                <CircularProgress /> :
                <TopStories
                  stories={state.topStories}
                  getComments={this.getComments}
                />
            }
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
