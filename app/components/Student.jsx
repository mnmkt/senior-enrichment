import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Student extends Component {
    constructor() {
        super();
        this.state = {
            students : {}
        }
        this.removeStudent = this.removeStudent.bind(this);
    }

    componentDidMount() {
        axios.get(`/api/students`)
        .then(res => res.data)
        .then(students => this.setState({students}))
    }

    removeStudent(event) {
        const studentId = event;
            axios.delete(`/api/students/${studentId}`)
            .then(() => axios.get(`/api/students`))
            .then(res => res.data)
            .then(students => this.setState({students}))
            .catch(console.error)
    }

    render() {
        const students = this.state.students;
        return (
            <section className="studentBody mainTable">
                <h1>All Students</h1>
                <section className="table table-striped">

                    <tbody>
                { students.length && students.map(student => (
                        <tr key={student.id}>
                            <td><Link to={`/student/${student.id}`}>{student.name}</Link></td>
                            <td><img src={`${student.image}`}/></td>
                            <td>{student.email}</td>
                            <td>{student.campus.name}</td>
                            <td><button type="button" className="btn btn-danger" onClick={() => this.removeStudent(student.id)}>x</button></td>
                        </tr>
                    ))}
                </tbody>
            </section>
        </section>
        )
    }
}
