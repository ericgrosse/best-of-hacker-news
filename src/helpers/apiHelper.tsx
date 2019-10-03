import axios from 'axios';

const BASE_URL = `https://hacker-news.firebaseio.com/v0`;

const apiHelper = {
  getTopStories() {
    return axios.get(`${BASE_URL}/topstories.json`);
  },

  getStory(storyID: number) {
    return axios.get(`${BASE_URL}/item/${storyID}.json`);
  },

  getComment(commentID: number) {
    return axios.get(`${BASE_URL}/item/${commentID}.json`);
  },
}

export default apiHelper;
