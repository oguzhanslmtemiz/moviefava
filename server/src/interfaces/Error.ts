export interface IDatabaseError {
  query: string;
  parameters: string[];
  driverError: IDriverError;
  code: string;
  errno: number;
  sqlMessage: string;
  sqlState: string;
  index: number;
  sql: string;
}

interface IDriverError {
  code: string;
  errno: number;
  sqlMessage: string;
  sqlState: string;
  index: number;
  sql: string;
}
