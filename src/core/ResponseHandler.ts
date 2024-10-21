// src/infrastructure/ResponseHandler.ts
import { AxiosResponse } from 'axios';
import { left, right, Either } from 'fp-ts/Either';

export class ResponseHandler {
    static handle<T>(response: AxiosResponse, fromJson: (json: any) => T): Either<string, T> {
        if (response.status === 200 || response.status === 201) {
            return right(fromJson(response.data));
        } else {
            const errorResponse = response.data || {};
            const errorMessage = this.parseErrorMessage(errorResponse);
            return left(errorMessage);
        }
    }

    static handleList<T>(response: AxiosResponse, parser: (json: any) => T): Either<string, T[]> {
        if (response.status === 200) {
            const dataList = response.data as any[];
            const parsedList = dataList.map(data => parser(data));
            return right(parsedList);
        } else {
            const errorResponse = response.data || {};
            const errorMessage = this.parseErrorMessage(errorResponse);
            return left(errorMessage);
        }
    }

    private static parseErrorMessage(errorResponse: any): string {
        if (errorResponse.error && errorResponse.error.details && Array.isArray(errorResponse.error.details.errors)) {
            const validationErrors = errorResponse.error.details.errors.map((error: any) => {
                const path = error.path.join(' -> ');
                return `${path}: ${error.message}`;
            }).join('\n');
            return `Errores de validación:\n${validationErrors}`;
        }

        if (errorResponse.error && errorResponse.error.message) {
            return errorResponse.error.message;
        }

        return 'Unknown error occurred';
    }
}
