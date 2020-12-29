import { writable } from 'svelte/store';

/**
 * Creates a custom svelte store which provides the possibilie to call .forceUpdate() on any store to refresh its 
 * values. As this is a store the updated value will take affect everywhere in the frontend without explicitly resetting
 * those values.
 * Have a look here for a tutorial about custom stores: https://svelte.dev/tutorial/custom-stores
 * @param {(set) => {}} updateCallback Function that should be called when an update is necessary,
 * i.e. through a request to store.forceUpdate()
 * @param {(set) => {}} firstSubscribe optional: Function that should be called after the first subscriber
 * has successfully subscribed to the store
 * @param {() => {}} lastUnsubscribe optional: Function that should be called after the last subscriber
 * has successfully unsubscribed from the store
 */
export function updateable(updateCallback, firstSubscribe = () => {}, lastUnsubscribe = () => {}) {
    // create a custom svelte store with the initial value of `undefined`.
    const { subscribe, set } = writable(undefined, () => {
        // call the callback after the first subscriber has successfully subscribed to the store
        firstSubscribe(set);

        return () => {
            // call the callback after the last subscriber has successfully unsubscribed from the store
            lastUnsubscribe();
        }
    });

    // return the properties that belong to a svelte store, and also return the function `forceUpdate`, 
    // which will run the `updateCallback`
    return {
        subscribe,
        set,
        forceUpdate: () => updateCallback(set),
    };
}
