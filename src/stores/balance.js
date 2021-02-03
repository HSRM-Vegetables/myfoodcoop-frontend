import { get } from 'svelte/store';
import Balance from '../scripts/balance/Balance';
import { userId } from './user';
import { updateable } from '../scripts/custom-stores/updateableStore';

export const currentBalance = updateable(async (set) => {
    set(await Balance.getBalanceForUser(get(userId)));
});