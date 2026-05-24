import z from "zod";

export const KitchenSchema=z.object({
    branchId:z.string().min(1,"Select at least one branch"),
    kitchen:z.string().min(1,"Select at least one kitchen")
})
export type KitchenFormData = z.infer<typeof KitchenSchema>;