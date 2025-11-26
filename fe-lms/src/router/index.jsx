import {
  createBrowserRouter,
  redirect,
  useRouteError,
  useRouteLoaderData,
} from "react-router-dom";
import SignInPage from "../pages/SignIn/SignInPage";
import SignUpPage from "../pages/SignUp/SignUpPage";
import SuccessCheckoutPage from "../pages/SuccessCheckout/SuccessCheckoutPage";
import LayoutDashboard from "../components/Layout";
import ManagerHomePage from "../pages/Manager/home/ManagerHome";
import ManageCoursePage from "../pages/Manager/courses/ManageCoursePage";
import ManageCreateCoursePage from "../pages/Manager/create-course/ManageCreateCoursePage";
import ManageCourseDetailPage from "../pages/Manager/course-detail/ManageCourseDetailPage";
import ManageContentCreatePage from "../pages/Manager/course-content-create/ManageContentCreatePage";
import ManageCoursePreviewPage from "../pages/Manager/coursePreview/ManageCoursePreviewPage";
import ManageStudentsPage from "../pages/Manager/students/ManageStudentsPage";
import { element } from "prop-types";
import StudentPage from "../pages/Student/studentOverview/StudentPage";
import secureLocalStorage from "react-secure-storage";
import { STORAGE_KEY, MANAGER_SESSION, STUDENT_SESSION } from "../utils/const";
import {
  getCategories,
  getCategoryDetail,
  getCourseDetail,
  getCourses,
  getDetailContentCourse,
  getStudentsCourse,
} from "../services/courseService";
import ManageStudentCreatePage from "../pages/Manager/students-create/ManageStudentCreatePage";
import {
  getDetailStudent,
  getStudentCoursesList,
  getStudents,
} from "../services/studentService";
import StudentCourseList from "../pages/Manager/student-course/StudentCourseList";
import StudentForm from "../pages/Manager/student-course/StudentForm";
import {
  getOverviews,
  getStudentEngagement,
} from "../services/overviewService";
import ForgotPasswordPage from "../pages/ForgotPassword/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/ResetPasswordPage";
import ManageCategoriesPage from "@/pages/Manager/categories/ManageCategoriesPage";
import ManageCreateCategoriesPage from "@/pages/Manager/categories/ManageCreateCategoriesPage";
import { getMe } from "@/services/userService";
import ProfilePage from "@/pages/Profile/ProfilePage";

