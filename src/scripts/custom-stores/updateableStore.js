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
    /**
     * Stores reset after each page refresh. But we wan't this store to be filled with the relevant data after each 
     * page refresh. This boolean store if we still need to fire the initial event or if we already have.
     */    
    let hadPageLoadCallback = false;

    // create a custom svelte store with the initial value of `undefined`.
    const { subscribe, set } = writable(undefined, () => {
        // Only execute this if we are in the browser. Apparently the server visits this function after building 
        // the source. The problem is that the server doesn't have the window object, which causes the whole 
        // development server to crash.
        if (process.browser) {
            // call the callback after the first subscriber has successfully subscribed to the store
            firstSubscribe(set);

            // check if we already fired the initial page load event
            if (!hadPageLoadCallback) {
                // if we havn't, fire it.
                updateCallback(set);
                // set the boolean to true, so we know we already fired this event.
                hadPageLoadCallback = true;
            }
        }

        return () => {
            // Only execute this if we are in the browser. Apparently the server visits this function after building 
            // the source. The problem is that the server doesn't have the window object, which causes the whole 
            // development server to crash.
            if (process.browser) {
                // call the callback after the last subscriber has successfully unsubscribed from the store
                lastUnsubscribe();
            }
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
