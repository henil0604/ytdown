export default function getYoutubeVideoId(url: string) {
    let regex = /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm;
    let match = regex.exec(url);
    return match ? match[3] : null;
}