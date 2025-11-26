import { apiInstanceAuth } from "../utils/axios";

export const getMe = async () =>
  apiInstanceAuth.get("/me").then((res) => res.data);

export const updateProfile = async (payload) =>
  apiInstanceAuth.put("/update-profile", payload).then((res) => res.data);

export const updatePassword = async (payload) =>
  apiInstanceAuth.put("/change-password", payload).then((res) => res.data);

export const updatePhoto = async (file) => {
  const formData = new FormData();
  formData.append("photo", file);

  return apiInstanceAuth
    .put("/update-photo", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data);
};
