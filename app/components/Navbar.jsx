import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    render () {
        return (
            <nav className="navbar">
                <h2>Campus of Rock</h2>
                <div>
                    <Link className="btn btn-success" to="/students">ALL STUDENTS</Link>
                    <Link className="btn btn-success" to="/">ALL CAMPUSES</Link>
                    <Link className="btn btn-info" to="/students/add">+ STUDENT</Link>
                </div>


            </nav>
        )
    }
};
