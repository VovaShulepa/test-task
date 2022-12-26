import React from 'react';
import css from './Card.module.css';
import ava from '../../images/ava.png';
import logo from '../../images/logo.png';
import picture from '../../images/pictures.png';

class Card extends React.Component {
  state = {
    followers: this.props.initialFollowers,
    isFollowing: false,
  };

  componentDidMount() {
    const parsedStatus = JSON.parse(localStorage.getItem('isFollowing'));

    if (parsedStatus) {
      this.setState({ isFollowing: parsedStatus });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.isFollowing !== this.state.isFollowing) {
      localStorage.setItem(
        'isFollowing',
        JSON.stringify(this.state.isFollowing)
      );
    }
  }

  onToggle = () => {
    this.setState(prevState => ({
      isFollowing: !prevState.isFollowing,
    }));
  };

  render() {
    return (
      <div className={css.Card}>
        <img src={logo} alt="Logo" className={css.Logo} />
        <img src={picture} alt="Background" className={css.Background} />
        <span className={css.Line}></span>
        <div className={css.Avatar}>
          <img src={ava} alt="Avatar" />
        </div>
        <ul>
          <li className={css.Tweets}>777 tweets</li>
          <li className={css.Followers}>
            {this.state.isFollowing
              ? (this.state.followers + 1).toLocaleString('en-US')
              : this.state.followers.toLocaleString('en-US')}{' '}
            followers
          </li>
        </ul>

        <div className={css.BtnContainer}>
          <button
            type="button"
            onClick={this.onToggle}
            className={this.state.isFollowing ? css.BtnActive : css.Btn}
          >
            {this.state.isFollowing ? 'Following' : 'Follow'}
          </button>
        </div>
      </div>
    );
  }
}

export default Card;
