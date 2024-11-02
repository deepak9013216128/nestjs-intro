import { Injectable } from '@nestjs/common';
import { HashingProvider } from './hashing.provider';
import * as bcyrpt from 'bcrypt';

@Injectable()
export class BcryptProvider implements HashingProvider {
  async hashPassword(data: string | Buffer): Promise<string> {
    const salt = await bcyrpt.genSalt();

    return await bcyrpt.hash(data, salt);
  }

  async comparePassword(
    data: string | Buffer,
    encrypted: string,
  ): Promise<boolean> {
    return await bcyrpt.compare(data, encrypted);
  }
}
