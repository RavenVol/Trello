import React from 'react';
import Modal from './Modal';

import '../styles/css/create_form.css';

class EditTaskForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      title: "",
      description: "",
      complete: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        id: nextProps.task.id,
        title: nextProps.task.title,
        description: nextProps.task.description,
        complete: nextProps.task.complete
      });
    }
  }

  handleSubmit = () => {
    const { editTask, handleModalClose } = this.props;
    const { id, title, description, complete } = this.state;

    if (title.length > 0) {
      editTask(id, title, description, complete);
      handleModalClose('taskEdit');
      this.setState({id: null, title: '', description: '', complete: false, });
    }
  }

  handleTitleChange = (event) => {
    let title = event.target.value;

    title = title.length > 255
      ? this.state.title
      : title;

    this.setState({title});
  }

  handleDescriptionChange = (event) => {
    let description = event.target.value;

    description = description.length > 255
      ? this.state.description
      : description;

    this.setState({description});
  }

  handleCompleteChange = () => {
    this.setState(prevState => ({complete: !prevState.complete}));
  }

  render() {
    const { modalIsOpen, handleModalClose } = this.props;
    const { title, description, complete } = this.state;

    return (
      <Modal
        isOpen = {modalIsOpen}
        title = "Edit Task"
        handleClose = {() => handleModalClose('taskEdit')}
        handleSubmit = {() => this.handleSubmit()}
      >
        <input
          className="taskTitleInput"
          type="text"
          name="title"
          value={title}
          onChange={(event) => this.handleTitleChange(event)}
          placeholder="Enter task title"
        />
        <p className="taskTitleLength">{255 - title.length} symbols left</p>

        <input
          className="taskDescriptionInput"
          type="text"
          name="description"
          value={description}
          onChange={(event) => this.handleDescriptionChange(event)}
          placeholder="Enter task description"
          required
        />
        <p className="taskDescriptionLength">{255 - description.length} symbols left</p>

        <label>
          Complete:
          <input
            type="checkbox"
            name="taskComplete"
            checked={complete}
            onChange={() => this.handleCompleteChange()}
          />
        </label>
      </Modal>
    )
  }
}

export default EditTaskForm;

