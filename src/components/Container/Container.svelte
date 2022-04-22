<script lang="ts">
    import AudioNote from '../Audio/AudioNote.svelte';
    import AudioPlayer from '../Audio/AudioPlayer.svelte';
    import Recorder from '../Audio/Recorder.svelte';
    import Modal from '../Modal/Modal.svelte';

    export let playing: boolean;
    export let recording: boolean;
    export let counter: number;
    export let duration: number;
    export let modalVisible: boolean;

    let noteContent = '';
    let audio_src: string;
</script>

<section class="flex flex-col flex-1 items-center w-[100vw]">
    <AudioPlayer bind:audio_src bind:playing on:stop bind:counter />
    <Recorder bind:audio_src bind:recording bind:duration bind:noteContent />
</section>
<section>
    <AudioNote bind:noteContent />
    <Modal bind:visible={modalVisible} {noteContent} />
</section>
