export const errorHandler = (error, req, res, next) => {
  console.error("Error:", error.message);
  res.status(500).json({
    ok: false,
    error: "Internal server error",
  });
};