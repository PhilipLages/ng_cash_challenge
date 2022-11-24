import { FormEventHandler } from "react";

export interface CreateTransactionsTypes {
  balance: number;
  transaction: {
    username: string;
    value: number;
  };
  handleSubmit: FormEventHandler;
  setTransaction: Function;
};