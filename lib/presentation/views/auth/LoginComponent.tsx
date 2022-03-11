import React from 'react';
import BaseView from '../BaseView';
import AuthViewModel from '../../view-model/auth/AuthViewModel';
import Layout from '../../components/Layout';

export interface LoginComponentProps {
    authViewModel: AuthViewModel;
}

export interface LoginComponentState {
    usernameQuery: string;
    errorMessage: string;
}

export default class LoginComponent extends React.Component<LoginComponentProps, LoginComponentState>
    implements BaseView {
    private authViewModel: AuthViewModel;

    public constructor(props: LoginComponentProps) {
        super(props);

        const { authViewModel } = this.props;
        this.authViewModel = authViewModel;

        this.state = {
            usernameQuery: authViewModel.usernameQuery,
            errorMessage: authViewModel.errorMessage,
        };
    }

    public componentDidMount(): void {
        this.authViewModel.attachView(this);
    }

    public componentWillUnmount(): void {
        this.authViewModel.detachView();
    }

    public onViewModelChanged(): void {
        this.setState({
            usernameQuery: this.authViewModel.usernameQuery,
            errorMessage: this.authViewModel.errorMessage,
        });
    }

    public render(): JSX.Element {
        const {
            usernameQuery,
            errorMessage
        } = this.state;

        return (
            <Layout>
                <div className="login">
                    <form onSubmit={this.authViewModel.onClickSignIn}>
                        <label>
                            <span>Type your GitHub username</span>
                            <input type="text" value={usernameQuery} onChange={(e) => this.authViewModel.onUsernameQueryChanged(e.target.value)} />
                        </label>
                        <button type="submit">Login</button>

                        {errorMessage && <p className="error">{errorMessage}</p>}
                        
                    </form>
                </div>
            </Layout>
        );
    }
}
