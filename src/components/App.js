import React from 'react';
import { Switch, Route } from 'react-router-dom';

import MenuTop from './MenuTop';
import ProjectsPage from './ProjectsPage';
import BoardsPage from './BoardsPage';
import CreateProjectForm from './CreateProjectForm';
import CreateBoardForm from './CreateBoardForm';
import CreateTaskForm from './CreateTaskForm';
import EditTaskForm from './EditTaskForm';

import { calculateNewId } from '../functions/functions';

import '../styles/css/reset.css';
import '../styles/css/app.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = localStorage.getItem('trello-clone')
    ? {
      projects: {...JSON.parse(localStorage.getItem('trello-clone')).projects},
      boards: {...JSON.parse(localStorage.getItem('trello-clone')).boards},
      tasks: {...JSON.parse(localStorage.getItem('trello-clone')).tasks},
      projectsOrder: [...JSON.parse(localStorage.getItem('trello-clone')).projectsOrder],
      projectCreateFormIsOpen: false,
      boardCreateFormIsOpen: false,
      taskCreateFormIsOpen: false,
      taskEditFormIsOpen: false,
      taskCreateBoardId: null,
      taskEditId: null,
    }
    : {
      projects: {},
      boards: {},
      tasks: {},
      projectsOrder: [],
      projectCreateFormIsOpen: false,
      boardCreateFormIsOpen: false,
      taskCreateFormIsOpen: false,
      taskEditFormIsOpen: false,
      taskCreateBoardId: null,
      taskEditId: null,
    }
  }

  componentDidUpdate = () => {
    this.saveState();
  }

  saveState = () => {
    const state = JSON.stringify({
      projects: {...this.state.projects},
      boards: {...this.state.boards},
      tasks: {...this.state.tasks},
      projectsOrder: [...this.state.projectsOrder],
    });
    localStorage.setItem('trello-clone', state);
  }

  setTaskCreateBoardId = (id) => {
    this.setState({taskCreateBoardId: id});
  }

  setTaskEditId = (id) => {
    this.setState({taskEditId: id});
  }

  handleModalOpen = (formType) => {
    switch (formType) {
      case 'project': this.setState({projectCreateFormIsOpen: true}); break;
      case 'board': this.setState({boardCreateFormIsOpen: true}); break;
      case 'task': this.setState({taskCreateFormIsOpen: true}); break;
      case 'taskEdit': this.setState({taskEditFormIsOpen: true}); break;
      default: console.warn('Incorrect form type in handleModalOpen');
    }
  }

  handleModalClose = (formType) => {
    switch (formType) {
      case 'project': this.setState({projectCreateFormIsOpen: false}); break;
      case 'board': this.setState({boardCreateFormIsOpen: false}); break;
      case 'task': this.setState({taskCreateFormIsOpen: false}); break;
      case 'taskEdit': this.setState({taskEditFormIsOpen: false}); break;
      default: console.warn('Incorrect form type in handleModalClose');
    }
  }

  addNewProject = (title) => {
    const { projects, projectsOrder } = this.state;
    const newProjectId = calculateNewId(projects);

    projects[`${newProjectId}`] = {
      id: newProjectId,
      title,
      boardsOrder: [],
    }

    projectsOrder.unshift(`${newProjectId}`);

    this.setState({ projects, projectsOrder });
  }

  changeProjectPosition = (oldPosition, newPosition) => {
    const { projectsOrder } = this.state;
    const project = projectsOrder.splice(oldPosition, 1);
    projectsOrder.splice(newPosition, 0, project);

    this.setState({ projectsOrder });
  }

  addNewBoard = (projectId, title) => {
    const { projects, boards} = this.state;
    const newBoardId = calculateNewId(boards);

    projects[`${projectId}`].boardsOrder.push(`${newBoardId}`);
    boards[`${newBoardId}`] = {
      id: newBoardId,
      title,
      tasksOrder: [],
    }

    this.setState({ boards, projects });
  }

  addNewTask = (title, description) => {
    const boardId = this.state.taskCreateBoardId;
    const {boards, tasks} = this.state;
    const newTaskId = calculateNewId(tasks);

    boards[boardId].tasksOrder.push(`${newTaskId}`);
    tasks[`${newTaskId}`] = {
      id: newTaskId,
      title,
      description,
      complete: false,
    };

    this.setState({ boards, tasks });
  }

  editTask = (id, title, description, complete) => {
    const { tasks } = this.state;

    tasks[`${id}`].title = title;
    tasks[`${id}`].description = description;
    tasks[`${id}`].complete = complete;

    this.setState({tasks});
  }

  changeTaskPosition = (sIndex, dIndex, sDropId, dDropId) => {
    const { boards } = this.state;

    boards[dDropId].tasksOrder.splice(dIndex, 0, boards[sDropId].tasksOrder.splice(sIndex, 1));

    this.saveState();
  }

  render() {
    const {projects, projectsOrder, boards, tasks} = this.state;

    return (
      <>
        <header>
          <MenuTop />
        </header>

        <main>
          <Switch>
            <Route path='/' exact
              render={({ history }) => (
                <>
                  <ProjectsPage
                    projects={projects}
                    projectsOrder={projectsOrder}
                    history={history}
                    handleModalOpen={this.handleModalOpen}
                    changeProjectPosition={this.changeProjectPosition}
                  />
                  <CreateProjectForm
                    addNewProject={this.addNewProject}
                    modalIsOpen={this.state.projectCreateFormIsOpen}
                    handleModalClose={this.handleModalClose}
                  />
                </>
              )}
            />

            <Route path='/project-:projectId'
              render={({ match }) => {
                const projectId = match.params.projectId;
                return (
                  <>
                    <BoardsPage
                      projectTitle={projects[projectId].title}
                      boards={boards}
                      boardsOrder={projects[projectId].boardsOrder}
                      tasks={tasks}
                      handleModalOpen={this.handleModalOpen}
                      setTaskCreateBoardId={this.setTaskCreateBoardId}
                      changeTaskPosition={this.changeTaskPosition}
                      setTaskEditId={this.setTaskEditId}
                    />

                    <CreateBoardForm
                      projectId={projectId}
                      addNewBoard={this.addNewBoard}
                      modalIsOpen={this.state.boardCreateFormIsOpen}
                      handleModalClose={this.handleModalClose}
                    />

                    <CreateTaskForm
                      addNewTask={this.addNewTask}
                      modalIsOpen={this.state.taskCreateFormIsOpen}
                      handleModalClose={this.handleModalClose}
                    />

                    <EditTaskForm
                      task={tasks[this.state.taskEditId]}
                      editTask={this.editTask}
                      handleModalClose={this.handleModalClose}
                      modalIsOpen={this.state.taskEditFormIsOpen}
                    />
                  </>
                );
              }}
            />
          </Switch>
        </main>

        <footer>

        </footer>
      </>
    );
  }
}

export default App;