function ErrorPage() {
  const error = useRouteError();

  const managerSession = useRouteLoaderData(MANAGER_SESSION);
  const studentSession = useRouteLoaderData(STUDENT_SESSION);

  if (error?.status === 401) {
    if (managerSession) {
      window.location.href = "/manager/sign-in";
      return null;
    }

    if (studentSession) {
      window.location.href = "/student/sign-in";
      return null;
    }

    window.location.href = "/";
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-xl font-bold">Oops, something went wrong 😢</h1>
      <p>{error?.statusText || error?.message}</p>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    loader: async () => {
      throw redirect("/student/sign-in");
    },
  },
  {
    path: "/manager/sign-in",
    element: <SignInPage key="manager" />,
    loader: async () => {
      const session = secureLocalStorage.getItem(STORAGE_KEY);

      if (session && session.role === "manager") {
        throw redirect("/manager");
      }
      return true;
    },
  },
  {
    path: "/manager/sign-up",
    element: <SignUpPage />,
    loader: async () => {
      const session = secureLocalStorage.getItem(STORAGE_KEY);

      if (session && session.role === "manager") {
        throw redirect("/manager");
      }
      return true;
    },
  },
  {
    path: "/success-checkout",
    element: <SuccessCheckoutPage />,
  },
  {
    path: "/manager",
    id: MANAGER_SESSION,
    errorElement: <ErrorPage />,
    loader: async () => {
      const session = secureLocalStorage.getItem(STORAGE_KEY);

      if (!session || session.role !== "manager") {
        throw redirect("/manager/sign-in");
      }
      return session;
    },

    element: <LayoutDashboard />,
    children: [
      {
        index: true,
        loader: async () => {
          const overviews = await getOverviews();
          const studentEngagement = await getStudentEngagement();
          return {
            studentEngagement: studentEngagement?.data,
            overviews: overviews?.data,
          };
        },
        element: <ManagerHomePage />,
      },
      {
        path: "/manager/courses",
        loader: async () => {
          const data = await getCourses();
          return data;
        },
        element: <ManageCoursePage />,
      },
      {
        path: "/manager/courses/create",
        loader: async () => {
          const categories = await getCategories();
          return { categories, course: null };
        },
        element: <ManageCreateCoursePage />,
      },
      {
        path: "/manager/courses/edit/:id",
        loader: async ({ params }) => {
          const categories = await getCategories();
          const course = await getCourseDetail(params.id);

          return { categories, course: course?.data };
        },
        element: <ManageCreateCoursePage />,
      },
      {
        path: "/manager/courses/:id",
        loader: async ({ params }) => {
          const course = await getCourseDetail(params.id);

          return course?.data;
        },
        element: <ManageCourseDetailPage />,
      },
      {
        path: "/manager/courses/:id/create",
        element: <ManageContentCreatePage />,
      },
      {
        path: "/manager/courses/:id/edit/:contentId",
        loader: async ({ params }) => {
          const content = await getDetailContentCourse(params.contentId);
          return content?.data;
        },
        element: <ManageContentCreatePage />,
      },
      {
        path: "/manager/courses/:id/preview",
        loader: async ({ params }) => {
          const course = await getCourseDetail(params.id, true);
          return course?.data;
        },
        element: <ManageCoursePreviewPage />,
      },
      {
        path: "/manager/categories",
        loader: async () => {
          const data = await getCategories();
          return data;
        },
        element: <ManageCategoriesPage />,
      },
      {
        path: "/manager/categories/create",
        element: <ManageCreateCategoriesPage />,
      },
      {
        path: "/manager/categories/edit/:id",
        loader: async ({ params }) => {
          const categories = await getCategoryDetail(params.id);

          return categories?.data;
        },
        element: <ManageCreateCategoriesPage />,
      },
      {
        path: "/manager/students",
        loader: async () => {
          const students = await getStudents();

          return students?.data;
        },
        element: <ManageStudentsPage />,
      },
      {
        path: "/manager/students/create",
        element: <ManageStudentCreatePage />,
      },
      {
        path: "/manager/students/edit/:id",
        loader: async ({ params }) => {
          const student = await getDetailStudent(params.id);
          return student?.data;
        },
        element: <ManageStudentCreatePage />,
      },
      {
        path: "/manager/courses/students/:id",
        loader: async ({ params }) => {
          const course = await getStudentsCourse(params.id);

          return course?.data;
        },
        element: <StudentCourseList />,
      },
      {
        path: "/manager/courses/students/:id/add",
        loader: async ({ params }) => {
          const students = await getStudents();
          const course = await getCourseDetail(params.id);

          return { students: students?.data, course };
        },
        element: <StudentForm />,
      },
      {
        path: "/manager/acccount-settings",
        loader: async () => {
          const profile = await getMe();

          return profile?.data;
        },
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: "/student",
    id: STUDENT_SESSION,
    errorElement: <ErrorPage />,
    element: <LayoutDashboard isAdmin={false} />,
    loader: async () => {
      const session = secureLocalStorage.getItem(STORAGE_KEY);

      if (!session || session.role !== "student") {
        throw redirect("/student/sign-in");
      }
      return session;
    },
    children: [
      {
        index: true,
        loader: async () => {
          const session = secureLocalStorage.getItem(STORAGE_KEY);
          if (session || session.role === "student") {
            const courses = await getStudentCoursesList();
            return courses?.data;
          }
          return session;
        },
        element: <StudentPage />,
      },
      {
        path: "/student/detail-course/:id",
        loader: async ({ params }) => {
          const course = await getCourseDetail(params.id, true);
          return course?.data;
        },
        element: <ManageCoursePreviewPage isAdmin={false} />,
      },
      {
        path: "/student/acccount-settings",
        loader: async () => {
          const profile = await getMe();

          return profile?.data;
        },
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: "/student/sign-in",
    element: <SignInPage key="student" type="student" />,
    loader: async () => {
      const session = secureLocalStorage.getItem(STORAGE_KEY);

      if (session && session.role === "student") {
        throw redirect("/student");
      }
      return true;
    },
  },
  {
    path: "/manager/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/student/forgot-password",
    element: <ForgotPasswordPage type="student" />,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage />,
  },
]);

export default router;
