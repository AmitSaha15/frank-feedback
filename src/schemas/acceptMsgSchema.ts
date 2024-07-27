import { boolean, z } from 'zod';

export const accpectMsgSchema = z.object({
    acceptMsgs: z.boolean()
})