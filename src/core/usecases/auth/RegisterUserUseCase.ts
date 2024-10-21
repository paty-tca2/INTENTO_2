// src/usecases/registerUser.ts

import {IAuthRepository} from "@/core/repositories/AuthRepository";

export class RegisterUserUseCase {
    private authRepository: IAuthRepository;

    constructor(authRepository: IAuthRepository) {
        this.authRepository = authRepository;
    }

    async execute(userData: Record<string, any>) {
        return this.authRepository.registerUser(userData);
    }
}
