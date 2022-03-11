import AuthRepository from '../../repositories/auth/IAuthRepository';
import AuthHolder from '../../entities/auth/models/AuthHolder';
import Result from '../../common/Result';
import User from '../../entities/auth/structures/User';

export default class AuthUseCase {
    private authRepository: AuthRepository;
    private authHolder: AuthHolder;

    public constructor(authRepository: AuthRepository, authHolder: AuthHolder) {
        this.authRepository = authRepository;
        this.authHolder = authHolder;
    }

    /**
     * @throws {Error} if credentials are not valid or have not passed
     */
    public async loginUser(username: string): Promise<Result<User>> {
        const authResult = await this.authRepository.login(username);
        this.authHolder.onSignedIn(authResult.isSuccess);
        return authResult;
    }

    public async logoutUser(): Promise<void> {
        await this.authRepository.logout();
        this.authHolder.onSignedOut();
    }
}
