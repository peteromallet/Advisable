class NotFoundError extends Error {
  constructor(params) {
    super(params)
    this.name = "NotFoundError"
  }
}

export default NotFoundError;
