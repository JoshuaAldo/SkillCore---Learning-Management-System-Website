import { apiInstanceAuth } from "../utils/axios";

export const getCourses = async () =>
  apiInstanceAuth.get("/courses").then((res) => res.data);

export const getCourseDetail = async (id, isPreview = false) =>
  apiInstanceAuth
    .get(`/courses/${id}${isPreview ? "?preview=true" : ""}`)
    .then((res) => res.data);

export const getCategories = async () =>
  apiInstanceAuth.get("/categories").then((res) => res.data);

export const getCategoryDetail = async (id) =>
  apiInstanceAuth.get(`/categories/${id}`).then((res) => res.data);

export const createCourse = async (data) =>
  apiInstanceAuth
    .post("/courses", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);

export const updateCourse = async (data, id) =>
  apiInstanceAuth
    .put(`/courses/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);

export const deleteCourse = async (id) => {
  try {
    const res = await apiInstanceAuth.delete(`/courses/${id}`);
    return res.data;
  } catch (error) {
    throw error.response || error;
  }
};

export const createCategory = async (data) =>
  apiInstanceAuth.post("/categories", data).then((res) => res.data);

export const updateCategory = async (data, id) =>
  apiInstanceAuth.put(`/categories/${id}`, data).then((res) => res.data);

export const deleteCategories = async (id) => {
  try {
    const res = await apiInstanceAuth.delete(`/categories/${id}`);
    return res.data;
  } catch (error) {
    throw error.response || error;
  }
};

export const createContentCourse = async (data) =>
  apiInstanceAuth.post("/courses/contents", data).then((res) => res.data);

export const getDetailContentCourse = async (id) =>
  apiInstanceAuth.get(`/courses/contents/${id}`).then((res) => res.data);

export const updateContentCourse = async (data, id) =>
  apiInstanceAuth.put(`/courses/contents/${id}`, data).then((res) => res.data);

export const deleteDetailContentCourse = async (id) =>
  apiInstanceAuth.delete(`/courses/contents/${id}`).then((res) => res.data);

export const getStudentsCourse = async (id) =>
  apiInstanceAuth.get(`/courses/students/${id}`).then((res) => res.data);

export const addStudentsCourse = async (data, id) =>
  apiInstanceAuth.post(`/courses/students/${id}`, data).then((res) => res.data);

export const deleteStudentsCourse = async (data, id) =>
  apiInstanceAuth.put(`/courses/students/${id}`, data).then((res) => res.data);
