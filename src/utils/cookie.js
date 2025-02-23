const cookies = (tokens) =>{
    document.cookie = `accessToken=${tokens.accessToken}; max-age=${24* 60 * 60}`;
    document.cookie = ` refreshToken = ${tokens. refreshToken}; max-age =${30 * 24 * 60 * 60} `
}

const getCookie = (cookiName) => {

    return document.cookie.split(";").find(token => token.trim().split("=")[0] === cookiName)?.split("=")[1];

}

export {cookies, getCookie}