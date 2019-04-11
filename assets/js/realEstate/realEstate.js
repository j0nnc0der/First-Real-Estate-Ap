import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.js';
import Filter from './Filter.js';
import Listings from './Listings.js';
import listingsData from './data/listingsData.js';

class App extends Component {
	constructor() {
		super();
		this.state = {
			name: 'Jon Real Estate Ap',
			listingsData,
			city: 'All',
			homeType: 'All',
			bedrooms: '0',
			min_price: 0,
			max_price: 10000000,
			min_floor_space: 0,
			max_floor_space: 61000,
			elavator: true,
			finished_basement: true,
			gym: false,
			swimming_pool: false,
			filteredData: listingsData,
			populateFormsData: ''

			// min_price:
		};

		this.change = this.change.bind(this);
		this.filteredData = this.filteredData.bind(this);
	}
	change(event) {
		var name = event.target.name;
		var value =
			event.target.type === 'checkbox'
				? event.target.checked
				: event.target.value;
		// This method can be used for everything
		this.setState(
			{
				[name]: value
			},
			() => {
				console.log(this.state);
				this.filteredData();
			}
		);
	}

	clickedBtn = () => {};
	async test() {}

	filteredData() {
		var newData = this.state.listingsData.filter(item => {
			return (
				item.price >= this.state.min_price &&
				item.price <= this.state.max_price &&
				item.floorSpace >= this.state.min_floor_space &&
				item.floorSpace <= this.state.max_floor_space &&
				item.rooms >= this.state.bedrooms
			);
		});

		//	if (this.state.city != 'All') {
		//		newData = newData.filter(item => {
		//			return item.city == this.state.city;
		//			});
		//		}

		//		if (this.state.homeType != "All'") {
		//			newData = newData.filter(item => {
		//				return item.homeType == this.state.homeType;
		//			});
		//		}

		if (this.state.city != 'All') {
			newData = newData.filter(item => {
				return item.city == this.state.city;
			});
		}

		if (this.state.homeType != 'All') {
			newData = newData.filter(item => {
				return item.homeType == this.state.homeType;
			});
		}

		this.setState({
			filteredData: newData
		});
	}
	populateForms() {
		// city
		var cities = this.state.listingsData.map(item => {
			return item.city;
		});
		cities = new Set(cities);
		cities = [...cities];

		// homeType
		var homeTypes = this.state.listingsData.map(item => {
			return item.city;
		});
		homeTypes = new Set(homeTypes);
		homeTypes = [...homeTypes];
		// Bedrooms
		var bedrooms = this.state.listingsData.map(item => {
			return item.rooms;
		});
		bedrooms = new Set(bedrooms);
		bedrooms = [...bedrooms];

		this.setState(
			{
				populateFormsData: {
					homeTypes,
					bedrooms,
					cities
				}
			},
			() => {
				console.log(this.state);
			}
		);
	}

	render() {
		//	console.log(this.state.listingsData);
		//	console.log(this.state);
		return (
			<div>
				{' '}
				<Header />{' '}
				<section id="content-area">
					<Filter
						change={this.change}
						globalState={this.state}
						populateAction={this.populateForms}
					/>
					<Listings listingsData={this.state.filteredData} />
				</section>
			</div>
		);
	}
}

const app = document.getElementById('app');

ReactDOM.render(<App />, app);
