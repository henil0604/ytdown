import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { youtube } from "@/lib/youtube";
import { Utils } from "youtubei.js";

export const GET: RequestHandler = async ({ request, params, url }) => {

    let id = url.searchParams.get("id");
    let quality = url.searchParams.get("quality");

    if (!id) {
        throw error(400, "video id is required")
    }

    const info = await youtube.getInfo(id)

    let options = {
        type: 'video+audio' as const,
        quality: '360p',
    }

    const stream = await info.download(options);

    const format = info.chooseFormat(options);
    let totalLength = format.content_length as number;
    console.log("totalLength", totalLength)
    let downloadedLength = 0;

    for await (const chunk of Utils.streamToIterable(stream)) {
        console.log(chunk)
        downloadedLength += chunk.length;
        console.info(Math.round(downloadedLength / totalLength * 100) + '%');
    }


    return json(info);
};