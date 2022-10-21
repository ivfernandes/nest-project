import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CourseService } from './course.service';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.courseService.findAll();
  }

  @Get(':code')
  @Roles(Role.ALUNO)
  @UseGuards(JwtAuthGuard, RolesGuard)
  findOne(@Param('code') code: string) {
    return this.courseService.findOneByCode(code);
  }
}
