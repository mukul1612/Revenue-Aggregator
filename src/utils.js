export const formatNumber = (num) => {
  return num.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });
};
