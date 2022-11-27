import { Decimal } from "@prisma/client/runtime";

export interface CreatetransactionsTypes {
    username: string;
    id: number;
    value: Decimal;
};