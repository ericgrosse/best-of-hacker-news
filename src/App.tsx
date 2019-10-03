import React from 'react';
import './App.scss';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';

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
      // Retrieve the top 20 storyIDs
      const { data } = await axios.get(`https://hacker-news.firebaseio.com/v0/topstories.json`);
      let storyIDs = new Array(20).fill(null);
      let storyCount = Math.min(data.length, storyIDs.length);
  
      for (let i = 0; i < storyCount; ++i) {
        storyIDs[i] = data[i];
      }
  
      for (let i = 0; i < storyCount; ++i) {
        try {
          const { data } = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${storyIDs[i]}.json`);

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
      }
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
                  <div key={index}>
                    <h5><a href={story.url}>{story.title}</a></h5>
                    <h6>By: {story.by}</h6>
                    {/* {
                      story.comments.map((comment, index) => {
                        return (
                          <div key={index}>
                            <div dangerouslySetInnerHTML={{ __html: comment }} />
                          </div>
                        )
                      })
                    } */}
                  </div>
                )
              })
            }
          </Grid>

        </Grid>
      </div>
    );
  }
}

export default App;
