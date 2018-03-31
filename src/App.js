import React, {Component} from 'react';
import './App.css';


const url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            drink: {
                name: '',
                pic: '',
                ingredients: [],
                quantities: [],
                instructions: ''
            }
        }
    }

    componentDidMount() {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                const drink = data.drinks[0];
                console.log(drink);
                let ingredients = [];
                for (let i = 1; i < 15; i++) {
                    let ingredientKey = "strIngredient" + i;
                    let quantityKey = "strMeasure" + i;
                    if (drink[ingredientKey].length > 0) {
                        ingredients.push({ingredient: drink[ingredientKey], quantity: drink[quantityKey]});
                    }
                }
                this.setState({
                    drink: {
                        name: drink.strDrink,
                        ingredients: ingredients,
                        pic: drink.strDrinkThumb,
                        instructions: drink.strInstructions
                    }
                });

            })
    }

    render() {
        const drink = this.state.drink;
        return (
            <div className="App">
                <header className="App-header">
                    <img src={require("./assets/david-straight-341873-unsplash.jpg")} className="App-logo" alt="logo"/>
                </header>
                <section className="drinkBox">
                    <h1>{drink.name}</h1>
                    <img className="drinkPic" alt={drink.name} src={drink.pic}/>
                    <ul className="ingredientList">
                        {drink.ingredients.map((ingredient) =>
                            <li key={ingredient.ingredient}>{ingredient.ingredient}: {ingredient.quantity}</li>)}
                    </ul>
                    <p className="instructions">{drink.instructions}</p>
                </section>
            </div>
        );
    }
}

export default App;
