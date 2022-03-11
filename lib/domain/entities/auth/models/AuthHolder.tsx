import User from '../structures/User';
import AuthListener from './AuthListener';

export default class AuthHolder {
    private isAuthorized: boolean;
    private username: string;
    private avatarUrl: string;
    private authListeners: AuthListener[];

    public constructor() {
        this.username = '';
        this.isAuthorized = false;
        this.avatarUrl = '';
        this.authListeners = [];
    }

    public onSignedIn(isSuccess: boolean): void {
        this.isAuthorized = isSuccess;
        this.notifyListeners();
    }

    public onSignedOut(): void {
        this.isAuthorized = false;
        this.notifyListeners();
    }

    public onSessionLoad(user: User): AuthHolder {
        this.username = user.login;
        this.avatarUrl = user.avatarUrl;
        this.isAuthorized = user.isLoggedIn;
        return this;
    }

    public isUserAuthorized(): boolean {
        return this.isAuthorized;
    }

    public addAuthListener(authListener: AuthListener): void {
        this.authListeners.push(authListener);
    }

    public removeAuthListener(authListener: AuthListener): void {
        this.authListeners.splice(this.authListeners.indexOf(authListener), 1);
    }

    private notifyListeners(): void {
        this.authListeners.forEach((listener) => listener.onAuthChanged());
    }
}