import React from 'react';

import '../styles/css/top_menu.css';

const MenuTop = () => (
  <nav className="topMenu">
    <div className="topMenu__topLeftMenu topLeftMenu">
      <a href="/" className="topLeftMenu__btn">
        H
      </a>
      <div className="topLeftMenu__btn topLeftMenu__btn--boardsLink">
        &#xE90A;
      </div>
      <div className="topLeftMenu__btn">
        <input type="search" className="topLeftMenu__btn--searchInput"></input>
        Q
      </div>
    </div>

    <div className="topMenu__logo">
      Trial Trello
    </div>

    <div className="topMenu__topRightMenu topRightMenu">
      <div className="topRightMenu__btn">
        +
      </div>
      <div className="topRightMenu__btn">
        i
      </div>
      <div className="topRightMenu__btn">
        R
      </div>
    </div>
  </nav>
)

export default MenuTop;


