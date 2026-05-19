import { GetEmployees } from "@/service/API/departmentApi";
import { EmployeeTableData } from "@/types/department";
import { useQuery } from "@tanstack/react-query";
export const useEmployee=(debouncedValue:string,selectedBranch:string)=>{
    const query=useQuery({
        queryKey: ["employees", debouncedValue, selectedBranch],
        queryFn: () => GetEmployees(debouncedValue, selectedBranch),
        enabled: !!selectedBranch,
        staleTime: 2 * 60 * 1000,
      });

      const data: EmployeeTableData[] = query.data?.data ?? [];
return {
    ...query,
    data
  };
}
