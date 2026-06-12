export const getProfile = async (req, res, next) => {
  try {
    res.status(200).json({
      ok: true,
      data: {
        id: req.user.userId,
        email: req.user.email,
        role: req.user.role
      }
    });
  } catch (error) {
    next(error);
  }
};