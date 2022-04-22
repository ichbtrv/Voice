<script lang="ts">
    export let title: string;
    export let body: string;
    export let date: Date;
</script>

<section
    class="flex flex-col p-8 rounded-xl shadow border-2 border-teal-300 m-4 max-w-[350px]"
>
    <h1 class="text-2xl mb-2">{title}</h1>
    <p class="text-base">{body}</p>
    <div class="mt-4 text-sm opacity-75 text-gray-400">{date}</div>
</section>
