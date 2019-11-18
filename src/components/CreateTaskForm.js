import React from 'react';
import Modal from './Modal';

import '../styles/css/create_form.css';

class CreateTaskForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      taskTitle: '',
      taskDescription: '',
    }
  }

  handleSubmit = () => {
    const { addNewTask, handleModalClose } = this.props;
    const { taskTitle, taskDescription } = this.state;

    if (taskTitle.length > 0) {
      addNewTask(taskTitle, taskDescription);
      handleModalClose('task');
      this.setState({taskTitle: '', taskDescription: ''});
    }
  }

  handleTaskTitleChange = (event) => {
    let taskTitle = event.target.value;

    taskTitle = taskTitle.length > 255
      ? this.state.taskTitle
      : taskTitle;

    this.setState({taskTitle});
  }

  handleTaskDescriptionChange = (event) => {
    let taskDescription = event.target.value;

    taskDescription = taskDescription.length > 255
      ? this.state.taskDescription
      : taskDescription;

    this.setState({taskDescription});
  }

  render() {
    const { modalIsOpen, handleModalClose } = this.props;
    const { taskTitle, taskDescription } = this.state;

    return (
      <Modal
        isOpen = {modalIsOpen}
        title = "New Task Creation"
        handleClose = {() => handleModalClose('task')}
        handleSubmit = {() => this.handleSubmit()}
      >
        <input
          className="taskTitleInput"
          type="text"
          name="title"
          value={taskTitle}
          onChange={(event) => this.handleTaskTitleChange(event)}
          placeholder="Enter task title"
        />
        <p className="taskTitleLength">{255 - taskTitle.length} symbols left</p>

        <input
          className="taskDescriptionInput"
          type="text"
          name="description"
          value={taskDescription}
          onChange={(event) => this.handleTaskDescriptionChange(event)}
          placeholder="Enter task description"
          required
        />
        <p className="taskDescriptionLength">{255 - taskDescription.length} symbols left</p>
      </Modal>
    )
  }
}

export default CreateTaskForm;

