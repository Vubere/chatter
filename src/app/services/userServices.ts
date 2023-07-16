import { requiredUserDetails } from '@/types';
import * as config from './constants';


const baseUrl = config.baseUrl;


class userServices{
    static async login(email:string, password:string){
        const url = baseUrl + '/users/login';
        const body = {
            email: email,
            password: password
        };
        const request = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        };
        const response = await fetch(url, request);
        const result = await response.json();
        return result;
    }
    static async register(body:requiredUserDetails){
        const url = baseUrl + '/users/register';
        console.log(body);
        const request = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        };
        const response = await fetch(url, request);
        const result = await response.json();
       
        return result;
    }
    static async getUser(id:string){
        const url = baseUrl + '/users?id=' + id;
        const request = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const response = await fetch(url, request);
        const result = await response.json();
        return result;
    }
}


export default userServices;