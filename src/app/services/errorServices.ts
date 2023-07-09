import { mongodbErrorCodes } from "./constants";

class errorServices{
  static getErrorMessage(errorCode:number){
    return mongodbErrorCodes[errorCode];
  }
}

export default errorServices;