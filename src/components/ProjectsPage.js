import React from 'react';
import Project from './Project';
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import '../styles/css/project_page.css';

const ProjectsPage = ({ projects, projectsOrder, changeProjectPosition, history, handleModalOpen }) => {
  const onDragEnd = ({ source, destination }) => {
    if (!destination || source.index === destination.index) return;

    changeProjectPosition(source.index, destination.index);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="projects-area" direction="horizontal">
        {(provided) => (
          <div className="projectsWindow"
          {...provided.droppableProps}
          ref={provided.innerRef}
          >
            {projectsOrder.map( (project, index) => (
              <Project
                key={projects[project].id}
                project={projects[project]}
                index={index}
                history={history}
              />
            ))}
            {provided.placeholder}

            <div
              className="project project--new"
              onClick={() => handleModalOpen('project')}
            >
              <h4 className="project__title">Create new project</h4>
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default ProjectsPage;

