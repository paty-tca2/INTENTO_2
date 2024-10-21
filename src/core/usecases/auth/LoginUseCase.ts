import { IAuthRepository } from '@/core/repositories/AuthRepository';
import { Either } from 'fp-ts/Either';

export class LoginUser {
    private authRepository: IAuthRepository;

    constructor(authRepository: IAuthRepository) {
        this.authRepository = authRepository;
    }

    async execute(userData: Record<string, any>): Promise<Either<string, any>> {
        return await this.authRepository.loginUser(userData);
    }
}
