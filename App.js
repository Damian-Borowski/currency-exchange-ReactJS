const Cash = (props) => {
    const value = (props.cash / props.ratio * props.price).toFixed(2);
    return (
        <>
            <div>{props.title} {props.cash >= 0 ? value : ""}</div>
        </>
    )
}

class ExchangeCounter extends React.Component {
    state = {
        amount: "",
        product: "gas",
    }

    static defaultProps = {
        currencies: [
            {
                id: 0,
                name: 'Zloty',
                ratio: 1,
                title: 'Wartość w zlotych:',
            },
            {
                id: 1,
                name: 'Dollar',
                ratio: 3.6,
                title: 'Wartość w dolarach:',
            },
            {
                id: 2,
                name: 'Euro',
                ratio: 4.1,
                title: 'Wartość w euro:',
            },
            {
                id: 3,
                name: 'Pound',
                ratio: 3.6,
                title: 'Wartość w funtach:',
            },
        ],
        prices: {
            electricity: .51,
            gas: 4.40,
            oranges: 3.51,
        }
    }
    insertSuffix(select) {
        if (select === "electricity") return <p>kWh</p>
        else if (select === "gas") return <p>L</p>
        else if (select === "oranges") return <p>kg</p>
        else return <p>nie działa</p>
    }

    selectPrice(select) {
        return this.props.prices[select]
    }

    handleChange = e => {
        this.setState({
            amount: e.target.value
        })
    }

    handleSelect = e => {
        this.setState({
            product: e.target.value,
            amount: ""
        })
    }

    render() {
        const { amount, product } = this.state;
        const calculators = this.props.currencies.map(currency => (
            <Cash key={currency.id} ratio={currency.ratio} title={currency.title} cash={amount} price={this.selectPrice(product)} />
        ))
        return (
            <div className="app">
                <label>Wybierz produkt:
                    <select value={product} onChange={this.handleSelect}>
                        <option value="electricity">Prąd</option>
                        <option value="gas">Benzyna</option>
                        <option value="oranges">Pomarańcze</option>
                    </select>
                </label>
                <br />
                <label>
                    <input type="number" value={this.state.amount} onChange={this.handleChange} />
                    {this.insertSuffix(this.state.product)}
                </label>
                {calculators}
            </div>
        )
    }
}

ReactDOM.render(<ExchangeCounter />, document.getElementById("root"))