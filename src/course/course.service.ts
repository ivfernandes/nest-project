import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.course.findMany({
      select: {
        code: true,
        name: true,
        User: {
          select: {
            registration: true,
            name: true,
          },
        },
      },
    });
  }

  findOneByCode(code: string) {
    return this.prisma.course.findUnique({
      where: { code },
      include: {
        User: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
  }
}
