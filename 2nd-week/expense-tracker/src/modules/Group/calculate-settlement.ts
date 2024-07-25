import { Expense } from '../../routes/expense.route';
import { Group, groups, Settlement } from '../../routes/group.route';
import { NotFoundError } from '../../utility/Application-error';

export const calculateSettlement = (groupId: number): Settlement[] => {
    const group = groups.find((g) => g.id === groupId);
    if (!group) throw new NotFoundError("couldn't find the group");

    return calculate(group);
};

export const calculate = (group: Group): Settlement[] => {
    const memberCount = group.users.length;
    const totalPayedPerMember = group.expenses.reduce((result, expense) => {
        if (!result[expense.userId]) result[expense.userId] = expense.cost;
        else result[expense.userId] += expense.cost;

        return result;
    }, {} as { [memberId: number]: number });

    const debts: Settlement[] = [];
    for (let i = 0; i < group.users.length; i++) {
        for (let j = i + 1; j < group.users.length; j++) {
            if (
                totalPayedPerMember[group.users[i].id] >
                totalPayedPerMember[group.users[j].id]
            )
                debts.push({
                    debtorId: group.users[j].id,
                    creditorId: group.users[i].id,
                    amount:
                        (totalPayedPerMember[group.users[i].id] -
                            totalPayedPerMember[group.users[j].id]) /
                        memberCount,
                });
            else if (
                totalPayedPerMember[group.users[j].id] >
                totalPayedPerMember[group.users[i].id]
            )
                debts.push({
                    debtorId: group.users[i].id,
                    creditorId: group.users[j].id,
                    amount:
                        (totalPayedPerMember[group.users[j].id] -
                            totalPayedPerMember[group.users[i].id]) /
                        memberCount,
                });
        }
    }

    const debtsWithShortcuts: Settlement[] = [];
    for (let i = 0; i < debts.length; i++) {
        if (debts[i].amount === 0) continue;
        for (let j = i + 1; j < debts.length; j++) {
            if (debts[j].amount === 0) continue;
            if (debts[i].debtorId === debts[j].creditorId) {
                if (debts[i].amount >= debts[j].amount) {
                    debtsWithShortcuts.push({
                        debtorId: debts[j].debtorId,
                        creditorId: debts[i].creditorId,
                        amount: debts[j].amount,
                    });
                    debts[i].amount -= debts[j].amount;
                    debts[j].amount = 0;
                } else {
                    debtsWithShortcuts.push({
                        debtorId: debts[j].debtorId,
                        creditorId: debts[i].creditorId,
                        amount: debts[i].amount,
                    });
                    debts[j].amount -= debts[i].amount;
                    debts[i].amount = 0;
                }
            } else if (debts[i].creditorId === debts[j].debtorId) {
                if (debts[i].amount >= debts[j].amount) {
                    debtsWithShortcuts.push({
                        debtorId: debts[i].debtorId,
                        creditorId: debts[j].creditorId,
                        amount: debts[j].amount,
                    });
                    debts[i].amount -= debts[j].amount;
                    debts[j].amount = 0;
                } else {
                    debtsWithShortcuts.push({
                        debtorId: debts[i].debtorId,
                        creditorId: debts[j].creditorId,
                        amount: debts[i].amount,
                    });
                    debts[j].amount -= debts[i].amount;
                    debts[i].amount = 0;
                }
            }
        }
        if (debts[i].amount !== 0) debtsWithShortcuts.push(debts[i]);
    }

    const visited = new Array(debtsWithShortcuts.length).fill(false);
    const settlements: Settlement[] = [];
    for (let i = 0; i < debtsWithShortcuts.length; i++) {
        for (let j = i + 1; j < debtsWithShortcuts.length; j++) {
            if (
                debtsWithShortcuts[i].creditorId ===
                    debtsWithShortcuts[j].creditorId &&
                debtsWithShortcuts[i].debtorId ===
                    debtsWithShortcuts[j].debtorId
            ) {
                debtsWithShortcuts[i].amount += debtsWithShortcuts[j].amount;
                visited[j] = true;
            }
        }
        if (!visited[i]) settlements.push(debtsWithShortcuts[i]);
    }

    return settlements;
};
