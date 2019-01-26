import { Body } from "native-base";
import { decode as atob, encode as btoa } from 'base-64'
import React, {
    AsyncStorage,
    View,
    Text
  } from 'react-native';
export default class Utility {

    static async getToken() {
        try {
            let token = await AsyncStorage.getItem("ACCESS_TOKEN");
            return token;
        } catch (error) {
            console.log("error while getting token");
            return 'error';
        }
    }

    
    static async setToken(token) {
        try {
            await AsyncStorage.setItem( "ACCESS_TOKEN", token);
            return token;
        } catch (error) {
            console.log("error while setting token" + error);
            return 'error';
        }
    }
    static parseBody(details) {
        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        return formBody;
    }
    static async login(username, password) {  
        try {
            let response = await fetch('https://fypbackend.mooo.com/oauth/token', {
                method: 'POST',
                headers: {
                    'Authorization': 'Basic bW9iaWxlYXBwOmF3ZXNvbWVmeXA=',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: Utility.parseBody({
                    'grant_type': 'password',
                    'username': username,
                    'password': password
                })
            });
            let responseJson = await response.json();
            console.log(responseJson);
            if (responseJson.code == null) {
                await Utility.setToken(responseJson.accessToken);
                return responseJson;
            } else {
                return 'error';
            }
        } catch (error) {
            console.error(error);
        }
    }

    static async getMovieList() {  
        let token = await Utility.getToken();
        console.log("getMoive = " + token);
        try {
            let response = await fetch('http://fypbackend.mooo.com/movies', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            });
            let responseJson = await response.json();
            console.log(responseJson);
            if (responseJson.code == null) {
                return responseJson;
            } else {
                return 'error';
            }
        } catch (error) {
            console.error(error);
        }
    }
}