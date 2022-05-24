//const baseUrl = "https://learn-english-backend-app.herokuapp.com/api";
const baseUrl = "http://localhost:8080/api";

export const fetchSinToken = (endpoint, data, method = "GET") => {
  const url = `${baseUrl}/${endpoint}`;

  if (method === "GET") {
    return fetch(url);
  } else {
    try {
      return fetch(url, {
        method,
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.log(error);
    }
  }
};

export const fetchConToken = (endpoint, data, method = "GET") => {
  const url = `${baseUrl}/${endpoint}`;

  const token = localStorage.getItem("token") || "";
  if (method === "GET") {
    return fetch(url, {
      method,
      headers: {
        "x-token": token,
      },
    });
  } else {
    try {
      return fetch(url, {
        method,
        headers: {
          "Content-type": "application/json",
          "x-token": token,
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.log(error);
    }
  }
};
