import React, { Component } from 'react';
import axios from 'axios';

export default class AddCampus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputName: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            inputName: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        const name = this.state.inputName;
        this.props.addCampus(name);
        this.setState({inputName: ''})
    }

    render() {
        return (
            <div>
              <form
                  className="form-group formBottom"
                  onSubmit={this.handleSubmit}>
                    <label for="inputName" className="formName"></label>

                  <input
                    value={this.state.inputName}
                    className="form-control"
                    placeholder="Enter Campus Name"
                    onChange={this.handleChange}
                  />
                  <button
                  type="submit"
                  className="btn btn-info">
                  + CAMPUS
                </button>
                </form>
            </div>
        )
    }
}
