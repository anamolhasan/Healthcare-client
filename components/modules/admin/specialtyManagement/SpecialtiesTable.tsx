"use client";

import DataTable from "@/components/shared/table/DataTable";
import { getSpecialties } from "@/services/specialty.service";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { specialtyColumns } from "./SpecialtiesColumns";
import { useRowActionModalState } from "@/hooks/useRowActionModalState";
import { ISpecialty } from "@/types/specialty.types";
import { UseServerManagedDataTable } from "@/hooks/useServerManagedDataTable";
import {
  ServerManagedFilterDefinition,
  useServerManagedDataTableFilters,
} from "@/hooks/useServerManagedDataTableFilter";
import { useServerManagedDataTableSearch } from "@/hooks/useServerManagedDataTableSearch";
import { useSearchParams } from "next/navigation";
import { PaginationMeta } from "@/types/api.types";
import CreateSpecialtyFormModal from "./CreateSpecialtyFormModal";

interface SpecialtyTableProps {
  initialQueryString: string;
}

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

// const SPECIALTY_FILTER_DEFINITIONS:ServerManagedFilterDefinition[] = [];

const SpecialtiesTable = ({ initialQueryString }: SpecialtyTableProps) => {
  const searchParams = useSearchParams();
  const {
    editingItem,
    deletingItem,

    isEditModalOpen,
    isDeleteDialogOpen,

    onEditOpenChange,
    onDeleteOpenChange,

    tableActions,
  } = useRowActionModalState<ISpecialty>();

  const {
    queryStringFromUrl,
    optimisticSortingState,
    optimisticPaginationState,
    isRouteRefreshPending,
    updateParams,
    handleSortingChange,
    handlePaginationChange,
  } = UseServerManagedDataTable({
    searchParams,
    defaultPage: DEFAULT_PAGE,
    defaultLimit: DEFAULT_LIMIT,
  });

  const { searchTermFromUrl, handleDebouncedSearchChange } =
    useServerManagedDataTableSearch({
      searchParams,
      updateParams,
    });

  // const {
  //   filterValues,
  //   handleFilterChange,
  //   clearAllFilters,
  // } = useServerManagedDataTableFilters({
  //   searchParams,
  //   definitions: SPECIALTY_FILTER_DEFINITIONS,
  //   updateParams,
  // })

  const queryString = queryStringFromUrl || initialQueryString;

  const {
    data: specialtyResponse,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["specialties", queryString],
    queryFn: () => getSpecialties(queryString),
  });

  // const {data, isLoading} = useQuery({
  //   queryKey:['specialties', initialQueryString],
  //   queryFn:()=> getSpecialties(initialQueryString)
  // })

  const specialties = specialtyResponse?.data ?? [];
  const meta: PaginationMeta | undefined = specialtyResponse?.meta;
  return (
    <>
      <DataTable
        data={specialties}
        columns={specialtyColumns}
        emptyMessage="No specialty found"
        isLoading={isLoading || isFetching || isRouteRefreshPending}
        sorting={{
          state: optimisticSortingState,
          onSortingChange: handleSortingChange,
        }}
        search={{
          initialValue: searchTermFromUrl,
          placeholder: "Search specialty...",
          debounceMs: 700,
          onDebouncedChange: handleDebouncedSearchChange,
        }}
        pagination={{
          state: optimisticPaginationState,
          onPaginationChange: handlePaginationChange,
        }}
        toolbarAction={<CreateSpecialtyFormModal />}
        meta={meta}
        actions={tableActions}
      />
    </>
  );
};

export default SpecialtiesTable;
