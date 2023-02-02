export const handleError = (error : any) => {
  if (error && error.response && error.response && error.response.data && error.response.data.error) {
    return error.response.data.error;
  } else if (error.data && error.data.error) {
    return error.data.error;
  } else if (error.response && error.response.error) {
    return error.response.error;
  }
  return error;
};
