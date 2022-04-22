<script lang="ts">
    export let spectrum;
</script>

<section class="inline-flex justify-center scale-50">
    {#each spectrum as vol, i}
        <div
            class="spectrum flex"
            style="transform: scale(1, {vol / 255 + 0.002}); 
                 left: {i * 4}px;"
        />
    {/each}
</section>

<style>
    .spectrum {
        width: 1px;
        height: 250px;
        background: linear-gradient(90deg, #27cc95, rgb(42, 42, 42));
        margin-right: 3px;
        transition: transform ease 0.2s;
        transform: scale(0.01);
        transform-origin: center right;
    }
</style>
