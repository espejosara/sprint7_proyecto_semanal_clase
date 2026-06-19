export const errorHandler = (error, req, res, next) => {
  const status = error.status || error.statusCode || 500;
  const code = error.code || 'INTERNAL_ERROR';

  console.error(`[${code}] ${status} - ${error.message}`);

  res.status(status).json({
    ok: false,
    code,
    error: 'Internal server error',
  });
};