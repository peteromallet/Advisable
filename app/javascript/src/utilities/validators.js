export const required = (error = 'required') => value => {
  if (value && value.trim().length > 0) return
  return error
}
