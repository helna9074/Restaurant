import z from "zod";

export const CategorySchema = z.object({
  branchId: z.string().min(1, "Select at least one branch"),
  category: z.string().min(1, "Select at least one category"),
  img: z.any().optional(),
  offer: z
    .object({
      isActive: z.boolean(),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
      discount: z.number().optional(),
    })

   .superRefine((data, ctx) => {
  if (data.isActive) {
    if (!data.startDate?.trim()) {
      ctx.addIssue({
        path: ["startDate"],
        message: "Start date required",
        code: z.ZodIssueCode.custom,
      });
    }

    if (!data.endDate?.trim()) {
      ctx.addIssue({
        path: ["endDate"],
        message: "End date required",
        code: z.ZodIssueCode.custom,
      });
    }

    if (data.discount === undefined||data.discount===0) {
      ctx.addIssue({
        path: ["discount"],
        message: "Discount required",
        code: z.ZodIssueCode.custom,
      });
    }
  }
})
});
export type CategoryForm = z.infer<typeof CategorySchema>;

export const MenuSchema=z.object({
    branchId:z.string().min(1,"Select at least one branch"),
    menus:z.array(z.string()).min(1,"Select at least one menu")
})
export type MenuFormData = z.infer<typeof MenuSchema>;
export const AddOnSchema=z.object({
    branchId:z.string().min(1,"Select at least one branch"),
    addOn:z.string().min(1,"required addOn"),
   portions:z.array(z.object({
   
    portion:z.string().min(1,"required portion"),
    price:z.number().min(1,"required price")
   })
  ).optional()

})
export type AddOnFormData = z.infer<typeof AddOnSchema>;