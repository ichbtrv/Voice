import { get, writable } from 'svelte/store';
import { set as db_set, get as db_get } from 'idb-keyval';

type Notes = {
    title: string;
    body: string;
    date: Date;
}[];
export const notes = writable<Notes>(null);

export async function notesRestore() {
    let prev_notes = await db_get('notes');

    if (prev_notes) {
        notes.set(prev_notes);
        return true;
    }
    return false;
}

export async function notesInit(title, body) {
    try {
        let prev_notes = await db_get('notes');
        const note = {
            title,
            body,
            date: new Date()
        };

        if (!prev_notes) {
            notes.set([note]);
            await db_set('notes', get(notes));
            return;
        }

        updateNotesOnRestore(note, prev_notes);
    } catch (error) {
        throw new Error(error);
    }
}

async function updateNotesOnRestore(note, prev_notes) {
    try {
        notes.set([note, ...prev_notes]);
        await db_set('notes', get(notes));
    } catch (error) {
        throw new Error(error);
    }
}
