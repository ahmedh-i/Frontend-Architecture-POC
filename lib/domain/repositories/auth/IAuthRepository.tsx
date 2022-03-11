import { User } from '../../../../pages/api/auth/user';
import Result from '../../common/Result';

export default interface AuthRepository {
    /**
     * @throws {Error} if credentials have not passed
     */
    login(username: string): Promise<Result<User>>;

    logout(): Promise<User>

    loadSession(): Promise<User>;
}
