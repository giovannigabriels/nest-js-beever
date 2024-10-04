import { Injectable } from '@nestjs/common';
import { hash, compare } from "bcrypt";

@Injectable()
export class Bcrypt {
    public async hashPassword(password: string): Promise<string> {
        return await hash(password, 10);
    }

    public async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return await compare(password, hashedPassword);
    }
}