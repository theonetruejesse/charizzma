export const truncate = input =>
  input.length > 45 ? `${input.substring(0, 45)}...` : input;
