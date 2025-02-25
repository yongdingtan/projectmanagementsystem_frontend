/* eslint-disable no-unused-vars */
import api from "@/config/api";

export const createPayment = ({ planType, jwt }) => {
  return async (dispatch) => {
    try {
      const { data } = await api.post(`/api/payment/${planType}`, {}, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log(data)

      if (data.approvalLink) { // Use `approvalLink` instead of `payment_link_url`
        console.log(data.approvalLink);
        window.location.href = data.approvalLink; // Redirect to the PayPal payment page
      }
    } catch (error) {
      console.log(error);
    }
  };
};