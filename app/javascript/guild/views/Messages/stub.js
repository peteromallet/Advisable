/* 
  Stubbed data
*/
const subject = "I’d love to connect with your company BeeBank!";
const sender = {
  id: 1,
  firstName: "First",
  name: "First Last",
  avatar:
    "http://localhost:5000/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBDUT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c4f7f162c1633aa345898722914d9026a088d122/d7b5aa25-4a64-4e45-af9a-19030dcc7223.jpg",
};
const date = " 2 hours ago";
const messages = [
  { body: "This is a message" },
  { body: "This is another message" },
  { body: "This is another message" },
  { body: "This is another message" },
  { body: "This is another message" },
  // { body: "This is another message" },
  // { body: "This is another message" },
  { body: "This is another message" },
  { body: "This is another message last" },
];
const data = {
  conversations: [
    { id: "1", subject, sender, date, messages },
    { id: "2", subject: "another subject", sender, date, messages },
    { id: "3", subject: "another subject", sender, date, messages },
    { id: "4", subject: "another subject", sender, date, messages },
    { id: "5", subject: "another subject", sender, date, messages },
    { id: "7", subject: "another subject", sender, date, messages },
    { id: "8", subject: "another subject", sender, date, messages },
    { id: "9", subject: "another subject", sender, date, messages },
    { id: "10", subject: "another subject", sender, date, messages },
    { id: "11", subject: "another subject", sender, date, messages },
    { id: "12", subject: "another subject", sender, date, messages },
  ],
};

export { data, sender };
