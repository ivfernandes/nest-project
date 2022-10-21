import { BadRequestException, Injectable } from '@nestjs/common';
import { CourseService } from 'src/course/course.service';
import { PrismaService } from 'src/database/prisma.service';
import { hashPassword } from 'src/utils/bcrypt';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { Validations } from 'src/utils/validations';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private courseService: CourseService,
  ) {}

  async create(data: UserCreateDto) {
    const user_exists = await this.findOneByRegistration(data.registration);
    if (user_exists) throw new BadRequestException('Usuário já existe.');

    const email_exists = await this.findOneByEmail(data.email);
    if (email_exists) throw new BadRequestException('E-mail já cadastrado.');

    const course_exists = await this.courseService.findOneByCode(
      data.course_code,
    );
    if (!course_exists) throw new BadRequestException('Curso não encontrado.');

    if (!Validations.isValidPassword(data.password))
      throw new BadRequestException(
        'Senha não atende aos requisitos mínimos de segurança.',
      );

    const user = await this.prisma.user.create({
      data: {
        ...data,
        password: await hashPassword(data.password),
      },
    });
    return user;
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        registration: true,
        email: true,
        role: true,
        course: {
          select: {
            code: true,
            name: true,
          },
        },
      },
      orderBy: {
        created_at: 'asc',
      },
    });
  }

  async findOneByRegistration(registration: string) {
    const user = await this.prisma.user.findUnique({
      where: { registration },
    });
    return user;
  }

  async findOneByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async update(id: string, data: UserUpdateDto) {
    const user_exists = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user_exists) throw new BadRequestException('Usuário não encontrado.');

    return this.prisma.user.update({
      data,
      where: { id },
    });
  }

  async delete(id: string) {
    const user_exists = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user_exists) throw new BadRequestException('Usuário não encontrado.');

    return this.prisma.user.delete({
      where: { id },
    });
  }
}
