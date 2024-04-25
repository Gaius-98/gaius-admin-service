export declare class User {
    id: string;
    username: string;
    password: string;
    email: string;
    roleId: string;
    createTime: Date;
    name: string;
    avatar: string;
    salt: string;
    beforeInsert(): void;
}
