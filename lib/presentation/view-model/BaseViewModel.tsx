import BaseView from '../views/BaseView';

export default interface BaseViewModel {
    attachView(baseView: BaseView): void;
    detachView(): void;
}
