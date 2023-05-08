import type { VideoInfo } from "youtubei.js/dist/src/parser/youtube";

export default async function fetchVideoInfo(id: string) {
    try {
        const response = await fetch(`/api/getVideoInfo?id=${id}`);
        const data = await response.json()
        return data as VideoInfo;
    } catch (e) {
        return null;
    }
}