import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Exclude, Expose } from 'class-transformer';

export type UserDocument = User & Document;

@Schema({ 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})
export class User {
  @Expose()
  _id: Types.ObjectId;

  @Prop({ 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  })
  email: string;

  @Prop({ 
    required: true,
    trim: true,
    minlength: [3, 'Name must be at least 3 characters long'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  })
  name: string;

  @Prop({ 
    required: true,
    minlength: [8, 'Password must be at least 8 characters long'],
    validate: {
      validator: function(password: string) {
        // Password must contain at least one letter, one number, and one special character
        const hasLetter = /[A-Za-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[@$!%*?&]/.test(password);
        return hasLetter && hasNumber && hasSpecialChar;
      },
      message: 'Password must contain at least one letter, one number, and one special character (@$!%*?&)'
    }
  })
  @Exclude()
  password: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  get id(): string {
    return this._id.toString();
  }
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ email: 1 });
UserSchema.index({ createdAt: -1 });

UserSchema.set('toJSON', { virtuals: true });
UserSchema.set('toObject', { virtuals: true });
