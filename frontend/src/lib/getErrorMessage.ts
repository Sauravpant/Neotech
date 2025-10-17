export const getErrorMessage = (err: any): string => {
  return err?.response?.data?.message;
};
