import React from 'react';
import Modal from './Modal';

import '../styles/css/create_form.css';

class CreateBoardForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      boardTitle: '',
    }
  }

  handleSubmit = () => {
    const { addNewBoard, projectId, handleModalClose } = this.props;
    const { boardTitle } = this.state;

    if (boardTitle.length > 0) {
      addNewBoard(projectId, boardTitle);
      handleModalClose('board');
      this.setState({boardTitle: ''});
    }
  }

  handleBoardTitleChange = (event) => {
    let boardTitle = event.target.value;

    boardTitle = boardTitle.length > 255
      ? this.state.boardTitle
      : boardTitle;

    this.setState({boardTitle});
  }

  render() {
    const { modalIsOpen, handleModalClose } = this.props;
    const { boardTitle } = this.state;

    return (
      <Modal
        isOpen = {modalIsOpen}
        title = "New Board Creation"
        handleClose = {() => handleModalClose('board')}
        handleSubmit = {() => this.handleSubmit()}
      >
        <input
          className="boardTitleInput"
          type="text"
          name="title"
          value={boardTitle}
          onChange={(event) => this.handleBoardTitleChange(event)}
          required
        />
        <p className="boardTitleLength">{255 - boardTitle.length} symbols left</p>
      </Modal>
    )
  }
}

export default CreateBoardForm;
