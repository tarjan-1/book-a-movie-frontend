import axios from "axios";

export const getAllMovies = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/movie`);

    // if (res.status !== 200) {
    //   console.log("No Data");
    //   return null;
    // }

    const data = res.data;
    return data;
  } catch (err) {
    console.log("Error fetching movies: ", err);
    return null;
  }
};

export const sendUserAuthRequest = async (data, signup) => {
  const res = await axios
    .post(
      `${process.env.REACT_APP_BACKEND_URL}/user/${
        signup ? "signup" : "login"
      }`,
      {
        name: signup ? data.name : "",
        email: data.email,
        password: data.password,
      }
    )
    .catch((err) => console.log(err));

  // if (res.status !== 200 && res.status !== 201) {
  //   console.log("Unexpected Error Occurred");
  // }

  const resData = await res.data;
  return resData;
};

export const sendAdminAuthRequest = async (data) => {
  const res = await axios
    .post(`${process.env.REACT_APP_BACKEND_URL}/admin/login`, {
      email: data.email,
      password: data.password,
    })
    .catch((err) => console.log(err));

  // if (res.status !== 200) {
  //   return console.log("Unexpectyed Error");
  // }

  const resData = await res.data;
  return resData;
};

export const getMovieDetails = async (id) => {
  const res = await axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/movie/${id}`)
    .catch((err) => console.log(err));

  // if (res.status !== 200) {
  //   return console.log("Unexpected Error");
  // }

  const resData = await res.data;
  return resData;
};

export const newBooking = async (data) => {
  const res = await axios
    .post(`${process.env.REACT_APP_BACKEND_URL}/booking`, {
      movie: data.movie,
      seatNumber: data.seatNumber,
      date: data.date,
      user: localStorage.getItem("userId"),
    })
    .catch((err) => console.log(err));

  // if (res.status !== 201) {
  //   return console.log("Unexpected Error");
  // }

  const resData = await res.data;
  return resData;
};

export const getUserBooking = async () => {
  const id = localStorage.getItem("userId");
  const res = await axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/user/bookings/${id}`)
    .catch((err) => console.log(err));

  // if (res.status !== 200) {
  //   return console.log("Unexpected Error");
  // }

  const resData = await res.data;
  return resData;
};

export const deleteBooking = async (id) => {
  const res = await axios
    .delete(`${process.env.REACT_APP_BACKEND_URL}/booking/${id}`)
    .catch((err) => console.log(err));

  // if (res.status !== 200) {
  //   return console.log("Unepxected Error");
  // }

  const resData = await res.data;
  return resData;
};

export const getUserDetails = async () => {
  const id = localStorage.getItem("userId");
  const res = await axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/user/${id}`)
    .catch((err) => console.log(err));

  // if (res.status !== 200) {
  //   return console.log("Unexpected Error");
  // }

  const resData = await res.data;
  return resData;
};

export const addMovie = async (data) => {
  const res = await axios
    .post(
      `${process.env.REACT_APP_BACKEND_URL}/movie`,
      {
        title: data.title,
        description: data.description,
        releaseDate: data.releaseDate,
        posterUrl: data.posterUrl,
        fetaured: data.fetaured,
        actors: data.actors,
        admin: localStorage.getItem("adminId"),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .catch((err) => console.log(err));

  // if (res.status !== 201) {
  //   return console.log("Unexpected Error Occurred");
  // }
  console.log("res: ", res);

  const resData = await res.data;
  return resData;
};

export const getAdminById = async () => {
  const adminId = localStorage.getItem("adminId");
  const res = await axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/admin/${adminId}`)
    .catch((err) => console.log(err));

  // if (res.status !== 200) {
  //   return console.log("Unexpected Error Occurred");
  // }

  const resData = await res.data;
  return resData;
};
