import IAuthViewModel from './IAuthViewModel';
import BaseView from '../../views/BaseView';
import AuthUseCase from '../../../domain/interactors/auth/AuthUseCase';
import AuthHolder from '../../../domain/entities/auth/models/AuthHolder';
import FormValidator from '../../utils/FormValidator';
import AuthListener from '../../../domain/entities/auth/models/AuthListener';

export default class AuthViewModel implements IAuthViewModel, AuthListener {
    public usernameQuery: string;
    public errorMessage: string;

    private baseView?: BaseView;
    private AuthUseCase: AuthUseCase;
    private authHolder: AuthHolder;

    public constructor(AuthUseCase: AuthUseCase, authHolder: AuthHolder) {
        this.usernameQuery = '';
        this.errorMessage = '';

        this.AuthUseCase = AuthUseCase;
        this.authHolder = authHolder;

        this.authHolder.addAuthListener(this);
    }
    
    public onAuthChanged = (): void => {
        if (this.authHolder.isUserAuthorized()) {
            window.location.href = "/";
        }
        this.notifyViewAboutChanges();
    };

    public attachView = (baseView: BaseView): void => {
        this.baseView = baseView;
    };

    public detachView = (): void => {
        this.baseView = undefined;
    };

    public onUsernameQueryChanged = (usernameQuery: string): void => {
        this.usernameQuery = usernameQuery;
        this.notifyViewAboutChanges();
    };

    public onClickSignIn = async (event: React.FormEvent): Promise<void> => {
        event.preventDefault()
        if (!this.validateLoginForm()) {
            this.notifyViewAboutChanges();
            return;
        }

        try {
            const result = await this.AuthUseCase.loginUser(this.usernameQuery);
            this.errorMessage = result.error;
        } catch (e: any) {
            console.log()
            this.errorMessage = e.message;
        }
        this.notifyViewAboutChanges();
    };

    private validateLoginForm = (): boolean => {
        if (!this.usernameQuery) {
            this.errorMessage = 'Username cannot be empty';
            return false;
        }
        return true;
    }

    private notifyViewAboutChanges = (): void => {
        if (this.baseView) {
            this.baseView.onViewModelChanged();
        }
    };
}
