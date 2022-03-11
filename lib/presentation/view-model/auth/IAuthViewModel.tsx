import BaseViewModel from '../BaseViewModel';

export default interface AuthViewModel extends BaseViewModel {
    usernameQuery: string;
    errorMessage: string;

    onUsernameQueryChanged(usernameQuery: string): void;
    onClickSignIn(event: React.FormEvent): void;
}
