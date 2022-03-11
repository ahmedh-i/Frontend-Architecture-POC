export default class Result<T = string> {
    public isSuccess: boolean;
    public error: string;
    private _value?: T;

    private constructor(isSuccess: boolean, error: string, value?: T) {
        if (isSuccess && error)
            throw Error('Invalid Operation.')
        if (!isSuccess && !error)
            throw Error('Invalid Operation.')

        this.isSuccess = isSuccess;
        this.error = error;
        if (value) {
            this._value = value;
        }
    }

    public get value(): T | null {
        if (this._value) {
            return this._value
        }
        return null;
    }

    public static Fail(message: string): Result {
        return new Result(false, message)
    }

    public static FailWithValue<T>(message: string): Result<T> {
        return new Result<T>(false, message, undefined);
    }

    public static Ok(): Result {
        return new Result(true, "");
    }

    public static OkWithValue<T>(value: T): Result<T> {
        return new Result<T>(true, "", value);
    }
}