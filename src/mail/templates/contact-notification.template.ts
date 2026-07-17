import { CreateContactDto } from 'src/contact/dto/create-contact.dto';

export function contactNotificationTemplate(dto: CreateContactDto): string {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8" />
  </head>
  <body style="margin:0; padding:0; background-color:#f4f4f7; font-family: Arial, Helvetica, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f7; padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px; background-color:#ffffff; border-radius:12px; overflow:hidden; border:1px solid #e5e5ea;">

            <!-- Header -->
            <tr>
              <td style="background-color:#a020f0; padding:24px 32px;">
                <p style="margin:0; color:#ffffff; font-size:13px; letter-spacing:2px; text-transform:uppercase; opacity:0.85;">
                  CDY Agency
                </p>
                <h1 style="margin:6px 0 0; color:#ffffff; font-size:20px; font-weight:800;">
                  New Contact Message
                </h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:32px;">
                <p style="margin:0 0 24px; font-size:14px; line-height:1.6; color:#555555;">
                  You've received a new message from the contact form on your website. Details below:
                </p>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding:10px 0; border-bottom:1px solid #eeeeee; font-size:13px; color:#999999; width:110px; vertical-align:top;">
                      Name
                    </td>
                    <td style="padding:10px 0; border-bottom:1px solid #eeeeee; font-size:14px; color:#1a1a1a; font-weight:600;">
                      ${dto.name}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0; border-bottom:1px solid #eeeeee; font-size:13px; color:#999999; vertical-align:top;">
                      Email
                    </td>
                    <td style="padding:10px 0; border-bottom:1px solid #eeeeee; font-size:14px;">
                      <a href="mailto:${dto.email}" style="color:#a020f0; text-decoration:none; font-weight:600;">
                        ${dto.email}
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0; border-bottom:1px solid #eeeeee; font-size:13px; color:#999999; vertical-align:top;">
                      Phone
                    </td>
                    <td style="padding:10px 0; border-bottom:1px solid #eeeeee; font-size:14px; color:#1a1a1a;">
                      ${dto.phone || '—'}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0; border-bottom:1px solid #eeeeee; font-size:13px; color:#999999; vertical-align:top;">
                      Subject
                    </td>
                    <td style="padding:10px 0; border-bottom:1px solid #eeeeee; font-size:14px; color:#1a1a1a;">
                      ${dto.subject || '—'}
                    </td>
                  </tr>
                </table>

                <p style="margin:24px 0 8px; font-size:13px; color:#999999;">
                  Message
                </p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="background-color:#f9f7fc; border:1px solid #eeeeee; border-radius:8px; padding:16px; font-size:14px; line-height:1.6; color:#333333;">
                      ${dto.message.replace(/\n/g, '<br/>')}
                    </td>
                  </tr>
                </table>

                <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:28px;">
                  <tr>
                    <td style="border-radius:8px; background-color:#a020f0;">
                      <a href="mailto:${dto.email}" style="display:inline-block; padding:12px 24px; font-size:14px; font-weight:700; color:#ffffff; text-decoration:none;">
                        Reply to ${dto.name.split(' ')[0]}
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:20px 32px; background-color:#faf9fb; border-top:1px solid #eeeeee;">
                <p style="margin:0; font-size:12px; color:#aaaaaa; text-align:center;">
                  This notification was sent automatically from the CDY Agency website contact form.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}