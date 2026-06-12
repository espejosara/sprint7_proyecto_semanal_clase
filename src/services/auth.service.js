import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../db/prisma.js';

export const registerUser = async (email, password) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error('El correo electrónico ya está registrado');
  }

  const hashedPassword = await bcrypt.hash(password, 10);


  const newUser = await prisma.user.create({
    data: { email, password: hashedPassword },
  });

  return newUser;
};

export const loginUser = async (email, password) => {
  
  const user = await prisma.user.findUnique({ where: { email } });
  
  if (!user) {
    throw new Error('Credenciales inválidas');
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  
  if (!isValidPassword) {
    throw new Error('Credenciales inválidas');
  }


  const token = jwt.sign(
    { userId: user.id, role: user.role, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );

  return token;
};
