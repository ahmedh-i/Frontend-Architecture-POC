import IAuthHeaderViewModel from './IAuthHeaderViewModel';
import BaseView from '../../views/BaseView';
import AuthUseCase from '../../../domain/interactors/auth/AuthUseCase';
import AuthHolder from '../../../domain/entities/auth/models/AuthHolder';
import AuthListener from '../../../domain/entities/auth/models/AuthListener';

export default class AuthHeaderViewModel implements IAuthHeaderViewModel, AuthListener {
    private baseView?: BaseView;
    private AuthUseCase: AuthUseCase;
    private authHolder: AuthHolder;

    public constructor(AuthUseCase: AuthUseCase, authHolder: AuthHolder) {
        this.AuthUseCase = AuthUseCase;
        this.authHolder = authHolder;

        this.authHolder.addAuthListener(this);
    }

    onClickSignOut(e: React.MouseEvent): void {
        e.preventDefault();
        this.AuthUseCase.logoutUser();
    }
    
    public onAuthChanged = (): void => {
        if (!this.authHolder.isUserAuthorized()) {
            window.location.href = "/auth/login";
        }
        this.notifyViewAboutChanges();
    };

    public attachView = (baseView: BaseView): void => {
        this.baseView = baseView;
    };

    public detachView = (): void => {
        this.baseView = undefined;
    };

    

    private notifyViewAboutChanges = (): void => {
        if (this.baseView) {
            this.baseView.onViewModelChanged();
        }
    };
}
