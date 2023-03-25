export const isOutDated = (date: number): boolean => {
  return Date.now() - date > 10 * 60 * 1000;
};
