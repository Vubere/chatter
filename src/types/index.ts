


type feed = {
  title: string;
  author: {
    firstName: string;
    lastName: string;
    username: string;
    avatar: string;
    profession: string;
  };
  createdAt: string;
  content: string;
  likes: number;
  excerpt: string;
  coverImage: string;
  comments: number;
  views: number;
  state: "Published" | "Draft";
  minRead: number;
  tags: string[];
  bookmarks: number;
}
export type feedT = feed & { _id: string };

type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string;
  bio: string;
  followers: number[];
  following: number[];
  bookmarks: string[];
  interest: string[];
  posts: string[];
  profession: string;
  likes: string[];
  comments: string[];
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