import axios from "axios";
import videosDB from "../test-data.json";

const fetchVideos = async (url) => {
  const baseUrl = "youtube.googleapis.com/youtube/v3";
  const { data } = await axios.get(
    `https://${baseUrl}/${url}&maxResults=25&key=${process.env.YOUTUBE_API_KEY}`
  );

  if (data) {
    return data.items.map((item) => ({
      videoId:
        url[0] === "v"
          ? item.id
          : item.id.videoId
          ? item.id.videoId
          : item.id.channelId,
      title: item.snippet.title,
      imgUrl: item.snippet.thumbnails.high.url,
      description: item.snippet.description,
      publishTime: item.snippet.publishedAt,
      channelTitle: item.snippet.channelTitle,
      viewCount: item.statistics ? item.statistics.viewCount : 0,
    }));
  }
};

export const getCommonVideos = async (url) => {
  try {
    return process.env.DEVELOPMENT ? videosDB : await fetchVideos(url);
  } catch (error) {
    console.log({ error: error });
    return [];
  }
};

export const getVideos = async (searchQuery = "movie trailer") => {
  const url = `search?part=snippet&q=${searchQuery}`;

  return await getCommonVideos(url);
};

export const getPopularVideos = async () => {
  const url = `videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US`;

  return await getCommonVideos(url);
};

export const getYoutubeVideoById = async (id) => {
  const url = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}`;

  return await getCommonVideos(url);
};

// https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=disney%20trailer&key=[YOUR_API_KEY] HTTP/1.1
// https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&key=[YOUR_API_KEY]
