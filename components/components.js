// Write JavaScript here and press Ctrl+Enter to execute
class Button extends React.Component {
//to make state create a constructor
    /*constructor(props) {
        super(props);
      this.state = { counter : 9};
    }*/

//OR simply use state syntax

    handleClick =
        //this === component instance
        ()=>{this.props.onClickFunction(this.props.incrementValue)};
    render() {
        return (
            <button onClick={this.handleClick}>
            +{this.props.incrementValue}
            </button>
    );
    }
}

//Function Component
const Result = (props) => {
    return (
        <div>{props.counter}</div>
);
}

//Class Component [which uses render -- for state ]
class App extends React.Component {
    state = {counter: 0};	//move state at higher level to have access to all components in app

    incrementCounter = (incrementValue) => {
        this.setState((prevState) =>({
            counter: prevState.counter + incrementValue
        }));
    }
    render() {
        return (
            <div>
            <Button incrementValue={1} onClickFunction = {this.incrementCounter}/>
        <Button incrementValue={5} onClickFunction = {this.incrementCounter}/>
        <Button incrementValue={10} onClickFunction = {this.incrementCounter}/>
        <Button incrementValue={100} onClickFunction = {this.incrementCounter}/>
        <Result counter ={this.state.counter}/>
        </div>
    )
    }
}

ReactDOM.render(<App/>, mountNode);