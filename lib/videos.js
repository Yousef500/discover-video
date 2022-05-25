import axios from "axios";

export const getVideos = async () => {
  const { data } =
    await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=disney%20trailer&key=${process.env.YOUTUBE_API_KEY}
    `);

  if (data) {
    return data.items.map((item) => ({
      videoId: item.id.videoId ? item.id.videoId : item.id.channelId,
      title: item.snippet.title,
      imgUrl: item.snippet.thumbnails.high.url,
    }));
  }

  return [];
};

// https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=disney%20trailer&key=[YOUR_API_KEY] HTTP/1.1
