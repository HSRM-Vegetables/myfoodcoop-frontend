import { writable } from 'svelte/store';
import { updateable } from '../scripts/custom-stores/updateableStore'
import User from '../scripts/user/User';

export const userDetails = updateable(async (set) => {
    // indicate that the user details are updating
    areUserDetailsUpdating.set(true);

    // update user details
    set(await User.getUser());

    // indicate that the user details have finished updating 
    areUserDetailsUpdating.set(false);
})

export const areUserDetailsUpdating = writable(false)
