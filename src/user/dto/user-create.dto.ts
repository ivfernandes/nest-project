import { Role } from '@prisma/client';

export type UserCreateDto = {
  name: string;
  email: string;
  registration: string;
  course_code: string;
  role: Role;
  password: string;
};
