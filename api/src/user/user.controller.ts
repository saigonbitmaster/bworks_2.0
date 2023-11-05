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
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { Roles } from '../flatworks/roles/roles.decorator';
import { Role } from '../flatworks/types/types';
import { queryTransform, formatRaList } from '../flatworks/utils/getlist';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post('changepassword')
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Request() req,
  ) {
    const id = req.user.userId;
    return await this.service.changePassword(id, changePasswordDto);
  }

  @Get()
  async index(@Response() res: any, @Query() query) {
    const mongooseQuery = queryTransform(query);
    const result = await this.service.findAllList(mongooseQuery);
    return formatRaList(res, result);
  }

  //cms only
  @Get('allusers')
  @Roles(Role.Admin)
  async findAllByAdmin(@Response() res: any, @Query() query) {
    const mongooseQuery = queryTransform(query);
    const result = await this.service.findAllCms(mongooseQuery);
    return formatRaList(res, result);
  }

  @Get(':id')
  async find(@Param('id') id: string, @Request() req) {
    const userId = req.user.userId;
    return await this.service.findByIdForRest(id, userId);
  }

  @Post()
  @Roles(Role.Admin)
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.service.create(createUserDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req,
  ) {
    const userId = req.user.userId;
    return await this.service.updateForRest(id, updateUserDto, userId);
  }

  //cms only
  @Roles(Role.Admin)
  @Put('/approve/:id')
  async approve(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.service.approve(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
