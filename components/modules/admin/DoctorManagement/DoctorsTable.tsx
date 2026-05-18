'use client'

import { getDoctors } from '@/services/doctor.service'
import { useQuery } from '@tanstack/react-query'
import { IDoctor } from '@/types/doctor.types'
import DataTable from '@/components/shared/table/DataTable'
import { DoctorsColumns } from './DoctorsColumns'
import { useSearchParams } from 'next/navigation'



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
  } = useRow
    // const doctorColumns: ColumnDef<IDoctor>[] = [
    //      { accessorKey: "name", header: "Name" },
    // //   { accessorKey: "specialization", header: "Specialization" },
    //      { accessorKey: "experience", header: "Experience" },
    // //   { accessorKey: "rating", header: "Rating" },
    // ]

    const {data: doctorDataResponse, isLoading} = useQuery({
        queryKey:['doctors'],
        queryFn:getDoctors
    })

    const {data:doctors} = doctorDataResponse! || [];

    const handleView = (doctor: IDoctor) => {
      console.log('View Doctor', doctor)
    }

    const handleEdit = (doctor: IDoctor) => {
      console.log('Edit doctor', doctor);
    }

    const handleDelete = (doctor: IDoctor) => {
      console.log('Delete doctor', doctor)
    }
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
     isLoading={isLoading}
     emptyMessage='No doctor found.'
     actions={
      {
        onView:handleView,
        onDelete:handleDelete,
        onEdit:handleEdit
      }
     }
    />
  )
}

export default DoctorsTable