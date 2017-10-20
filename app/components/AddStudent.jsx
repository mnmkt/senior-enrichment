import React, { Component } from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';

export default class AddStudent extends Component {

    constructor() {
        super();
        this.state ={
            campuses: [],
            studentName: '',
            studentEmail: '',
            campusId: 1,
            redirectToHome: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios.get(`/api/campuses`)
        .then(res => res.data)
        .then(campuses => this.setState({campuses}))
        .catch(console.error)
    }

    handleChange(key) {
        return function(event) {
            let state = {};
            state[key] = event.target.value;
            this.setState(state);
        }.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.post(`/api/students`, {
            name: this.state.studentName,
            email: this.state.studentEmail,
            campusId: this.state.campusId})
        .then(res => res.data)
        .then(() => this.setState({redirectToHome: true}))
    }

    render() {
        const campuses = this.state.campuses;
        const redirect = this.state.redirectToHome;
        return (
            <section className="editBody">
                { redirect && <Redirect to={`/campus/${this.state.campusId}`} />}
                <div>
                <h3 className="col-xs-12">ENTER NEW STUDENT</h3>
                <form className="form-group" onSubmit={this.handleSubmit}>
                    <label for="inputName">Name</label>
                  <input
                    className="form-control"
                    placeholder="First Last"
                    onChange={this.handleChange('studentName')}
                  />
                    <label for="inputEmail">Email</label>
                  <input
                    className="form-control"
                    placeholder="xxx@xxx.com"
                    onChange={this.handleChange('studentEmail')}
                  />
                    <label for="inputEmail">Select Campus</label><br/>
                    {  campuses.length &&
                        <select onChange={this.handleChange('campusId')}>
                        {
                            campuses.map(campus => (
                                <option
                                    key={campus.id}
                                    value ={campus.id}>
                                    {campus.name}</option>
                            ))
                        }
                        </select>
                    }
                    <button
                    type="submit"
                    className="btn btn-primary">
                    SUBMIT
                  </button>
                </form>
              </div>
            </section>
        )
    }
}
