import React, { Component } from 'react';
import axios from 'axios';
import ListRow from './ListRow';
import EditForm from './EditForm';

var CONTACTS = {
    "93ad6070-c92b-11e8-b02f-cbfa15db428b": {
        id: "93ad6070-c92b-11e8-b02f-cbfa15db428b",
        firstName: "Bilbo",
        lastName: "Baggins",
        age: 111,
        photo: "http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550"
    },
    "b3abd640-c92b-11e8-b02f-cbfa15db428b": {
        id: "b3abd640-c92b-11e8-b02f-cbfa15db428b",
        firstName: "Luke",
        lastName: "Skywalker",
        age: 20,
        photo: "N/A"
    }
};

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contacts: {},
            render: 0,
            oneContact: undefined
        }

        this.sortList = this.sortList.bind(this);
        this.sortContacts = this.sortContacts.bind(this);
        this.saveContact = this.saveContact.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.loadEditForm = this.loadEditForm.bind(this);
        this.loadHome = this.loadHome.bind(this);
    }

    componentDidMount() {
        axios.get('https://simple-contact-crud.herokuapp.com/contact')
        .then( response => {
            if (response.status && response.status === 200) {
                let res = response.data;
                this.setState( (prevState) => {
                    let contacts = prevState.contacts;
                    res.data.forEach( contact => {
                        contacts[contact.id] = contact;
                    });
                    return {contacts};
                });
            }
        })
        .catch( err => console.log(err) );
    }

    sortList(a, b) {
        if (a > b) {
            return 1;
        }
        if (a < b) {
            return -1;
        }
        return 0;
    }

    sortContacts() {
        let contactArr = Object.keys(this.state.contacts).map( (key) => this.state.contacts[key] );
        return contactArr.sort(this.sortList);
    }

    saveContact(listContact, isEdit) {
        if (!listContact.photo) {
            console.log('isi photo: ', listContact.photo)
        }
        const data = {
            firstName: listContact.firstName,
            lastName: listContact.lastName,
            age: listContact.age,
            photo: (listContact.photo) ? listContact.photo : 'N/A'
        };
        
        if (isEdit) {
            axios.put(`https://simple-contact-crud.herokuapp.com/contact/${listContact.id}`, data)
            .then( response => {
                if (response.status && response.status === 201) {
                    console.log("Contact edited.");
                }
            })
            .catch( err => console.log(err) );
        } else {
            axios.post('https://simple-contact-crud.herokuapp.com/contact', data)
            .then( response => {
                if (response.status && response.status === 201) {
                    console.log("Contact added.");
                }
            })
            .catch( err => console.log(err) );
        }

        this.setState((prevState) => {
            let contacts = prevState.contacts;
            contacts[listContact.id] = listContact;
            return { contacts };
        });
    }

    handleDelete(contactId) {
        const url = 'https://simple-contact-crud.herokuapp.com/contact/' + contactId;
        console.log(url)
        axios.delete(url)
        .then( response => {
            if (response.status && response.status >= 200 && response.status <= 300) {
                console.log("Contact deleted.");
            }
        })
        .catch( err => console.log(err) );

        this.setState((prevState) => {
          let contacts = prevState.contacts;
          delete contacts[contactId];
          return { contacts };
        });
    }

    loadEditForm(oneContact) {
        if (oneContact) {
            this.setState({
                render: 1,
                oneContact: oneContact
            })
        } else {
            this.setState({
                render: 1
            })
        }
    }

    loadHome() {
        this.setState({
            render: 0,
            oneContact: undefined
        })
    }

    render() {
        let rows = [];
        this.sortContacts().forEach( contact => {
            rows.push(
                <ListRow 
                    key = {contact.id}
                    contact = {contact}
                    goEdit = {this.loadEditForm}
                    onDelete = {this.handleDelete}
                />
            )
        });

        if (this.state.render === 0) {
            return (
                <div>
                    <header className="App-header">
                        <h2>Contact List</h2>
                    </header>
                    <div>
                        <button className='link-header' onClick={() => this.loadEditForm()}>Add</button>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Age</th>
                                <th>Photo</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                </div>
            );
        } else {
            return (
                <div>
                    <EditForm 
                        onSave = {this.saveContact}
                        goHome = {this.loadHome}
                        oneContact = {this.state.oneContact}
                    />
                </div>
            )
        }
    }
}

export default Home;