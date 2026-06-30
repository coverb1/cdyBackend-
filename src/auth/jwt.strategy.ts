import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { authaconstants } from "./auth.constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authaconstants.secrete
    });
  }

async validate(palyload:any){
    return{userId:palyload.sub,email:palyload.email}
}

}

// Main job of JwtStrategy

// reads token
// verifies token
// checks secret
// allows or denies access


// User sends JWT token
//    ↓
// JwtGuard checks token
//    ↓
// JwtStrategy validates token
//    ↓
// validate() returns user data
//    ↓
// NestJS attaches it to request.user
//    ↓
// Controller reads request.user 


//  mainly this chekcks what inside the token