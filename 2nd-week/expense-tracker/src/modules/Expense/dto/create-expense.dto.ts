import { z } from 'zod';

export const createExpenseDto = z.object({
    userId: z.number().min(1),
    groupId: z.number().min(1),
    description: z.string().optional(),
    cost: z.number().min(1),
});

export type CreateExpenseDto = z.infer<typeof createExpenseDto>;
