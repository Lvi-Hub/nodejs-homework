const messageList = {
  400: "Bad Request",
  401: "Unathorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
};

const HttpError = (status, message = messageList[status]) => {
  const error = new Error(message);
  error.ststus = status;
  return error;
};
export default HttpError;