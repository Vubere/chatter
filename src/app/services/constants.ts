

const site = "https://vu-chatter.vercel.app/api";
const baseUrl = process.env.NODE_ENV === "development" ? "http://localhost:3000/api" : site;

const mongodbErrorCodes: {
  [key: number]: string;
} = {
  11000: "This is already in use",
  11001: "This is already in use",
  11600: "Interrupted Operation",
  11602: "Interrupted Due To ReplStateChange",
  12000: "Interrupted Due To Shutting Down",
  12582: "Namespace Not Found",
  16389: "Cannot CreateIndex on Legacy Namespace",
  16550: "Index Build Aborted",
  17406: "Conflict in write operation",
  20268: "Namespace already Exists",
};



export {baseUrl, mongodbErrorCodes}