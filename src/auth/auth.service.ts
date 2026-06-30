import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { PrismaService } from 'src/prisma.service';
import { randomBytes } from 'node:crypto';
import { MailerService } from '@nestjs-modules/mailer';



@Injectable()
export class AuthService {
  constructor(
    private jwtservice:JwtService,
    private prisma:PrismaService,
    private mailerservice:MailerService
  ){}
//login
async login(email:string,password:string){
  //find user
  const user=await this.prisma.user.findUnique({
    where:{email}
  })

  if (!user) {
    throw  new UnauthorizedException('user not found')
  }

  const hashedPassword=await bcrypt.compare(password,user.password);
  if (!hashedPassword) {
    throw new UnauthorizedException('wrong password')
  }

  //create token
  const Token=this.jwtservice.sign({
    userId:user.id,
    email:user.email,
    role:user.role
  })
  return{
    accessToken:Token
  }
}

// forgotPassowrd
// creating token and sending email
async forgotPassword(email:string){
  const user=await this.prisma.user.findUnique({
    where:{email}
  });
  if (!user) {
    throw new UnauthorizedException('this user does not exit')
  }

  const token=randomBytes(32).toString('hex')
await this.prisma.user.update({
  where:{email},
  data:{
    resetToken:token,
    resetTokenExpiry:new Date(Date.now()+1000*60*10)// this means ten minutes
  }
})
const resetLink=`http://localhost:3001/ResertPassword?token=${token}`;

await this.mailerservice.sendMail({
  to:email,
  subject:'password Resert',
  text:`click this link  to resert Password: ${resetLink}`
})

}
async resertPassword(token:string,newPassword:string){
  const user=await this.prisma.user.findFirst({
    where:{
      resetToken:token,
      resetTokenExpiry:{gt:new Date()}
    }
    
  })
  
console.log(`$user is:${user}`)

  if (!user) {
    throw new BadRequestException('Token is invalid or expired')
  }
  const hashedPassword=await bcrypt.hash(newPassword,20)

  await this.prisma.user.update({
    where:{id:user.id},
    data:{
      password:hashedPassword,
      resetToken:null,
      resetTokenExpiry:null
    }
  })
  return{message:'new password created'}
}
 }


 
 


 

  

