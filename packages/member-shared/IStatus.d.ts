export interface IStatus {
    active?: boolean;
    postMail?: boolean;
    email?: boolean;
    newsletter?: 'email' | 'post' | 'none';
}
