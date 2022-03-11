import React from 'react';
import BaseViewModel from '../BaseViewModel';

export default interface AuthViewModel extends BaseViewModel {
    onClickSignOut(e: React.MouseEvent): void;
}
