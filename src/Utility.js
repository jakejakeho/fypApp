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

    static async removeToken() {
        try {
            let keys = ['ACCESS_TOKEN'];
            await AsyncStorage.multiRemove(keys);
            return 'success';
        } catch (error) {
            console.log("error while setting token" + error);
            return 'error';
        }
    }

    static async setToken(token) {
        try {
            await AsyncStorage.setItem("ACCESS_TOKEN", token);
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
            let response = await fetch('https://fypbackend.mooo.com/users/login', {
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

    static async register(username, password, name, email, image) {
        try {
            console.log(image);
            let formdata = new FormData();

            formdata.append("username", username)
            formdata.append("password", password)
            formdata.append("name", name)
            formdata.append("email", email)
            formdata.append('userImage', { uri: image, name: 'image.jpg', type: 'image/jpeg' })


            let response = await fetch('https://fypbackend.mooo.com/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formdata
            });
            let responseJson = await response.json();
            console.log(responseJson);
            if (responseJson.code == null) {
                return 'success';
            } else {
                return 'error';
            }
        } catch (error) {
            console.error(error);
        }
    }

    static async insertHistory(history) {
        let token = await Utility.getToken();
        try {
            console.log("inserting history");
            let response = await fetch('https://fypbackend.mooo.com/users/history', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: Utility.parseBody({
                    'movieId': history.movieId,
                    'startDate': history.startDate,
                    'endDate': history.endDate
                })
            });
            let responseJson = await response.json();
            console.log(responseJson);
            if (responseJson.code == null) {
                return 'success';
            } else {
                return 'error';
            }
        } catch (error) {
            console.error(error);
        }
    }

    static async insertRating(rating) {
        let token = await Utility.getToken();
        try {
            console.log("inserting rating");
            let response = await fetch('https://fypbackend.mooo.com/users/rating', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: Utility.parseBody({
                    'movieId': rating.movieId,
                    'rating': rating.rating,
                    'date': rating.date
                })
            });
            let responseJson = await response.json();
            console.log(responseJson);
            if (responseJson.code == null) {
                return 'success';
            } else {
                return 'error';
            }
        } catch (error) {
            console.error(error);
        }
    }

    static async getMovieList(genres, page) {
        let token = await Utility.getToken();
        console.log("getMoive = " + token);
        try {
            let response = await fetch('http://fypbackend.mooo.com/movies', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: Utility.parseBody({
                    'genres': genres,
                    'page': page,
                })
            });
            let responseJson = await response.json();
            if (responseJson.code == null) {
                return responseJson;
            } else {
                return 'error';
            }
        } catch (error) {
            console.error(error);
        }
    }

    static async getMovieHistoryList() {
        let token = await Utility.getToken();
        console.log("getMoiveHistory = " + token);
        try {
            let response = await fetch('http://fypbackend.mooo.com/users/history', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            });
            let responseJson = await response.json();
            if (responseJson.code == null) {
                return responseJson;
            } else {
                return 'error';
            }
        } catch (error) {
            console.error(error);
        }
    }

    static async getUserDetail() {
        let token = await Utility.getToken();
        console.log("getMoive = " + token);
        try {
            let response = await fetch('http://fypbackend.mooo.com/users/info', {
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