export class MemberRowData {
    _name:string | undefined;
    _address:string | undefined;
    _phone:string | undefined;
    _email:string | undefined;

    set name (value:string | undefined){ this._name = value}
    set address (value:string | undefined){ this._address = value}
    set phone (value:string | undefined){ this._phone = value}
    set email (value:string | undefined){ this._email = value}

    get name(): string | undefined { return this._name }
    get address(): string | undefined { return this._address }
    get phone(): string | undefined { return this._phone }
    get email(): string | undefined { return this._email }
}