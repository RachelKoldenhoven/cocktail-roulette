import React, {Component} from 'react';
import './styles/App.css';
import './styles/index.css';
import './styles/normalize.css';
import './styles/skeleton.css';

const headerImg = require('./assets/david-straight-341873-unsplash.jpg');
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
        this.getDrink();
    }

    async getDrink() {
        try {
            const res = await fetch(url);
            const data = await res.json();
            const drink = data.drinks[0];
            let ingredients = [];
            for (let i = 1; i < 15; i++) {
                let ingredientKey = "strIngredient" + i;
                let quantityKey = "strMeasure" + i;
                if (drink[ingredientKey] != null && drink[ingredientKey].length > 0) {
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

        } catch (er) {
            console.error(er);
        }
    };

    render() {
        const drink = this.state.drink;
        return (
            <div className="App">
                <header className="App-header">
                    <img src={headerImg} className="App-logo" alt="David Straight on Unsplash"
                         title="Photo by David Straight on Unsplash"/>
                </header>
                <section className="drinkBox">
                    <h1>{drink.name}</h1>
                    <img className="drinkPic" alt={drink.name} src={drink.pic}/>
                    <ul className="ingredientList">
                        {drink.ingredients.map((ingredient) =>
                            <li key={ingredient.ingredient}>
                                <span>{ingredient.ingredient}</span>
                                <span>{(ingredient.quantity).trim() ? (" : " + ingredient.quantity) : null}</span>
                            </li>)}
                    </ul>
                    <p className="instructions">{drink.instructions}</p>
                    <button onClick={() => this.getDrink()}>Show Me Another</button>
                </section>
            </div>
        );
    }
}

export default App;
