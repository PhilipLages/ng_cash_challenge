import { Decimal } from "@prisma/client/runtime";

export interface transactionsTypes {
    username: string;
    id: number;
    value: Decimal;
};