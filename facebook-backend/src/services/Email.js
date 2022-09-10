import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class Email {
  static formatEmails(emails) {
    return emails?.map((email) => ({ email }));
  }

  sendConfirmationEmail(email, confirmationCode, firstName) {
    return this.sendEmail(email, {
      template_id: 'd-35e3cbf1263a48b783f2c5deac2aac25',
      personalizations: [
        {
          to: email,
          dynamic_template_data: {
            confirmationCode,
            firstName,
            link: `${process.env.APP_URL}/signin?confirmCode=${confirmationCode}`,
          },
        },
      ],
    });
  }

  sendForgotPasswordEmail(email, changePasswordId) {
    return this.sendEmail(email, {
      template_id: 'd-b5f671c94c2245879f02c749d487bc95',
      personalizations: [
        {
          to: email,
          dynamic_template_data: {
            changePasswordId,
          },
        },
      ],
    });
  }

  sendSetUserPasswordEmail(email, firstName, token) {
    return this.sendEmail(email, {
      template_id: 'd-7a66b25d8c8d4d3bb60d63478c35f841',
      personalizations: [
        {
          to: email,
          dynamic_template_data: {
            firstName,
            link: `${process.env.APP_URL}/set-password?token=${token}`,
          },
        },
      ],
    });
  }

  sendFilesEmail(email, attachments, senderEmail) {
    return this.sendEmail(email, {
      template_id: 'd-d14db1954e2c4be68c3e68c5ad8c7d0b',
      to: email,
      attachments,
      personalizations: [
        {
          to: email,
          dynamic_template_data: {
            from: senderEmail,
          },
        },
      ],
    });
  }

  sendMessageEmail(message, sender) {
    return this.sendEmail(process.env.SEND_FILES_FROM_QUOTES_EMAIL_ADDRESS, {
      template_id: 'd-1b72feb048704c03beca0e16be078cc8',
      personalizations: [
        {
          to: process.env.SEND_FILES_FROM_QUOTES_EMAIL_ADDRESS,
          dynamic_template_data: {
            sender,
            message,
          },
        },
      ],
    });
  }

  // eslint-disable-next-line
  async sendEmail(to, data = {}, from = `matt.froehlich@flashco.com`) {
    try {
      const message = {
        to,
        from,
        ...data,
      };
      const emailData = await sgMail.send(message);
      return emailData;
    } catch (error) {
      if (error.response) {
        console.error(error.response.body);
      }
    }
  }
}
const instance = new Email();

export { instance as Email };
