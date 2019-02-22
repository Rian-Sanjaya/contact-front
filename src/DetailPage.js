import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class DetailPage extends Component {
    render() {
        const {firstName, lastName, age, photo} = this.props.location.state;
        
        return (
            <div>
                <h2>Contact List</h2>
                <div>
                    <Link className='link-detail' to = '/'>Home</Link>
                </div>
                <ul>
                    <li><span className='detail-span detail-bold'>First Name</span><span className='detail-span detail-bold'>{firstName}</span></li>
                    <li><span className='detail-span'>Last Name</span><span className='detail-span'>{lastName}</span></li>
                    <li><span className='detail-span'>Age</span><span className='detail-span'>{age}</span></li>
                    <li><span className='detail-span'>Photo</span><span className='detail-span'><img className='cell-image' src={photo} alt="N/A"/></span></li>
                </ul>
            </div>
        )
    }
}

export default DetailPage;