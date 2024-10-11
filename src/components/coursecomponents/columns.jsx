import {
  createColumnHelper
} from '@tanstack/react-table'
import {formatPrice } from "@/lib/format"
const columnHelper = createColumnHelper()
import { ArrowUpDown,Pencil,Ellipsis } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
 import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link } from "react-router-dom"

 
export const columns = [
  columnHelper.accessor('title', {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  
  columnHelper.accessor('price', {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"))
       return formatPrice(amount)
    },
    footer: info => info.column.id,
  }),
  
  columnHelper.accessor('isPublished', {
    header: 'Published',
    cell : ({row})=>{
      const published = row.getValue('isPublished')||false
      return(
        <Badge className={cn("bg-slate-600",published&&"bg-sky-700")}>
          {published?"Published":"Draft"}
        </Badge>
        )
    },
    footer: info => info.column.id,
  }),
  
  columnHelper.accessor('actions', {
    
    cell: ({ row }) =>{
      const { id } = row.original
      return (
        <DropdownMenu>
  <DropdownMenuTrigger asChild = {true}>
    <Button variant="ghost"  className="p-0">
      <Ellipsis className="h-4 w-4" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end" className="bg-white">
    <Link to={`/teacher/courses/${id}`}>
    <DropdownMenuItem>
       <Pencil className="h-4 w-4 mr-2"/>
       Edit
    </DropdownMenuItem>
    </Link>
    
  </DropdownMenuContent>
</DropdownMenu>

        )
    },
    footer: info => info.column.id,
  }),
]