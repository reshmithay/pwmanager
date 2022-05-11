import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './App.css'

const colorList = ['yellow', 'green', 'orange', 'brown', 'blue']

class App extends Component {
  state = {
    website: '',
    password: '',
    userName: '',
    isShow: false,
    updatedList: [],
    isTrue: false,
    searchInput: '',
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({userName: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  showPassword = event => {
    if (event.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  onClickDelete = id => {
    const {updatedList} = this.state
    const newList = updatedList.filter(each => each.id !== id)
    const newListEmptyOrNot = newList.length !== 0
    this.setState({updatedList: newList, isTrue: newListEmptyOrNot})
  }

  addCredentials = event => {
    event.preventDefault()
    const {website, userName, password} = this.state
    const initial = website.slice(0, 1).toUpperCase()
    const classNameValue = colorList[Math.floor(Math.random() * 5)]
    const newListValues = {
      id: uuidv4(),
      websiteName: website,
      username: userName,
      passworD: password,
      initialValue: initial,
      classValue: classNameValue,
    }
    console.log(initial)
    this.setState(prevState => ({
      updatedList: [...prevState.updatedList, newListValues],
      website: '',
      userName: '',
      password: '',
      isTrue: true,
      searchInput: '',
    }))
  }

  render() {
    const {
      website,
      password,
      userName,
      isShow,
      updatedList,
      searchInput,
    } = this.state
    let {isTrue} = this.state
    const searchResultsList = updatedList.filter(eachValue =>
      eachValue.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )
    if (searchResultsList.length !== 0) {
      isTrue = true
    } else {
      isTrue = false
    }
    return (
      <div className="app-container">
        <div className="bg-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app-logo"
          />
          <div className="section1">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
              className="pw-manager-image2"
            />
            <form
              className="add-credentials-form"
              onSubmit={this.addCredentials}
            >
              <h1 className="form-heading">Add New Password</h1>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="input-icon"
                />
                <input
                  type="text"
                  value={website}
                  onChange={this.onChangeWebsite}
                  className="input-element"
                  placeholder="Enter Website"
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="input-icon"
                />
                <input
                  type="text"
                  value={userName}
                  className="input-element"
                  onChange={this.onChangeUsername}
                  placeholder="Enter Username"
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="input-icon"
                />
                <input
                  type="password"
                  value={password}
                  className="input-element"
                  onChange={this.onChangePassword}
                  placeholder="Enter Password"
                />
              </div>
              <button type="submit" className="submit-button">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="pw-manager-image1"
            />
          </div>
          <div className="section2">
            <div className="header">
              <div className="password-count-container">
                <h1 className="password-text">Your Passwords</h1>
                <p className="password-count">{searchResultsList.length}</p>
              </div>
              <div className="search-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="input-icon"
                />
                <input
                  type="search"
                  className="input-element"
                  placeholder="Search"
                  value={searchInput}
                  onChange={this.onChangeSearchInput}
                />
              </div>
            </div>
            <hr className="line" />
            <div className="show-passwords-container">
              <input
                type="checkbox"
                id="checkBox"
                className="check-box"
                onChange={this.showPassword}
              />
              <label htmlFor="checkBox" className="show-passwords-text">
                Show Passwords
              </label>
            </div>
            {isTrue ? (
              <ul className="results-list">
                {searchResultsList.map(eachResult => (
                  <li
                    className="result-list-item"
                    id={eachResult.id}
                    key={eachResult.id}
                  >
                    <p className={`initial ${eachResult.classValue}`}>
                      {eachResult.initialValue}
                    </p>
                    <div className="list-item-details">
                      <p className="website-name">{eachResult.websiteName}</p>
                      <p className="user-name">{eachResult.username}</p>
                      {isShow ? (
                        <p className="details">{eachResult.passworD}</p>
                      ) : (
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                          alt="stars"
                          className="stars-image"
                        />
                      )}
                    </div>
                    <button
                      type="button"
                      className="delete-button"
                      onClick={() => this.onClickDelete(eachResult.id)}
                      testId="delete"
                    >
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                        className="del-image"
                        alt="delete"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="empty-state">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  className="empty-image"
                  alt="no passwords"
                />
                <p className="no-passwords">No Passwords</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default App
