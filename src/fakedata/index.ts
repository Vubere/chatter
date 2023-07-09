import { feed, User } from "@/types";



const fakeFeed:feed[] = [
  {
    id: "1",
    title: "The 5 best ways to improve your writing",
    author: {
      firstName: "John",
      lastName: "Doe",
      username: "johndoe",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      profession: "Writer",
    },
    date: "2021-01-01",
    content: [
      {
        type: "p",
        content:
          "Lorem ipsum dolor sit am"
      },
      {
        type: "p",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
      },
      {
        type: "img",
        content: "https://picsum.photos/800/400",
      },
      {
        type: "paragraph",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
      },
      {
        type: 'ul',
        content: [
          {
            type: 'li',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
          },
          {
            type: 'li',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
          },
        ]
      },
    ],
    likes: 100,
    synopsis: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    displayImage: "https://picsum.photos/800/400",
    comments: 100,
    views: 100,
    minRead: 5,
    tags: ["writing", "blogging", "content"],

  },
  {
    id: "2",
    title: "The 5 best ways to improve your writing",
     author: {
      firstName: "John",
      lastName: "Doe",
      username: "johndoe",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      profession: "Writer",
    },
    date: "2021-01-01",
    content: [
      {
        type: "p",
        content:
          "Lorem ipsum dolor sit am"
      },
      {
        type: "p",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
      },
      {
        type: "img",
        content: "https://picsum.photos/800/400",
      },
      {
        type: "paragraph",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
      },
      {
        type: 'ul',
        content: [
          {
            type: 'li',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
          },
          {
            type: 'li',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
          },
        ]
      },
    ],
    likes: 100,
    synopsis: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    displayImage: "https://picsum.photos/800/400",
    comments: 100,
    views: 100,
    minRead: 5,
    tags: ["writing", "blogging", "content"],
  },
  {
    id: "1",
    title: "The 5 best ways to improve your writing",
    author: {
      firstName: "John",
      lastName: "Doe",
      username: "johndoe",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      profession: "Writer",
    },
    date: "2021-01-01",
    content: [
      {
        type: "p",
        content:
          "Lorem ipsum dolor sit am"
      },
      {
        type: "p",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
      },
      {
        type: "img",
        content: "https://picsum.photos/800/400",
      },
      {
        type: "paragraph",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
      },
      {
        type: 'ul',
        content: [
          {
            type: 'li',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
          },
          {
            type: 'li',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
          },
        ]
      },
    ],
    likes: 100,
    synopsis: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    displayImage: "https://picsum.photos/800/400",
    comments: 100,
    views: 100,
    minRead: 5,
    tags: ["writing", "blogging", "content"],
  },
  {
    id: "2",
    title: "The 5 best ways to improve your writing",
     author: {
      firstName: "John",
      lastName: "Doe",
      username: "johndoe",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      profession: "Writer",
    },
    date: "2021-01-01",
    content: [
      {
        type: "p",
        content:
          "Lorem ipsum dolor sit am"
      },
      {
        type: "p",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
      },
      {
        type: "img",
        content: "https://picsum.photos/800/400",
      },
      {
        type: "paragraph",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
      },
      {
        type: 'ul',
        content: [
          {
            type: 'li',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
          },
          {
            type: 'li',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
          },
        ]
      },
    ],
    likes: 100,
    synopsis: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    displayImage: "https://picsum.photos/800/400",
    comments: 100,
    views: 100,
    minRead: 5,
    tags: ["writing", "blogging", "content"],
  },
  {
    id: "1",
    title: "The 5 best ways to improve your writing",
    author: {
      firstName: "John",
      lastName: "Doe",
      username: "johndoe",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      profession: "Writer",
    },
    date: "2021-01-01",
    content: [
      {
        type: "p",
        content:
          "Lorem ipsum dolor sit am"
      },
      {
        type: "p",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
      },
      {
        type: "img",
        content: "https://picsum.photos/800/400",
      },
      {
        type: "paragraph",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
      },
      {
        type: 'ul',
        content: [
          {
            type: 'li',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
          },
          {
            type: 'li',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
          },
        ]
      },
    ],
    likes: 100,
    synopsis: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    displayImage: "https://picsum.photos/800/400",
    comments: 100,
    views: 100,
    minRead: 5,
    tags: ["writing", "blogging", "content"],
  },
  {
    id: "2",
    title: "The 5 best ways to improve your writing",
     author: {
      firstName: "John",
      lastName: "Doe",
      username: "johndoe",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      profession: "Writer",
    },
    date: "2021-01-01",
    content: [
      {
        type: "p",
        content:
          "Lorem ipsum dolor sit am"
      },
      {
        type: "p",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
      },
      {
        type: "img",
        content: "https://picsum.photos/800/400",
      },
      {
        type: "paragraph",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
      },
      {
        type: 'ul',
        content: [
          {
            type: 'li',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
          },
          {
            type: 'li',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
          },
        ]
      },
    ],
    likes: 100,
    synopsis: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    displayImage: "https://picsum.photos/800/400",
    comments: 100,
    views: 100,
    minRead: 5,
    tags: ["writing", "blogging", "content"],

  },
] 

const fakeUser:User = {
  firstName: "John",
  lastName: "Doe",
  username: "johndoe",
  profileViews: 100,
  avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  profession: "Writer",
  bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  followers: [2,3],
  following: [2,3],
  posts: [1,2,3,4,5,6,7,8,9,10],
  bookmarks: [1,2,3,4,5,6,7,8,9,10],
  likes: [1,2,3,4,5,6,7,8,9,10],
  comments: [1,2,3,4,5,6,7,8,9,10],
  notifications: [1,2,3,4,5,6,7,8,9,10],
  createdAt: new Date(),
  updatedAt: new Date(),
  email: "john@gmail.com",
  password: "johndoe",
}






export {fakeFeed,fakeUser}