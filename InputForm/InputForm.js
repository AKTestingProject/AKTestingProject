import React from 'react';

class InputForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newUser: {},
            buttonDisabled: true,
            isInputingNewUser: false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        this.setState({
            newUser: this.newUserCreateFunc(this.props.data[0])
        })
    }

    newUserCreateFunc = (obj) => {
        const newObj = {}
        for (let key in obj) {
          if (typeof obj[key] === 'object') {
            newObj[key] = this.newUserCreateFunc(obj[key])
          } else {newObj[key] = ""}
        }
        return newObj
    }

    changeInputState = () => {
        this.state.isInputingNewUser === true
        ?   this.setState({
              isInputingNewUser: false
            })
        
        :   this.setState({
              isInputingNewUser: true
            })
    }

    handleInputChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        let newUserCopy = Object.assign({}, this.state.newUser)

        this.setState( {
            newUser : this.newUserCopyChanged(newUserCopy, name, value)
        })

        if (this.isFormReady(event, value, name)) { 
           if (this.state.buttonDisabled === true) {
                    this.setState({
                    buttonDisabled: false
                    });
            }
        } else {
           if (this.state.buttonDisabled === false) {
                    this.setState({
                    buttonDisabled: true
                    })
            } 
        }
    }

    newUserCopyChanged(obj, name, value) {   
        for (var key in obj) {
            if (key === name) { 
                obj[name] = value
            } else {
                if (typeof obj[key] === 'object') {
                    this.newUserCopyChanged(obj[key], name, value)
                }
        }
    }
        return obj
    }

    isFormReady(event, value, name) { 
        const obj = this.state.newUser;
        for (let key in obj) {
            if (key !== name && typeof key !== 'object') {
                if (obj[key].length === 0) {
                    return false    
                    } 
            } else {
                if (key === name && value.length === 0) {
                    return false
                }
            }
        }
        return true
    }

    sendData() {
        this.props.data.unshift(this.state.newUser);
        this.setState({
            newUser: this.newUserCreateFunc(this.props.data[0])
        })
    }

    createElementsFromObj = (obj) => {
        return Object.entries(obj).map(([key, value]) => {
            if (typeof value === 'object') { 
                return this.createElementsFromObj(value)
            } else {
                return(
                    <div key={key} className="form-group row">
                        <label htmlFor={key} className="col-sm-2 col-form-label">{key}</label>
                        <div className="col-sm-10">
                          <input
                            type="text"
                            name = {key}
                            className="form-control"
                            onChange={this.handleInputChange}
                            value={value}
                            />
                        </div>
                    </div>
    )}})}

    render() {
        return (
            <div>
                <div style={{display: 'flex' , justifyContent: 'space-between'}}>
                    <button 
                        className="btn btn-outline-secondary mb-3"
                        onClick={() => this.changeInputState()}
                    >
                        { this.state.isInputingNewUser === false
                          ? 'Open input form to add new user'
                          : 'Hide input form'
                        }
                    </button>
                    { this.state.isInputingNewUser === true &&
                        <button  
                            className="btn btn-outline-secondary mb-3"
                            disabled = {this.state.buttonDisabled}
                            onClick={() => {
                            this.sendData()
                            this.changeInputState()
                            }}
                        >Add new user
                        </button>
                    }
                </div>
                { this.state.isInputingNewUser === true  
                    ? <div>{this.createElementsFromObj(this.state.newUser)}</div>
                    : null 
                }
            </div>      
        )}
    }

export default InputForm;

