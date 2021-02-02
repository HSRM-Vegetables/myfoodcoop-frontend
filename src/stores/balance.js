import Balance from '../scripts/balance/Balance';
import { updateable } from '../scripts/custom-stores/updateableStore';

export const currentBalance = updateable(async (set) => {
    set(await Balance.getBalance());
});