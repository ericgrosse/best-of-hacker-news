import React from 'react';
import './App.scss';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';

interface Props { }

interface State {
  hackerNewsData: Array<Story>
}

interface Story {
  by: string,
  comments: Array<string>,
  title: string,
  url: string,
}

class App extends React.Component<Props, State> {
  state: State = {
    hackerNewsData: []
  };

  async componentDidMount() {
    // Retrieve the top 20 storyIDs
    const { data } = await axios.get(`https://hacker-news.firebaseio.com/v0/topstories.json`);
    let storyIDs = new Array(20).fill(null);

    for (let i = 0; i < Math.min(data.length, storyIDs.length); ++i) {
      storyIDs[i] = data[i];
    }

    // hackerNewsData is an array of objects, each containing story data and an array of top 10 comments
    const hackerNewsData = await Promise.all(
      // Retrieve the stories and top 10 commentIDs for each story
      storyIDs.map(async (storyID: number) => {
        try {
          const { data } = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${storyID}.json`);
          const commentIDs = new Array(10).fill(null);

          for (let i = 0; i < Math.min((data.kids || []).length, commentIDs.length); ++i) {
            commentIDs[i] = data.kids[i];
          }

          // Retrieve the comments from the commentIDs
          const comments = await Promise.all(
            commentIDs.map(async (commentID: number) => {
              try {
                const { data } = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${commentID}.json`);
                return (data || {}).text || null;
              } catch (e) {
                console.error(e);
                return null;
              }
            })
          );

          return {
            ...data,
            comments,
          };
        }
        catch (e) {
          console.error(e);
          return {};
        }
      })
    );

    this.setState({ hackerNewsData })
  }

  render() {
    const { state } = this;

    return (
      <div className="App">
        <Grid container justify={'center'}>
          <Grid item xs={12} sm={6}>
            <h1>Best of Hacker News</h1>
            {
              state.hackerNewsData.map((story, index) => {
                return (
                  <div key={index}>
                    <h5><a href={story.url}>{story.title}</a></h5>
                    <h6>By: {story.by}</h6>
                    {
                      story.comments.map((comment, index) => {
                        return (
                          <div key={index}>
                            <div dangerouslySetInnerHTML={{ __html: comment }} />
                          </div>
                        )
                      })
                    }
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
