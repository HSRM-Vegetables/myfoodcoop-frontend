import Balance from '../scripts/Balance';
import { intervalUpdateable, Intervals } from '../scripts/custom-stores/intervalUpdateable';

export const currentBalance = intervalUpdateable(Intervals.TWO_MINUTES, async (set) => {
    set(await Balance.getBalance());
});