import React from 'react';
import Modal from './Modal';

import '../styles/css/create_form.css';

class CreateProjectForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projectTitle: '',
    }
  }

  handleSubmit = () => {
    if (this.state.projectTitle.length > 0) {
      this.props.addNewProject(this.state.projectTitle);
      this.props.handleModalClose('project');
      this.setState({projectTitle: ''});
    }
  }

  handleProjectTitleChange = (event) => {
    let projectTitle = event.target.value;

    projectTitle = projectTitle.length > 255
      ? this.state.projectTitle
      : projectTitle;

    this.setState({projectTitle});
  }

  render() {
    return (
      <Modal
        isOpen = {this.props.modalIsOpen}
        title = "New Procect Creation"
        handleClose = {() => this.props.handleModalClose('project')}
        handleSubmit = {() => this.handleSubmit()}
      >
        <input
          className="projectTitleInput"
          type="text"
          name="title"
          value={this.state.projectTitle}
          onChange={(event) => this.handleProjectTitleChange(event)}
          required
        />
        <p className="projectTitleLength">{255 - this.state.projectTitle.length} symbols left</p>
      </Modal>
    )
  }
}

export default CreateProjectForm;

