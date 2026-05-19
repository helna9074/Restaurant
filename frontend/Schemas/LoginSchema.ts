import z from "zod";

export const LoginSchema=z.object({
    email:z.string().min(10,"email is required").email("invalid email"),
    password:z.string().min(6,"password is required")
})
export type LoginForm=z.infer<typeof LoginSchema>

export const UserSchema = (isEdit: boolean) =>
  z.object({
    email: z.string().email("Invalid email"),
    employeeId: z.string().min(1),
    branchId: z.string().min(1),
    position: z.string(),
    department: z.string(),

    password: isEdit
      ? z.string().optional()
      : z.string().min(6, "Password required"),

    confirmPassword: isEdit
      ? z.string().optional()
      : z.string(),

    newpassword: isEdit
      ? z.string().min(6).optional()
      : z.string().optional(),
  }).refine(
    (data) => {
      if (!isEdit) {
        return data.password === data.confirmPassword;
      }
      return true;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

// export const UpdateUserSchema = z.object({
//   email: z.string().email("Invalid email"),
//   employeeId: z.string().min(1),
//   branchId: z.string().min(1),
//   position: z.string(),
//   department: z.string(),
//   newpassword: z.string().min(6).optional(),

// });
// export type UpdateUserForm = z.infer<typeof UpdateUserSchema>;