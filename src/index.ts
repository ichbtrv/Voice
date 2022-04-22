import Root from './components/Root.svelte';

const render = () => {
    new Root({
        target: document.querySelector('#root')
    });
};

render();
