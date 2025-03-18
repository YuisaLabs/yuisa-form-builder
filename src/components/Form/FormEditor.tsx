import { useRef } from 'react'
import { FormField } from '../../types/FormFieldType'
import { useDrag, useDrop } from 'react-dnd'

interface FormEditorProps {
  index: number
  field: FormField
  updateField: (id: string, updates: Partial<FormField>) => void
  removeField: (id: string) => void
  moveField: (dragIndex: number, hoverIndex: number) => void
}

export default function FormEditor({
  index,
  field,
  updateField,
  removeField,
  moveField
}: FormEditorProps) {
  const ref = useRef<HTMLDivElement>(null)

  const [{ isDragging }, drag] = useDrag({
    type: 'FIELD',
    item: { index },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  })

  const [, drop] = useDrop({
    accept: 'FIELD',
    hover(item: { index: number }) {
      if (!ref.current) {
        return
      }

      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }

      moveField(dragIndex, hoverIndex)
      item.index = hoverIndex
    }
  })

  drag(drop(ref))

  return (
    <div>FormEditor</div>
  )
}
