import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
// import './ListRow.css';

class ListRow extends Component {
    constructor(props) {
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
        this.goToEdit = this.goToEdit.bind(this);
    }

    handleDelete(e) {
        this.props.onDelete(this.props.contact.id);
        e.preventDefault();
    }

    goToEdit() {
        this.props.goEdit(this.props.contact);
        return <Redirect to = '/' />
    }

    render() {
        return (
            <tr>
                <td>
                    <Link 
                        to = { 
                            {pathname: '/detail', 
                            state: {firstName: this.props.contact.firstName, lastName: this.props.contact.lastName, age: this.props.contact.age, photo: this.props.contact.photo}
                            } 
                        }
                    >{this.props.contact.firstName}
                    </Link>
                </td>
                <td>
                    <Link to = { 
                            {pathname: '/detail', 
                            state: {firstName: this.props.contact.firstName, lastName: this.props.contact.lastName, age: this.props.contact.age, photo: this.props.contact.photo}
                            } 
                        }>{this.props.contact.lastName}
                    </Link>
                </td>
                <td>
                    <Link to = { 
                            {pathname: '/detail', 
                            state: {firstName: this.props.contact.firstName, lastName: this.props.contact.lastName, age: this.props.contact.age, photo: this.props.contact.photo}
                            } 
                        }>{this.props.contact.age}
                    </Link>
                </td>
                <td>
                    <Link to = { 
                            {pathname: '/detail', 
                            state: {firstName: this.props.contact.firstName, lastName: this.props.contact.lastName, age: this.props.contact.age, photo: this.props.contact.photo}
                            } 
                        }
                    ><img className="cell-image" src={this.props.contact.photo} alt="N/A"></img> 
                    </Link>
                </td>
                <td>
                    <button onClick={this.goToEdit}>Edit</button>
                    <button onClick={this.handleDelete}>Delete</button>
                </td>
            </tr>
        )
    }
}

export default ListRow;