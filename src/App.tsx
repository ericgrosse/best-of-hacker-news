import React from 'react';
import './App.scss';
import axios from 'axios'

interface Props {}

interface State {}

class App extends React.Component<Props, State> {
  state: State = {

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
      storyIDs.map(async (storyID : Number) => {
        const { data } = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${storyID}.json`);
        const commentIDs = new Array(10).fill(null);

        for (let i = 0; i < Math.min((data.kids || []).length, commentIDs.length); ++i) {
          commentIDs[i] = data.kids[i];
        }

        // Retrieve the comments from the commentIDs
        const comments = await Promise.all(
          commentIDs.map(async (commentID : Number) => {
            const { data } = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${commentID}.json`);
            return (data || {}).text || null;
          })
        );

        return {
          ...data,
          comments,
        };
      })
    );
  }

  render() {
    return (
      <div className="App">
        <h1>Best of Hacker News</h1>
      </div>
    );
  }
}

export default App;
