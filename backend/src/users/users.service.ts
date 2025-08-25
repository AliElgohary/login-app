// users/users.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(email: string, name: string, password: string): Promise<UserDocument> {
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) throw new BadRequestException('Email already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({ email, name, password: hashedPassword });
    return user.save();
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email });
  }
}