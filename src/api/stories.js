import request from "./request";

export const fetchStories = ({ type }) => request({ url: `/stories/${type}` });
