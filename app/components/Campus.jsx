import React, { Component } from 'react';
import axios from 'axios';
import AddStudent from './AddStudent.jsx';
import { Link } from 'react-router-dom';

export default class Campus extends Component {

    constructor() {
        super();
        this.state = {
            campuses: {},
            editMode: false
        }
        this.removeStudent = this.removeStudent.bind(this);
        this.editMode = this.editMode.bind(this);
    }

    componentDidMount() {
        const campusId = this.props.match.params.campusId;

        axios.get(`/api/campuses/${campusId}`)
        .then(res => res.data)
        .then(campuses => this.setState({campuses}))
    }

    removeStudent(event) {
        const campusId = this.props.match.params.campusId;
        const studentId = event;
            axios.delete(`/api/students/${studentId}`)
            .then(() => axios.get(`/api/campuses/${campusId}`))
            .then(res => res.data)
            .then(campuses => this.setState({campuses}))
            .catch(console.error)
    }

    editMode() {
        this.componentDidMount();
        this.setState({editMode: !(this.state.editMode)});
    }

    render() {
        const students = this.state.campuses.students;
        return (
            <div>
                { this.state.editMode && <EditCollege editMode={this.editMode} campusName={this.state.campuses.name} campusId={this.state.campuses.id}/> }
                {!this.state.editMode &&
                <section className="container studentBody">
                    <h1>{this.state.campuses.name}</h1>
                    {students &&
                        <section className="table table-striped">
                            <tbody>
                        {students.map(student => (
                                <tr key={student.id}>
                                    <td><Link to={`/student/${student.id}`}>{student.name}</Link></td>
                                    <td>{student.email}</td>
                                    <td><button type="button" className="btn btn-danger" onClick={() => this.removeStudent(student.id)}>x</button></td>
                                </tr>
                            ))}
                            </tbody>
                     </section>
                    }
                </section>
                }

            </div>
        )
    }
}




