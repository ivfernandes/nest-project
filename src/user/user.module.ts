import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/database/prisma.service';
import { CourseService } from 'src/course/course.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, CourseService],
  exports: [UserService],
})
export class UserModule {}
