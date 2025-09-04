import Task from "./Task";
import {
  DndContext, // Wraps the drag-and-drop area
  closestCenter, // Helps find which item you're dropping over
  PointerSensor, // Detects mouse/touch events
  useSensor, // Creates one sensor (like pointer or keyboard)
  useSensors, // Allows combining multiple sensors
} from "@dnd-kit/core";

import {
  arrayMove, //it sort items when drag & drop happens , // Rearranges items in the array
  SortableContext, // Wraps sortable items and links to DnD
  useSortable, // Makes a single item draggable/sortable
  verticalListSortingStrategy, // direction of drag ,  // Tells layout is vertical
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

const Item = ({ id }) => {
  const {
    attributes, // Accessibility & data attributes for DnD
    listeners, // Event listeners like onMouseDown
    setNodeRef, // Ref to connect this DOM element with DnD
    transform, // Position shift while dragging
    transition, // Animation timing
    isDragging, // Boolean if this item is currently being dragged
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "10px",
    margin: "8px 0",
    background: isDragging ? "yellow" : "white",
    borderRadius: "6px",
    cursor: "grab",
    color: "black",
    width: "300px",
    opacity: isDragging ? 0.7 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {id}
    </div>
  );
};

// all tasks of individual column
interface TaskType {
  id: string;
  title: string;
}

interface SingleColumnTaskProps {
  tsk: TaskType[];
}


const SingleColumnTask: React.FC<SingleColumnTaskProps> = ({ tsk }) => {
  const [items, setItems] = useState(tsk.map((task) => task.id));
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 15, // drag only starts after moving 5px
      },
    })
  );
  return (
    <div className="p-3 mt-5">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter} // Finds nearest drop target
        onDragEnd={(event) => {
          const { active, over } = event;
          if (active.id !== over?.id) {
            const oldIndex = items.indexOf(active.id);
            const newIndex = items.indexOf(over.id);
            setItems(arrayMove(items, oldIndex, newIndex));
          }
        }}
      >
        <SortableContext
          items={tsk.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          {tsk.map((x, i) => (
            <div key={i}>
              <Task title={x.title} id={x.id} />
            </div>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default SingleColumnTask;
