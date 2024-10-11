import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/format'

export const CourseEnrollButton = ({courseId,price}) => {
  return (
    <Button>
      Enroll for {formatPrice(price)}
    </Button>
  )
}