//first decide what components to use
//start with simple and see where it takes use
//think about what you're building
//if users won't interact or is not top-level...make function component
const Card = (props)=> {
    return (
        <div style={{margin: 10}}>
            <img src={props.avatar_url} width="100"/>
            <div style={{display: 'inline-block', marginLeft: 10}}>
                <div style={{fontSize:'1.25em', fontWeight: 'bold'}}>{props.name}</div>
                <div>{props.company}</div>
            </div>
        </div>
    )
}
const CardList = (props) => {
    return (
        <div>
            {props.cards.map(card=><Card Card key={card.id}  {...card}/>)}
        </div>
    )
}

class Form extends React.Component {
    state ={ userName: ''}
    handleSubmit = (event) =>{
        event.preventDefault();
        axios.get(`https://api.github.com/users/${this.state.userName}`)
            .then(resp=> {
                this.props.onSubmit(resp.data);
                this.setState({userName: ''})
            });
    };

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text"
                       value={this.state.userName}
                       onChange={(event)=> this.setState({userName: event.target.value})}
                       placeholder="Github username" required/>
                <button type="submit">Add card</button>
            </form>
        );
    }
}

class App extends React.Component {
    state = {
        cards: [
            {
                "name": "Tom Preston-Werner",
                "avatar_url": "https://avatars0.githubusercontent.com/u/1?v=4",
                "company": null
            },
            {
                "name": "PJ Hyett",
                "avatar_url": "https://avatars0.githubusercontent.com/u/3?v=4",
                "company": "GitHub, Inc."
            },
            {
                "name": "Chris Wanstrath",
                "avatar_url": "https://avatars0.githubusercontent.com/u/2?v=4",
                "company": "@github "
            }
        ]
    }

    addNewCard = (cardInfo) => {
        this.setState(prevState =>({
            cards: prevState.cards.concat(cardInfo)
        }));
    };

    render() {
        return (
            <div>
                <Form onSubmit={this.addNewCard}/>
                <CardList cards={this.state.cards} />
            </div>
        )
    }
}

ReactDOM.render(<App />, mountNode);
