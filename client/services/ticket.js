import axios from "axios";

export const getAllTickets = async (params) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_WEB_SERVER}/tickets`,
      { params: params }
    );

    return response.data;
  } catch (e) {
    return e;
  }

  // await axios
  //   .get(`${process.env.NEXT_PUBLIC_WEB_SERVER}/tickets`, { params: params })
  //   .then((response) => response.data)
  //   .catch((err) => err);
};
