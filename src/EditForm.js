import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

const RESET_VALUES = {id: '', firstName: '', lastName: '', age: 0, photo: ''};

class EditForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contact: Object.assign({}, RESET_VALUES),
            isEdit: false,
            error: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.goToHome = this.goToHome.bind(this);
    }

    componentDidMount() {
        if (this.props.oneContact) {
            this.setState({
                contact: this.props.oneContact,
                isEdit: true
            })
        }
    }

    handleChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState((prevState) => {
          prevState.contact[name] = value;
          return { contact: prevState.contact };
        });
    }

    handleSave(e) {
        if (this.state.error || this.state.contact.firstName === '' || this.state.contact.lastName === '' || this.state.contact.age < 1) {
            alert('First Name, Last Name cannot empty, and age must not be less than one');
            this.setState({
                error: 'First Name, Last Name cannot empty, and age must not be less than one'
            })
            return;
        } else {
            if (this.state.isEdit) {
                if (this.state.contact.age > 100) {
                    alert('Age must not be more than 100');
                    this.setState({
                        error: 'Age must not be more than 100'
                    })
                    return;
                }
            }
        }

        this.props.onSave(this.state.contact, this.state.isEdit);
        this.setState({
          contact: Object.assign({}, RESET_VALUES),
          error: ''
        });

        e.preventDefault();
    }

    goToHome() {
        this.props.goHome();
        return <Redirect to = '/' />
    }

    render() {
        return (
            <div>
                <h2>Contact List</h2>
                <button className='link-header' onClick={this.goToHome}>Home</button>
                <form>
                    <label>
                        <span className='form-label'>First Name</span>
                        <input type='text' name='firstName' placeholder='First Name' value={this.state.contact.firstName} onChange={this.handleChange} required/><br/>
                    </label>
                    <label>
                        <span className='form-label'>Last Name</span>
                        <input type='text' name='lastName' placeholder='Last Name' value={this.state.contact.lastName} onChange={this.handleChange} required/><br/>
                    </label>
                    <label>
                        <span className='form-label'>Age</span>
                        <input type='number' name='age' placeholder='Age' value={this.state.contact.age} onChange={this.handleChange} required/><br/>
                    </label>
                    <label>
                        <span className='form-label'>Photo</span>
                        <input type='text' name='photo' placeholder='Photo URL' size='50' value={this.state.contact.photo} onChange={this.handleChange} required/><br/>
                    </label>
                    <input className="save-form" type="submit" value="Save" onClick={this.handleSave}/>
                </form>
            </div>
        )
    }
}

export default EditForm;