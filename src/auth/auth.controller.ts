import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { currentUser } from './me/current-user.decorator';

@Controller('auth')
export class AuthController {
 constructor (
  private authservice:AuthService
){}

@Post('login')
login(@Body() loginDto:CreateAuthDto):Promise<{accessToken:string}>{
  return this.authservice.login(
    loginDto.email,
    loginDto.password
  )
}
 @Post('ForgotPassword')
  forgotPassword(@Body("email") email:string){
    return this.authservice.forgotPassword(email)
  }

  @Post('reset-password')
  resertPassword(@Body('token') token:string,
   @Body('newPassword') newPassword){
    return this.authservice.resertPassword(token,newPassword)
   }

   @UseGuards(AuthGuard('jwt'))
   @Get('me')
   getMe(@currentUser() user:{id:number,name:string,role:string}){
    return user
   }
   
}
