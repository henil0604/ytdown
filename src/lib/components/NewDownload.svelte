<script lang="ts">
    import getYoutubeVideoId from "@/lib/utils/getYoutubeVideoId";
    import fetchVideoInfo from "@/lib/utils/fetchVideoInfo";
    import { NewDownloadCardLoading } from "@/lib/store";
    import { ProgressBar } from "@skeletonlabs/skeleton";
    import type { VideoInfo } from "youtubei.js/dist/src/parser/youtube";
    import Icon from "@iconify/svelte";
    import type { Format } from "youtubei.js/dist/src/parser/misc";

    const sizeFormatter = new Intl.NumberFormat([], {
        style: "unit",
        unit: "byte",
        notation: "compact",
        unitDisplay: "narrow",
    });

    let url: string = "https://www.youtube.com/watch?v=tPEE9ZwTmy0";

    let videoInfo: VideoInfo | null = null;
    let videoFormats: Format[] = [];

    async function handleNext() {
        NewDownloadCardLoading.set(true);

        let id = getYoutubeVideoId(url);
        if (!id) return;

        // fetching info
        const info = await fetchVideoInfo(id);
        videoInfo = info;

        if (!info) return;

        console.log(info);

        // streaming formats
        const formats =
            [
                ...(info.streaming_data?.formats || []),
                ...(info.streaming_data?.adaptive_formats || []),
            ] || null;

        if (formats) {
            videoFormats = formats.filter((e) => {
                return e.quality_label;
            });
            console.log(videoFormats);
        }

        NewDownloadCardLoading.set(false);
    }
</script>

<div class="card relative overflow-hidden">
    {#if $NewDownloadCardLoading}
        <div
            class="h-full w-full absolute top-0 left-0 backdrop-blur-sm z-[99]"
        >
            <ProgressBar value={undefined} />
        </div>
    {/if}

    <header class="card-header"><h3>New Download</h3></header>
    <hr class="my-2" />
    <section class="p-4">
        {#if videoInfo}
            <div class="flex gap-2 max-md:flex-col">
                <div class="flex flex-col gap-2 pr-10 max-md:pr-0 max-md:pb-10">
                    <!-- title -->
                    <div>
                        <strong>Title:</strong>
                        <span>{videoInfo.basic_info.title}</span>
                    </div>
                    <div>
                        <iframe
                            width="560"
                            height="315"
                            src={videoInfo.basic_info.embed?.iframe_url}
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen
                        />
                    </div>
                    <button
                        class="btn variant-ghost-error"
                        on:click={() => {
                            videoInfo = null;
                            videoFormats = [];
                        }}>Go back</button
                    >
                </div>
                <div class="grid grid-cols-2 max-md:grid-cols-1 gap-2">
                    {#each videoFormats as format}
                        <div class="card">
                            <section class="p-4 flex gap-2">
                                <div class="flex gap-1 items-center">
                                    {format.quality_label}
                                    {format.mime_type.split(";")[0]}
                                    {#if format.content_length}
                                        ({sizeFormatter.format(
                                            format.content_length
                                        )})
                                    {/if}
                                    {#if format.has_audio === false}
                                        <Icon
                                            color="red"
                                            icon="ri:volume-mute-fill"
                                        />
                                    {/if}
                                </div>
                                <div id="actions" class="flex gap-2">
                                    <a
                                        class="btn variant-ghost-success btn-sm"
                                        href={format.url}
                                        target="_blank"
                                    >
                                        <Icon
                                            icon="material-symbols:download"
                                        />
                                    </a>
                                </div>
                            </section>
                        </div>
                    {/each}
                </div>
            </div>
        {:else}
            <label class="label">
                <span>Youtube Video URL</span>
                <input
                    class="input min-w-[300px]"
                    bind:value={url}
                    type="text"
                    placeholder="https://www.youtube.com/watch?v00000000000"
                />
            </label>
        {/if}
    </section>
    <footer class="card-footer">
        {#if !videoInfo}
            <button on:click={handleNext} class="btn variant-filled-primary"
                >Next</button
            >
        {/if}
    </footer>
</div>
