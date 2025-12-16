// import { IUser } from "../types/types";

// export const GetAllUsers: () => Promise<any> = async () => {
//   try {
//     const res = await fetch("http://localhost:4000/users");
//     return res.json();
//   } catch (err) {
//     console.log(err);
//     return [];
//   }
// };

// export const UpdateUserData = async (updatedUser: Partial<IUser>, userId: string) => {
//   await fetch(`http://localhost:4000/editusers/${userId}`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(updatedUser),
//   });

//   return { success: true };
// };

// export const ChangeUserStatus = async (newrole: string, userId: string) => {
//   try {
//     const res = await fetch(`http://localhost:4000/users/${userId}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ newrole }),
//     });

//     return res.json();
//   } catch (err) {
//     console.log(err);
//   }
// };

// // export const LogInUser = async (
// //   passval: string,
// //   emval: string,
// //   isremember: boolean,
// // ) => {
// //   try {
// //     const res = await fetch("http://localhost:4000/sign-in", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({ emval, passval }),
// //     });

// //     const data: localData = await res.json();
// //     if (res.ok) {
// //       if (isremember) {
// //         localStorage.setItem("auth", "true");
// //         localStorage.setItem("userId", data.id);
// //         localStorage.setItem("userRole", data.role);
// //       } else {
// //         sessionStorage.setItem("auth", "true");
// //         sessionStorage.setItem("userId", data.id);
// //         sessionStorage.setItem("userRole", data.role);
// //       }
// //       return { success: true };

// //     } else {
// //       alert("Invalid credentials");
// //     }
// //   } catch (err) {
// //     console.log(err);
// //   }
// // };

// // export const RegisterUser = async (first_name:string, last_name:string, email:string, password:string) => {
// //   const role = "employee";
// //   try {
// //     const res = await fetch("http://localhost:4000/sign-up", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({
// //         first_name,
// //         last_name,
// //         email,
// //         password,
// //         role,
// //       }),
// //     });

// //     const data = await res.json();

// //     if (res.ok) {
// //       sessionStorage.setItem("auth", "true");
// //       sessionStorage.setItem("userId", data._id);
// //       sessionStorage.setItem("userRole", role);

// //       console.log("successfully registered");
// //     } else {
// //       alert("unsuccessful registration");
// //     }
// //   } catch (err) {
// //     console.log(err);
// //   }
// // };