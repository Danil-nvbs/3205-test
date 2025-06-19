import axios from "axios";
import { IShorten, IShortenAnalytics, IShortenInfo } from "../types/shorten";

const API_URL = `${window.location.protocol}//${window.location.hostname}:3001`;

export const createShortLink = async (data: {
    originalUrl: string;
    alias?: string;
    expiresAt?: string;
}): Promise<IShorten> => {
    const response = await axios.post<IShorten>(`${API_URL}/shorten`, data);
    return response.data;
};

export const deleteShorten = async (shortUrl: string): Promise<void> => {
    await axios.delete(`${API_URL}/delete/${shortUrl}`);
};

export const getShortenInfo = async (shortUrl: string): Promise<IShortenInfo> => {
    const response = await axios.get<IShortenInfo>(`${API_URL}/info/${shortUrl}`);
    return response.data;
};

export const getShortenAnalytics = async (shortUrl: string): Promise<IShortenAnalytics> => {
  const response = await axios.get<IShortenAnalytics>(`${API_URL}/analytics/${shortUrl}`);
  return response.data;
};