import { NODE_ENV } from '$env/static/private';
import { Innertube } from 'youtubei.js/web';

const globalForYoutube = globalThis as unknown as { youtube: Innertube };

export const youtube =
    globalForYoutube.youtube ||
    await Innertube.create();

if (NODE_ENV !== "production") globalForYoutube.youtube = youtube;