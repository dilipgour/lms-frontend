import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3 my-4 items-center px-0">
      <Skeleton className="h-[150px] w-full  rounded-xl" />
      </div>
  )
}
