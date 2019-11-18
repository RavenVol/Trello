import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const Task = ({ task, index, setTaskEditId, handleModalOpen}) => (
  <Draggable draggableId={`${task.id}`} index={index}>
    {(provided, snapshot) => (
      <div
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        onClick={() => { setTaskEditId(task.id); handleModalOpen('taskEdit')}}
        className="taskWindow__task task"
      >
        {snapshot.isDragging && console.log(snapshot.isDragging)}
        <h4 className="task__title">{task.title}</h4>
        <p className="task__description">{task.description}</p>
      </div>
    )}
  </Draggable>
);

export default Task;

