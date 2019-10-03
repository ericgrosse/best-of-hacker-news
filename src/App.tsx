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

    // Retrieve the top 10 comments for each story
    const commentsPerStory = await Promise.all(
      storyIDs.map(async (storyID : Number) => {
        const { data } = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${storyID}.json`);
        const commentIDs = new Array(10).fill(null);

        for (let i = 0; i < Math.min((data.kids || []).length, commentIDs.length); ++i) {
          commentIDs[i] = data.kids[i];
        }

        const comments = commentIDs.map(async (commentID : Number) => {
          const { data } = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${commentID}.json`);
          return (data || {}).text || null;
        });

        return comments;
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
