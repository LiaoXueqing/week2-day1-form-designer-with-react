import React, { Component } from "react";
import ReactDOM from "react-dom";
import {Button,Modal} from 'react-bootstrap';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "edit",
      items: []
    };
  }
  renderPreview = () => {
    console.log('render preview');
    this.setState({ status: "preview" });
  };
  renderEditor = () => {
    console.log('render preview');
    this.setState({ status: "edit" });
  };
  addFormItem = item => {
    console.log('add form item in app');
    this.setState({
      items: [...this.state.items, item]
    });
  };
  removeFormItem = index => {
    console.log('remove form item in app');
    const items = this.state.items;
    let result = [];
    for(let i=0;i<items.length;i++){
        if(i!==index){
            result.push(items[i]);
        }
    }
    this.setState({ items:result });
  };
  changeValue=()=>{
    console.log('change value');
  };
  
  render() {
    if (this.state.status === "edit") {
      return (
        <div className="myApp text-center">
          <Button bsStyle="primary" onClick={this.renderPreview}>
          Preview
          </Button>
          <AddItemDialogButton addItem={this.addFormItem} />
          <Editor
              items={this.state.items}
              removeFormItem={this.removeFormItem}
              changeItem={this.changeValue}
            />
          <div id="dialog" />
        </div>
      );
    }
    return (
    <div className="text-center">
    <button bsStyle="primary" onClick={this.renderEditor}>
      EDIT
    </button>
    <Previewer items={this.state.items} />
  </div>);
  }
}

class Previewer extends Component {
  render() {
    return (
      <div className="text-center">
          {this.props.items.map(item => (
            <div className="input-group mb-4">
            <input className="form-control mb-1" 
              type={item.type} 
                readOnly="true"
                value={item.value}
              />
            </div>
          ))}
      </div>
    );
  }
}

class Editor extends Component {
  removeItem = event => {
    console.log('remove item in Editor');
    this.props.removeFormItem(0);
  };

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-6">
          {this.props.items.map((item, index) => {
            return (
              <div className="input-group mb-4">
                <input className="form-control" type={item.type} />
                <button
                  className="btn btn-danger"
                  onClick={this.removeItem}
                  data-item-index={index}
                >
                  -
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}


class AddItemDialogButton extends Component{
  openDialog = () => {
    ReactDOM.render(
      <AddItemDialog addItem={this.props.addItem} />,
      document.getElementById("dialog")
    );
  };

  render() {
    return (
      <Button  bsStyle="primary" onClick={this.openDialog}>
        +
      </Button>
    );
  }
}
class AddItemDialog extends Component {
  constructor(props){
    super(props);
    this.state={
      type:'text',
    };
  }
  onTypeChange = e => {
    this.setState({
      type:e.currentTarget.value
    });
  }
  handleClose=()=> {
    ReactDOM.unmountComponentAtNode(document.getElementById("dialog"));
  }

  handleAdd=()=>{
    console.log('add form item');
    this.props.addItem({ type: this.state.type, value: "" });
  }

  render() {
    return (
      <div className="form-dialog text-center">
      <h1>Select Field Type</h1>
      <p>
        <input type="radio" name="dialogType" className="form-check-input" 
          checked={this.state.type === "text"}
          onChange={this.onTypeChange}
          value="date"/>Text Input
         </p>
         <p> 
           <input type="radio" name="dialogType" className="form-check-input" 
          checked={this.state.type === "date"}
          onChange={this.onTypeChange}
          value="date"/>DatePicker
          </p> 

          <Button bsStyle="primary" onClick={this.handleAdd}>Add</Button>
           
          <Button bsStyle="primary" onClick={this.handleClose}>Close</Button>
      </div>
    );
  }
}
export default App;
