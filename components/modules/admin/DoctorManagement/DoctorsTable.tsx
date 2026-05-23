'use client'

import { getAllSpecialties, getDoctors } from '@/services/doctor.service'
import { useQuery } from '@tanstack/react-query'
import { Gender, IDoctor } from '@/types/doctor.types'
import DataTable from '@/components/shared/table/DataTable'
import { DoctorsColumns } from './DoctorsColumns'
import { useSearchParams } from 'next/navigation'
import { useRowActionModalState } from '@/hooks/useRowActionModalState'
import { UseServerManagedDataTable } from '@/hooks/useServerManagedDataTable'
import { useServerManagedDataTableSearch } from '@/hooks/useServerManagedDataTableSearch'
import { useServerManagedDataTableFilters } from '@/hooks/useServerManagedDataTableFilter'
import { useMemo } from 'react'
import { ISpecialty } from '@/types/specialty.types'
import { PaginationMeta } from '@/types/api.types'
import { DataTableFilterConfig,  DataTableFilterValues } from '@/components/shared/table/DataTableFilters'



const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const SPECIALTIES_FILTER_KEY = 'specialties.specialty.title'
const APPOINTMENT_FEE_FILTER_KEY = 'appointmentFee'
const DOCTOR_FILTER_DEFINITIONS = [
  serverManagedFilter.single('gender'),
  serverManagedFilter.multi(SPECIALTIES_FILTER_KEY),
  serverManagedFilter.range(APPOINTMENT_FEE_FILTER_KEY)
]

const DoctorsTable = ({initialQueryString}:{initialQueryString:string}) => {

  const searchParams = useSearchParams()
  const {
    viewingItem,
    editingItem,
    deletingItem,
    isViewDialogOpen,
    isEditModalOpen,
    isDeleteDialogOpen,
    onViewOpenChange,
    onEditOpenChange,
    onDeleteOpenChange,
    tableActions,
  } = useRowActionModalState<IDoctor>()

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
  })
    
  const queryString = queryStringFromUrl || initialQueryString;

  const {
    searchTermFromUrl,
    handleDebouncedSearchChange,
  } = useServerManagedDataTableSearch({
    searchParams,
    updateParams,
  })

  const {
    filterValues,
    handleFilterChange,
    clearAllFilters,
  } = useServerManagedDataTableFilters({
    searchParams,
    definitions: DOCTOR_FILTER_DEFINITIONS,
    updateParams,
  })

    const {data: doctorDataResponse, isLoading, isFetching} = useQuery({
        queryKey:['doctors', queryString],
        queryFn:()=>getDoctors(queryString)
    })

    const {data:specialtiesResponse, isLoading: isLoadingSpecialties} = useQuery({
      queryKey:['specialties'],
      queryFn: getAllSpecialties,
      staleTime: 1000 * 60 * 6,
      gcTime: 1000 * 60 * 60 * 24,
    })

    const doctors = doctorDataResponse?.data ?? [];
    const specialties = useMemo<ISpecialty[]>(()=>{
      return specialtiesResponse?.data ?? [];
    },[specialtiesResponse])

    const meta: PaginationMeta | undefined = doctorDataResponse?.meta;

    const filterConfigs = useMemo<DataTableFilterConfig>(()=>{
      return[
        {
          id:'gender',
          label:'Gender',
          type:'single-select',
          options:[
            {label:'Male', value:'MALE'},
            {label:'Female', value:'FEMALE'},
            {label:'other', value:'OTHER'},
          ],
        },
        {
          id:SPECIALTIES_FILTER_KEY,
          label:'Specialties',
          type:'multi-select',
          options: specialties.map((specialty) => ({
            label:specialty.title,
            value: specialty.title,
          })),
        },
        {
          id:'appointmentFee',
          label:"Fee Range",
          type:'range',
        },
      ];
    },[specialties])

    const filterValuesForTable = useMemo<DataTableFilterValues>(()=>{
      return {
        gender: filterValues.gender,
        [SPECIALTIES_FILTER_KEY]: filterValues[SPECIALTIES_FILTER_KEY],
        appointmentFee: filterValues[APPOINTMENT_FEE_FILTER_KEY],
      };
    },[filterValues])

    // const {data:doctors} = doctorDataResponse! || [];

    // const handleView = (doctor: IDoctor) => {
    //   console.log('View Doctor', doctor)
    // }

    // const handleEdit = (doctor: IDoctor) => {
    //   console.log('Edit doctor', doctor);
    // }

    // const handleDelete = (doctor: IDoctor) => {
    //   console.log('Delete doctor', doctor)
    // }
    // const {getHeaderGroups, getRowModel} = useReactTable({
    //   data: doctors,
    //   columns:doctorColumns,
    //   getCoreRowModel: getCoreRowModel(),
    // })

    // console.log(doctors)
  return (
    // <Table>
    //   <TableHeader>
    //     {getHeaderGroups().map((hg)=> (
    //       <TableRow key={hg.id} >
    //         {hg.headers.map((header) => (
    //           <TableHead key={header.id}>
    //             {flexRender(
    //               header.column.columnDef.header,
    //               header.getContext(),
    //             )}
    //           </TableHead>
    //         ))}
    //       </TableRow>
    //     ))}
    //   </TableHeader>
    //   <TableBody>
    //     {getRowModel().rows.map((row) => (
    //       <TableRow key={row.id} >
    //         {row.getVisibleCells().map((cell) => (
    //           <TableCell key={cell.id} >
    //             {flexRender(cell.column.columnDef.cell, cell.getContext())}
    //           </TableCell>
    //         ))}
    //       </TableRow>
    //     ))}
    //   </TableBody>
    // </Table>

    <DataTable 
     data={doctors}
     columns={DoctorsColumns}
     isLoading={isLoading || isFetching || isRouteRefreshPending}
     emptyMessage='No doctor found.'
     sorting={{
      state:optimisticSortingState,
      onSortingChange: handleSortingChange,
     }}
     pagination={{
      state:optimisticPaginationState,
      onPaginationChange:handlePaginationChange,
     }}

     search={{
      initialValue:searchTermFromUrl,
      placeholder:'Search doctor by name email...',
      debounceMs:700,
      onDebouncedChange:handleDebouncedSearchChange,
     }}
     filters={{
      configs:filterConfigs,
      values:filterValuesForTable,
      onFilterChange:handleFilterChange,
      onClearAll:clearAllFilters,
     }}

     
    />
  )
}

export default DoctorsTable