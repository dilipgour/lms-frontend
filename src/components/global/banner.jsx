import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { TriangleAlert , CircleCheckBig} from 'lucide-react';


const bannerVariants = cva(
  "p-4 flex items-center w-full border text-center text-sm ",
  {
    variants: {
      variant: {
        warning: "bg-yellow-200/80 text-primary border-yellow-30",
        success: "bg-emerald-700 border-emerald-800 text-secondary",
      },
    },
    defaultVariants: {
      variant: "warning",
    },
  }
);

const iconMap ={
  warning : TriangleAlert,
  success : CircleCheckBig
}


export const Banner = ({ label , variant}) => {
  const Icon = iconMap[variant|| "warning"]
  return (
    <div className={cn(bannerVariants({variant}))}>
      <Icon className="mr-2 h-4 w-4"/>
      {label}
    </div>
  )
}

