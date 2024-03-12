export interface SendMailData {
  to: string;
  html: string;
  content: string;
}

export interface SendAuthenticationLinkMailData {
  name: string;
  email: string;
  token: string;
}

export interface MailProvider {
  sendMail: (data: SendMailData) => Promise<void>;
  sendAuthenticationLinkMail: (
    data: SendAuthenticationLinkMailData
  ) => Promise<void>;
}
