"use client";
import { Branch } from "@/types/branch";
import React, { useState } from "react";
import Table from "../ui/Table";
import { HiBuildingStorefront } from "react-icons/hi2";
import SearchBar from "../TableComponents/SearchBar";
import EditDeleteIcons from "../TableComponents/EditDeleteIcons";
import Pagination from "../TableComponents/Pagination";
import { SkeletonTable } from "../wrapper/SkeletonTable";
import { PaginationSkeleton } from "../wrapper/PaginationSkelton";
import { FormatDate } from "@/helper/date";
import { useDebounce } from "@/hooks/useDebounce";
import { set } from "zod";
import { useBranches } from "@/hooks/useBranch";

interface Props {
  OnEdit: (value: Branch) => void;
  OnDelete: (id: string) => void;
  OnView: (id: string) => void;
}

const BranchTableClient = ({ OnEdit, OnDelete,OnView }: Props) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };
  const debouncedValue = useDebounce(search, 400);
 const {branches,totalPage,error,isLoading}=useBranches({page,search:debouncedValue})
 

  const branchTopSection = (
    <div className="w-full flex justify-end py-2">
      <SearchBar value={search} onChange={handleSearchChange} />
    </div>
  );

  return (
    <div className="bg-card rounded-2xl flex flex-col gap-3">
      {isLoading ? (
        <>
          <SkeletonTable columns={7} rows={7} />
          <PaginationSkeleton />
        </>
      ) : (
        <>
          <Table<Branch>
            columns={[
              {
                headers: "Name",
                accessor: "name",
                style: "text-center",
                render: (_: any, row: Branch) => (
                  <div className="flex items-center gap-4 ">
                    {row.logo ? (
                      <img
                        src={row.logo}
                        alt=""
                        className="w-12 h-12 rounded-xl"
                      />
                    ) : (
                      <div className="w-12 flex items-center justify-center h-12 bg-main-primary rounded-2xl">
                        <HiBuildingStorefront
                          size={25}
                          className="text-white"
                        />
                      </div>
                    )}

                    <span>{row.name}</span>
                  </div>
                ),
              },

              { headers: "Phone", accessor: "phone" },
              { headers: "State", accessor: "state" },
              { headers: "Email", accessor: "email" },
              { headers: "City", accessor: "city" },
              {
                headers: "Created Date",
                accessor: "createdAt",
                render: (_: any, row: Branch) => (
                  <span>{FormatDate(row.createdAt || "")}</span>
                ),
              },
              {
                headers: "Actions",
                accessor: "actions",
                style: "text-center",
                render: (_: any, row: Branch) => (
                  <EditDeleteIcons
                  ShowView={true}
                    OnEdit={() => OnEdit(row)}
                    OnDelete={() => OnDelete(row._id)}
                    OnView={() => OnView(row._id)}
                  />
                ),
              },
            ]}
            data={branches}
            topSection={branchTopSection}
          />

          {error && <p>Error loading data</p>}
          <div className="flex justify-end p-3">
            <Pagination
              page={page}
              onPageChange={setPage}
              totalPage={totalPage}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default BranchTableClient;
