import { useState } from "react";
import { DragDropContext ,
  Droppable,
  Draggable,
  
} from '@hello-pangea/dnd'
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Grip,Pencil } from "lucide-react"

export const ChaptersList =({initialdata,onEdit,onReorder}) =>{
  
  const [chapters, setChapters] = useState(initialdata)
  
  const onDragEnd =(result)=>{
    const items = Array.from(chapters)
    const [reorderedItem] = items.splice(result.source.index,1)
    items.splice(result.destination.index,0,reorderedItem)
    
    const startIndex = Math.min(result.source.index,result.destination.index)
    const endIndex = Math.max(result.source.index,result.destination.index)
    
    const updatedChapters = items.slice(startIndex,endIndex+1)
    setChapters(items)
    console.log(updatedChapters)
    const bulkUpdateData = updatedChapters.map((chapter)=>({
      id:chapter.id,
      position: items.findIndex((item)=> item.id==chapter.id)
    }))
    
    onReorder(bulkUpdateData)
    
  }
  
  
  
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="chapters">
  {(provided) => (
    <div
    {...provided.droppableProps}
      ref={provided.innerRef}
      >
      {chapters.map((chapter,index)=>(
      <Draggable draggableId={chapter.id} index={index}>
        {(provided) => (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={cn("flex items-center gap-x-2 rounded-md mb-4 bg-slate-200 text-slate-600 text-sm border border-slate-200 ", chapter.isPublished && "bg-sky-100 border-sky-200 text-sky-700 ")}
    >
      <div className= { cn("px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md  transition ", chapter.isPublished && "border-r-sky-200 hoverbg-sky-200")} >
        <Grip className="h-5 w-5"/>
      </div>
      <p className="truncate">{chapter.title}</p>
      <div className="flex gap-x-2 items-center pr-2 ml-auto">
        {chapter.isFree&&(
        <Badge>Free</Badge>
        )}
        
         <Badge className={cn("bg-slate-400",chapter.isPublished && "bg-sky-700")}>{chapter.isPublished?"Published":"Draft"}</Badge>
        <Pencil className="w-4 h-4 cursor-pointer hover:opacity-40 transition" onClick={()=>{onEdit(chapter.id)}}/>
      </div>
    </div>
    
  )}
  
      </Draggable>
      ))}
      {provided.placeholder}
    </div>
  )}
</Droppable>
    </DragDropContext>
  )
}

 