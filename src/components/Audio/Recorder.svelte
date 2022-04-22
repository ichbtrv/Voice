<script lang="ts">
    import { onMount } from 'svelte';
    export let noteContent: string;
    export let recording: boolean;
    export let duration: number;
    export let audio_src: string;

    let recordingStarted = false;
    let timer: NodeJS.Timer;
    let media = [];
    let mediaRecorder: MediaRecorder;
    let SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = new SpeechRecognition();

    recognition.continuous = true;

    function durationStart() {
        duration = 0;
        timer = setInterval(() => ++duration, 1000);
    }

    function durationStop() {
        clearInterval(timer);
    }

    recognition.onresult = function (event) {
        let current = event.resultIndex;
        let transcript = event.results[current][0].transcript;

        let mobileRepeatBug =
            current === 1 && transcript === event.results[0][0].transcript;
        if (!mobileRepeatBug) {
            noteContent += transcript;
        }
    };

    onMount(async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true
        });

        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = (e) => media.push(e.data);
        mediaRecorder.onstop = function () {
            const blob = new Blob(media, { type: 'audio/wav; codecs=opus' });
            media = [];
            audio_src = window.URL.createObjectURL(blob);
        };
    });

    $: if (recording) {
        mediaRecorder.start();
        recognition.start();
        durationStart();
        recordingStarted = true;
    }
    $: if (!recording && recordingStarted) {
        mediaRecorder.stop();
        recognition.stop();
        durationStop();
        recordingStarted = false;
    }
</script>
