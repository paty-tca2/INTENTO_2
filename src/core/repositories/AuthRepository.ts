// src/infrastructure/AuthRepositoryImpl.ts
import { ResponseHandler } from '@/core/ResponseHandler';
import { Either, left } from 'fp-ts/Either';
import axios from "axios";
import {authService} from "@/core/infrastructure/AuthService";

export interface IAuthRepository {
    registerUser(userData: Record<string, any>): Promise<Either<string, any>>;
    loginUser(userData: Record<string, any>): Promise<Either<string, any>>;
    getProfile(token: string): Promise<Either<string, any>>;
}

export class AuthRepositoryImpl implements IAuthRepository {

    private async handleAuthRequest(request: () => Promise<any>): Promise<Either<string, any>> {
        try {
            const response = await request();
            return ResponseHandler.handle(response, (data) => data);
        } catch (error) {
            let errorMessage = 'Error de conexión';

            if (axios.isAxiosError(error)) {
                if (error.response) {
                    const status = error.response.status;
                    const responseData = error.response.data;

                    // Extracción mejorada del mensaje de error
                    if (responseData && responseData.error && responseData.error.message) {
                        errorMessage = `Error ${status}: ${responseData.error.message}`;
                    } else if (responseData.message) {
                        errorMessage = `Error ${status}: ${responseData.message}`;
                    } else {
                        errorMessage = `Error ${status}: Error en el servidor`;
                    }
                } else if (error.request) {
                    errorMessage = 'Error de red: No hay respuesta del servidor';
                } else {
                    errorMessage = error.message;
                }
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            return left(errorMessage);
        }
    }

    registerUser(userData: Record<string, any>): Promise<Either<string, any>> {
        return this.handleAuthRequest(() => authService.registerUser(userData));
    }

    loginUser(userData: Record<string, any>): Promise<Either<string, any>> {
        return this.handleAuthRequest(() => authService.loginUser(userData));
    }

    getProfile(token: string): Promise<Either<string, any>> {
        return this.handleAuthRequest(() => authService.getProfile(token));  // Implementa la solicitud para obtener el perfil
    }
}
