<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import AudioAnalyser from './audio/AudioAnalyser';
    import AudioVisualiser from './AudioVisualiser.svelte';

    export let audio_src: string;
    export let playing: boolean;
    export let counter: number;

    const dispatch = createEventDispatcher();

    let audio: HTMLAudioElement;
    let stopped = false;
    let analyser;
    let spectrum = [];
    let timer;

    function start() {
        timer = setInterval(() => ++counter, 1000);
    }

    function stop() {
        clearInterval(timer);
        counter = 0;
    }
    $: {
        if (audio && playing) {
            if (!analyser) {
                analyser = new AudioAnalyser(audio);
            }
            audio.play();
            start();

            analyser.connect();
            analyser.process();
            stopped = true;

            audio.addEventListener('pause', () => {
                analyser.stop;
                stop();
                dispatch('stop', event);
            });
        }
    }

    $: {
        if (analyser) {
            analyser.store.subscribe((volume) => {
                spectrum = volume;
            });
        }
    }
</script>

<section class="flex flex-col justify-center">
    {#if audio_src}
        <AudioVisualiser {spectrum} />
        <div class="mx-auto">
            <audio
                on:play={() => {
                    analyser.process();
                }}
                bind:this={audio}
                src={audio_src}
            />
        </div>
        <div
            hidden={stopped}
            class="text-4xl mx-4 inline-flex justify-center {!stopped
                ? 'mt-48'
                : ''}"
        >
            Now Press the Play Icon.
        </div>
        <div hidden={stopped} class="text-2xl mx-4 inline-flex justify-center">
            Or the Floppy Disk Icon to save
        </div>
    {:else}
        <div class="text-4xl mx-4 mt-48">
            Press the Microphone Icon to Start Recording.
        </div>
    {/if}
</section>
