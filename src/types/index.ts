


type feed = {
  id: string;
  title: string;
  author: {
    firstName: string;
    lastName: string;
    username: string;
    avatar: string;
    profession: string;
  };
  date: string;
  content: any[];
  likes: number;
  synopsis: string;
  displayImage: string;
  comments: number;
  views: number;
  minRead: number;
  tags: string[];
}


type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string;
  bio: string;
  followers: number[];
  following: number[];
  bookmarks: number[];
  posts: number[];
  profession: string;
  likes: number[];
  comments: number[];
  profileViews: number;
  createdAt: Date;
  updatedAt: Date;
  notifications: number[];
};

type requiredUserDetails = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  profession: string;
};





export type { feed, User, requiredUserDetails };