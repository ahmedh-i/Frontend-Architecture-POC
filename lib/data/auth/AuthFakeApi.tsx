import type AuthRepository from '../../domain/repositories/auth/IAuthRepository';
import Result from '../../domain/common/Result';
import { User } from '../../../pages/api/auth/user';
import fetchJson, { FetchError } from '../../infrastructure/fetch/fetchJson';

export default class AuthFakeApi implements AuthRepository {

    async loadSession(): Promise<User> {
        return fetchJson('/api/auth/user', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
    }

    /**
     * @throws {Error} if credentials have not passed
     */
    async login(username: string): Promise<Result<User>> {
        try {
            const user = await fetchJson('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username }),
            }) as User;
            return Result.OkWithValue(user);
        } catch (error) {
            if (error instanceof FetchError) {
                return Result.FailWithValue(error.data.message)
            } else {
                return Result.FailWithValue('An unexpected error happened');
            }
        }

    }

    async logout(): Promise<User> {
        return fetchJson('/api/auth/logout', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
    }
}
