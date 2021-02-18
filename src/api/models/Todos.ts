type User = {
  id: string;
  login: string;
  password: string;
};

export let usersList: Array<User> = [
  { id: "1", login: "123@123.123", password: "123123" },
  { id: "2", login: "qw@qw.qw", password: "123123" },
  { id: "3", login: "pavel@gmail.com", password: "123123" },
];

export const addUser = (user: User) => {
  usersList = [].concat(...usersList, user);
};
