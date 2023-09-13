import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Response,
  Request,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { Roles } from '../flatworks/roles/roles.decorator';
import { Role } from '../flatworks/types/types';


@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  //post {password: abc}
  @Post('changepassword')
  //@Roles(Role.Admin)
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Request() req,
  ) {
    const id = req.user.userId;
    return await this.service.update(id, changePasswordDto);
  }

  @Get()
  async index(@Response() res: any) {
    const result: any[] = await this.service.findAll();
    return res
      .set({
        'Content-Range': 10,
        'Access-Control-Expose-Headers': 'Content-Range',
      })
      .json(result);
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.service.findOne(id);
  }

  @Post()
  @Roles(Role.Admin)
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.service.create(createUserDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.service.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
