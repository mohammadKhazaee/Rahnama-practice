import { z } from 'zod';

export const getExpenseDto = z.object({
    userId: z.coerce.number().min(1),
    groupId: z.coerce.number().min(1),
});

export type GetExpenseDto = z.infer<typeof getExpenseDto>;
