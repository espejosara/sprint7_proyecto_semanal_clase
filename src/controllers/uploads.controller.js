export const uploadProductImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ ok: false, error: 'Debes enviar un archivo en el campo image' });
    }

    res.status(201).json({
      ok: true,
      data: {
        imageUrl: req.file.path,
        publicId: req.file.filename,
      },
    });
  } catch (error) {
    next(error);
  }
};
