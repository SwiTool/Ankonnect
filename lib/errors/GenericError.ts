export default class GenericError extends Error {}

export type GenericErrorBody = {
  status: number;
  message: string;
};
