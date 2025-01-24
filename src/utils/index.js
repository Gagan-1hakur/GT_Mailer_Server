// const formData = require("form-data");
// const Mailgun = require("mailgun.js");
// const mailgun = new Mailgun(formData);
// const mg = mailgun.client({
//   username: "api",
//   key:
//     process.env.MAILGUN_API_KEY ||
//     "key-320ca93a78df04f8735b1058c2b5583b-9c3f0c68-543f8512",
// });

// mg.messages
//   .create("sandbox-123.mailgun.org", {
//     from: "Excited User <mailgun@info.pb77mailer.com>",
//     to: ["gaganthakur750@gmail.com"],
//     subject: "Hello",
//     text: "Testing some Mailgun awesomeness!",
//     html: "<h1>Testing some Mailgun awesomeness!</h1>",
//   })
//   .then((msg) => console.log(msg)) // logs response data
//   .catch((err) => console.log(err)); // logs any error
