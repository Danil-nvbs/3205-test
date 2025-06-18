export interface IShorten {
    id: string;
    originalUrl: string;
    shortUrl: string;
    alias?: string;
    expiresAt?: string;
    createdAt: string;
}

  export interface IShortenInfo {
    originalUrl: string;
    createdAt: Date;
    clickCount: number;
}
  
  export interface IShortenAnalytics {
    clickCount: number;
    lastClicksIps: string[];
}