import React from 'react';
import Task from './Task';
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import '../styles/css/boards_page.css';

const BoardsPage = ({ projectTitle, boards, boardsOrder, tasks,
  handleModalOpen, setTaskCreateBoardId, changeTaskPosition, setTaskEditId }) => {

  const onDragEnd = ({ source, destination }) => {

    if (!destination
      || (source.index === destination.index
      && source.droppableId === destination.droppableId)) return;

    changeTaskPosition(source.index, destination.index, source.droppableId, destination.droppableId);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="boardsWindow">
        <h2 className="boardsWindow__header">{`Project:  ${projectTitle}`}</h2>

        <div className="boardsWindow__boards">
          {boardsOrder.map( boardId => (
            <Droppable key={boards[boardId].id} droppableId={`${boards[boardId].id}`}>
              {(provided) => (
                <div
                  key={boards[boardId].id}
                  className="board"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <h3 className="board__title">{boards[boardId].title}</h3>

                  <div className="board__taskWindow taskWindow">
                    {boards[boardId].tasksOrder.map((taskId, index) => (
                      <Task
                        key={tasks[`${taskId}`].id}
                        task={tasks[`${taskId}`]}
                        index={index}
                        setTaskEditId={setTaskEditId}
                        handleModalOpen={handleModalOpen}
                      />
                    ))}
                    {provided.placeholder}
                  </div>

                  <p
                    className="board__newtask"
                    onClick={() => {setTaskCreateBoardId(boards[boardId].id); handleModalOpen('task')}}
                  >
                    + add new task
                  </p>
                </div>
              )}
            </Droppable>
          ))}
          <div
            className="board board--new"
            onClick={() => handleModalOpen('board')}
          >
            <h4 className="board__title">Create new board</h4>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}

export default BoardsPage;
