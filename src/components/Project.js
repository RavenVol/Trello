import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const Project = ({ project, index, history }) => {
  return (
    <Draggable draggableId={`${project.id}`} index={index}>
      {(provided) => {
        return (
        <div
          className="project"
          onClick={() => history.push(`/project-${project.id}`)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <h4 className="project__title">{project.title}</h4>
        </div>
      )}}
    </Draggable>
  )
}

export default Project;
