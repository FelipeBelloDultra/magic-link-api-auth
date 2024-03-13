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

export interface SendWelcomeMailData {
  name: string;
  email: string;
}

export interface MailProvider {
  sendMail: (data: SendMailData) => Promise<void>;
  sendAuthenticationLinkMail: (
    data: SendAuthenticationLinkMailData
  ) => Promise<void>;
  sendWelcomeMail: (data: SendWelcomeMailData) => Promise<void>;
}
