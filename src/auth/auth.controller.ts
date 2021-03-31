import { Body, Controller, HttpStatus, Post, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoggedInDto, } from './dto/loggedin.dto';
import {SigninDto} from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import {ResponseUserDto} from '../users/dto/response-user.dto'
import { ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('auth')
@Controller('auth')
export class AuthController {

  constructor(private readonly _authService: AuthService){}
  @ApiResponse({status: 201, description:'SignUp Successful', type: ResponseUserDto})
  @Post('/signUp')
  @UsePipes(ValidationPipe)
  async signup(@Res() res, @Body() signupDto: SignupDto): Promise<ResponseUserDto>{
    const user = await this._authService.signup(signupDto);
    return res.status(HttpStatus.CREATED).json({
      status:201,
      message: 'SignUp Successful!',
      data: user
    })
  }

  @ApiResponse({status:200, description: 'SignIn Successful!', type: ResponseUserDto})
  @Post('/signIn')
  @UsePipes(ValidationPipe)
  async signin(@Res() res, @Body() signinDto: SigninDto): Promise<ResponseUserDto>{
    const user = await this._authService.signin(signinDto);
    return res.status(HttpStatus.ACCEPTED).json({
      status:200,
      message: 'SignIn Successful!',
      data: user.token
    })
  }
}
