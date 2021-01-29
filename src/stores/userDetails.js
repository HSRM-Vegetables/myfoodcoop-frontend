import { writable, get } from 'svelte/store';
import { userId } from './user';
import { updateable } from '../scripts/custom-stores/updateableStore'
import User from '../scripts/user/User';

export const userDetails = updateable(async (set) => {
    // indicate that the user details are updating
    areUserDetailsUpdating.set(true);

    // update user details
    set(await User.getUserById(get(userId)));

    // indicate that the user details have finished updating 
    areUserDetailsUpdating.set(false);
})

export const areUserDetailsUpdating = writable(false)
