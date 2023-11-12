export interface IStatus {
    isActive?: boolean;
    validPostMail?: 'valid' | 'returned mail' | 'none';
    validEmail?: 'verified' | 'bounced' | 'unchecked' | 'none';
    newsletterType?: 'email' | 'post' | 'none';
    isNewMember?: boolean;
}
