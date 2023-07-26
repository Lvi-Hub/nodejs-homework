export const handleSaveError = (error, data, next) => {
  console.log(error);
  error.status = 400;
  next();
};
