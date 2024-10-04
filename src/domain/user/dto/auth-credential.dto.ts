
import { IsEmail, IsNotEmpty, IsString, Matches} from 'class-validator';


export class AuthCredentialDto {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/, { 
        message: 'Password must contain at least one upper case letter, one lower case letter, one number, and one special character',
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}