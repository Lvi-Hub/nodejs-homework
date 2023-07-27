export const handleSaveError = (error, data, next) => {
  console.log(error);
  error.status = 400;
  next();
};

export const validateAtUpdate = function (next) {
  this.options.runValidators = true;
  next();
};
