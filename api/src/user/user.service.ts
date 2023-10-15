import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { RaList, MongooseQuery } from '../flatworks/types/types';
import { validatePassword } from '../flatworks/utils/common';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly model: Model<UserDocument>,
  ) {}

  async findAll(): Promise<any[]> {
    return this.model.find().exec();
  }

  //for rest endpoint remove password & refresh token before return
  async findAllList(query: MongooseQuery): Promise<RaList> {
    const count = await this.model.find(query.filter).count().exec();
    const data = await this.model
      .find(query.filter)
      .sort(query.sort)
      .skip(query.skip)
      .limit(query.limit)
      .select({ password: 0, refreshToken: 0 })
      .exec();

    //remove user'contact if it is not set to show
    const _data = (data as any).map((user) => {
      if (!user._doc.isShowContact) {
        delete user._doc.email;
        delete user._doc.contact;
      }
      return user;
    });
    return { count: count, data: _data };
  }

  async findAllRaw(filter = {}, select = {}): Promise<User[]> {
    return this.model.find(filter).select(select).exec();
  }

  async findById(id: string): Promise<any> {
    return await this.model.findById(id).exec();
  }

  //for rest endpoint remove password & refresh token before return
  //for user query return contact, query from other depend on user setting
  async findByIdForRest(id: string, userId = null): Promise<any> {
    const select = { password: 0, refreshToken: 0 };

    const _user = (await this.model.findById(id).select(select).exec()) as any;

    if (id !== userId) {
      _user._doc.isShowContact
        ? null
        : (delete _user._doc.email, delete _user._doc.contact);
    }
    return _user;
  }

  async findOne(username: string): Promise<User> {
    const [user] = await this.model.find({ username: username }).exec();
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const username = createUserDto.username.toLowerCase();
    //roles is always ['user'] as created time
    const roles = ['user'];
    const saltOrRounds = 10;
    const password = await bcrypt.hash(createUserDto.password, saltOrRounds);

    return await new this.model({
      ...createUserDto,
      username,
      password,
      roles,
      createdAt: new Date(),
    }).save();
  }

  //count for global app search
  async count(filter): Promise<any> {
    return await this.model.find(filter).count().exec();
  }
  async updatePassword(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    //validate password
    if (!validatePassword(updateUserDto.password)) {
      throw new BadRequestException({
        cause: new Error(),
        description: 'Submit error',
        message:
          'password is must min 8 letters, with at least a symbol, upper and lower case letters and a number',
      });
    }

    let _updateUserDto = updateUserDto;
    //don't update roles
    delete _updateUserDto['roles'];
    if (updateUserDto.password) {
      const saltOrRounds = 10;
      const password = await bcrypt.hash(updateUserDto.password, saltOrRounds);
      _updateUserDto = { ...updateUserDto, password };
    }
    return await this.model.findByIdAndUpdate(id, _updateUserDto).exec();
  }

  /*
  only user is allow to update itself
  don't update roles & password
*/
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    delete updateUserDto['roles'];
    delete updateUserDto['password'];

    return await this.model.findByIdAndUpdate(id, updateUserDto).exec();
  }

  async updateForRest(
    id: string,
    updateUserDto: UpdateUserDto,
    userId = null,
  ): Promise<User> {
    const user = await this.model.findById(id);
    if (user._id !== userId) {
      return;
    }

    delete updateUserDto['roles'];
    delete updateUserDto['password'];

    return await this.model.findByIdAndUpdate(id, updateUserDto).exec();
  }
  /*
cms services
*/
  async delete(id: string): Promise<User> {
    return await this.model.findByIdAndDelete(id).exec();
  }

  async approve(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const { isApproved } = updateUserDto;
    return await this.model.findByIdAndUpdate(id, { isApproved }).exec();
  }

  async findAllCms(query: MongooseQuery): Promise<RaList> {
    const count = await this.model.find(query.filter).count().exec();
    const data = await this.model
      .find(query.filter)
      .sort(query.sort)
      .skip(query.skip)
      .limit(query.limit)
      .select({ password: 0, refreshToken: 0 })
      .exec();

    return { count: count, data: data };
  }
}
