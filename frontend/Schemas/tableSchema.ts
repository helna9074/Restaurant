import z from "zod";

export const FloorSchema=z.object({
 selectedBranch:z.string().min(1,"Select at least one branch"),
 floorName:z.string().min(1,"Select at least one floor"),
 count:z.number().min(1,"Select at least one table")
})
export type FloorData=z.infer<typeof FloorSchema>;
export const TableSchema=z.object({
 selectedBranch:z.string().min(1,"Select at least one branch"),
 floorName:z.string().min(1,"Select at least one floor"),
 table:z.string().min(1,"Select at least one table"),
 capacity:z.number().min(1,"Select at least one capacity")
})
export type TableFormData=z.infer<typeof TableSchema>;