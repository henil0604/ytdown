<script lang="ts">
    // The ordering of these imports is critical to your app working properly
    import "@skeletonlabs/skeleton/themes/theme-gold-nouveau.css";
    // If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
    import "@skeletonlabs/skeleton/styles/all.css";
    // Most of your app wide CSS should be put in this file
    import "../app.postcss";
    import { AppShell, AppBar } from "@skeletonlabs/skeleton";
</script>

<!-- App Shell -->
<AppShell>
    <svelte:fragment slot="header">
        <!-- App Bar -->
        <AppBar>
            <svelte:fragment slot="lead">
                <strong class="text-xl uppercase">YtDown</strong>
            </svelte:fragment>
            <svelte:fragment slot="trail">
                <a
                    class="btn btn-sm variant-ghost-surface"
                    href="https://github.com/henil0604/ytdown"
                    target="_blank"
                    rel="noreferrer"
                >
                    Github
                </a>
            </svelte:fragment>
        </AppBar>
    </svelte:fragment>
    <!-- Page Route Content -->
    <slot />
</AppShell>
