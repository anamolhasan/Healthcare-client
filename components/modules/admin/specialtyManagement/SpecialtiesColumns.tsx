import { ISpecialty } from '@/types/specialty.types'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'


export const specialtyColumns : ColumnDef<ISpecialty>[] = [
  {
    accessorKey:'title',
    header:'Title',
  },
  {
    accessorKey:'description',
    header:'Description',
    cell:({row}) => row.original.description || '-',
  },
  {
    accessorKey:'createdAt',
    header:'Created At',
    cell:({row}) => 
      format(new Date(row.original.createdAt), 'dd MMM yyyy')
  }
]