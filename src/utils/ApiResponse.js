export const ApiResponse = async (res, status, message, payload) => {
  return await res.status(status).json({
    status: status,
    message: message,
    payload: payload,
  });
};
