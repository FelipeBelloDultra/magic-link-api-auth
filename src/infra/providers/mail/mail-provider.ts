export interface SendMailData {
  toEmail: string;
  content: string;
}

export interface MailProvider {
  sendMail: (data: SendMailData) => Promise<void>;
}
