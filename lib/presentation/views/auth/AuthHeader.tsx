import React from 'react';
import AuthHeaderViewModel from '../../view-model/auth/AuthHeaderViewModel';
import BaseView from '../BaseView';

export interface AuthHeaderComponentProps {
    authViewModel: AuthHeaderViewModel;
}

export default class AuthHeaderComponent extends React.Component<AuthHeaderComponentProps, {}> implements BaseView {

    private authViewModel: AuthHeaderViewModel;

    public constructor(props: AuthHeaderComponentProps) {
        super(props);

        const { authViewModel } = this.props;
        this.authViewModel = authViewModel;
    }

    public componentDidMount(): void {
        this.authViewModel.attachView(this);
    }

    public componentWillUnmount(): void {
        this.authViewModel.detachView();
    }

    public onViewModelChanged(): void { }

    public render(): JSX.Element {
        return (<>
            <li>
                <a style={{cursor: 'pointer'}} onClick={(e: React.MouseEvent) => this.authViewModel.onClickSignOut(e)}>
                    Logout
                </a>
            </li>
        </>);
    }

}


