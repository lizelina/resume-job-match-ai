/*
 * Run using the mongo shell. For remote databases, ensure that the
 * connection string is supplied in the command line. For example:
 * localhost:
 *   mongo OfferAI scripts/init.mongo.js
 * Atlas:
 *   mongo mongodb+srv://user:pwd@xxx.mongodb.net/OfferAI scripts/init.mongo.js
 * MLab:
 *   mongo mongodb://user:pwd@xxx.mlab.com:33533/OfferAI scripts/init.mongo.js
 */

db.user.remove({});
db.resume_pdf.remove({});

const user = [
  {
    phone: "81234567",
    password: "123456"
  }
];
const resume = [
  {
    phone: "81234567",
    resume_pdf: "sample.pdf"
  }
];


db.user.insertMany(user);
db.resume_pdf.insertMany(resume);
