import { createLog } from '../services/adminLog.service.js';

export const adminLogger = async (req, res, next) => {
  if (req.user && req.user.role === 'ADMIN') {
    try {
      const adminId = req.user.userId;
      const action = req.method;
      const resource = req.originalUrl;
      
      await createLog(adminId, action, resource);
    } catch (error) {
      console.error('❌ Error guardando log de admin:', error.message);
    }
  }
  
  next();
};