import Balance from '../scripts/Balance';
import { updateable } from '../scripts/custom-stores/updateableStore';

export const currentBalance = updateable(async (set) => {
    set(await Balance.getBalance());
});