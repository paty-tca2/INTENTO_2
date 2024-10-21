// src/core/usecases/auth/GetProfileUseCase.ts
import { IAuthRepository } from '@/core/repositories/AuthRepository';
import { Either } from 'fp-ts/Either';

export class GetProfileUseCase {
    private authRepository: IAuthRepository;

    constructor(authRepository: IAuthRepository) {
        this.authRepository = authRepository;
    }

    async execute(token: string): Promise<Either<string, any>> {
        return await this.authRepository.getProfile(token);
    }
}
