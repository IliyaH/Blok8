using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Web;

namespace WebApp
{
    public class EmailHelper
    {
        public static void SendEmail(string to, string subj, string body)
        {
            MailMessage mail = new MailMessage();
            SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");

            mail.From = new MailAddress("webprojekat123@gmail.com");
            mail.To.Add(to);
            mail.Subject = subj;
            mail.Body = body;

            SmtpServer.UseDefaultCredentials = false;
            SmtpServer.EnableSsl = true;
            SmtpServer.Port = 587;
            SmtpServer.Credentials = new System.Net.NetworkCredential("webprojekat123@gmail.com", "sifra123");

            SmtpServer.Send(mail);
        }
    }
}