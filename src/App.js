import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';


const url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            drink: []
        }
    }

    componentDidMount() {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                const drink = data.drinks[0];
                this.setState({drink: drink});
                console.log(drink);
            })
    }

    render() {
        const drink = this.state.drink;
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <section>
                    <h1>{drink.strDrink}</h1>
                    <img className="drinkPic" alt={drink.strDrink} src={drink.strDrinkThumb}/>

                </section>
            </div>
        );
    }
}

export default App;
