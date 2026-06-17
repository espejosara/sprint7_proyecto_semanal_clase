import adminLog from '../models/adminLog.model.js';

export const createLog = async (adminId, action, resource) => {
  const log = new AdminLog({ adminId, action, resource });
  return await log.save();
};