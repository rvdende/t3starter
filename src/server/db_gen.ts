import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export interface Testtable {
  id: Generated<string>;
  title: string;
}

export interface DB {
  testtable: Testtable;
}
