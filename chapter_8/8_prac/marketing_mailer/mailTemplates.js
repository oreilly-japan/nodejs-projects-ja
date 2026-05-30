const htmlTemplate = (content) => {
  return `<html>
<body>
${content}
</body>
</html>`;
};

const unsubscribeLink = (email) => {
  return `<p style="font-size:12px;color:#888;margin-top:20px;">
<a href="http://localhost:3000/unsubscribe/${email}">Unsubscribe</a>
</p>`;
};

export const welcomeMail = (email) => {
  const content = `<h1>Welcome to Inn Box!</h1>
${unsubscribeLink(email)}`;
  return htmlTemplate(content);
};

export const confirmationMail = (url, email) => {
  const content = `<a href="${url}"><h1>Confirm your email</h1></a>
${unsubscribeLink(email)}`;
  return htmlTemplate(content);
};

export const campaignMail = (campaignText, campaignKey, email) => {
  const content = `
<h1>${campaignText}</h1>
<a href="http://localhost:3000/click/${campaignKey}/user/${email}"
style="display:inline-block;padding:12px 24px;background-color:#007bff;color:#fff;text-decoration:none;border-radius:4px;">
Click Here</a>
</a>
<img src="http://localhost:3000/campaign/${campaignKey}/user/${email}/image.png"
style="display:none">
${unsubscribeLink(email)}
`;
  return htmlTemplate(content);
};
