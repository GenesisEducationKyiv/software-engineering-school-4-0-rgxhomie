import { IsEmail, IsNotEmpty } from 'class-validator';

export class SubscriptionDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}