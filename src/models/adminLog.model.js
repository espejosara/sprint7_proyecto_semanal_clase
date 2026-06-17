import mongoose from 'mongoose';

const adminLogSchema = new mongoose.Schema({
  adminId: { type: String, required: true },
  action: { type: String, required: true },
  resource: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('AdminLog', adminLogSchema);