export const errorHandler = (error, req, res, next) => {
  if (error.name === 'MulterError') {
    return res.status(400).json({ ok: false, code: 'UPLOAD_ERROR', error: error.message });
  }

  if (error.message === 'Solo se permiten archivos de imagen') {
    return res.status(400).json({ ok: false, code: 'INVALID_FILE_TYPE', error: error.message });
  }

  const status = error.status || error.statusCode || 500;
  const code = error.code || 'INTERNAL_ERROR';

  console.error(`[${code}] ${status} - ${error.message}`);

  res.status(status).json({
    ok: false,
    code,
    error: 'Internal server error',
  });
};