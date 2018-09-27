import React, { Component, Fragment } from 'react';
import { Map, TileLayer, ZoomControl, AttributionControl } from 'react-leaflet-universal';

import '../../node_modules/leaflet/dist/leaflet.css'
import './map.css'
import ThemeSwitcher from './theme-switcher';

const OS_API_KEY = 'NVUxtY5r8eA6eIfwrPTAGKrAAsoeI9E9';

/**
 * Map area
 */
class ColouringMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            theme: 'night',
            lat: 51.5245255,
            lng: -0.1338422,
            zoom: 16
        };
        this.handleClick = this.handleClick.bind(this);
        this.themeSwitch = this.themeSwitch.bind(this);
    }

    handleClick(e) {
        var lat = e.latlng.lat
        var lng = e.latlng.lng
        fetch(
            '/buildings.json?lat='+lat+'&lng='+lng
        ).then(
            (res) => res.json()
        ).then(function(data){
            if (data.geometry_id && data.id){
                this.props.selectBuilding(data);
                this.props.history.push(`/building/${data.id}.html`);
            } else {
                // should deselect but keep/return to expected colour theme
                // this.props.selectBuilding(undefined);
                // this.props.history.push(`/map/date_year.html`);
            }
        }.bind(this)).catch(
            (err) => console.error(err)
        )
    }

    themeSwitch(e) {
        e.preventDefault();
        const newTheme = (this.state.theme === 'light')? 'night' : 'light';
        this.setState({theme: newTheme});
    }

    render() {
        const position = [this.state.lat, this.state.lng];

        // baselayer
        const key = OS_API_KEY
        const tilematrixSet = 'EPSG:3857'
        const layer = (this.state.theme === 'light')? 'Light 3857' : 'Night 3857';
        const url = `https://api2.ordnancesurvey.co.uk/mapping_api/v1/service/zxy/${tilematrixSet}/${layer}/{z}/{x}/{y}.png?key=${key}`
        const attribution = 'Building attribute data is © Colouring London contributors. Maps contain OS data © Crown copyright: OS Maps baselayers and building outlines.'

        // colour-data tiles
        var data_tileset, is_building;
        if (this.props.match && this.props.match.params && this.props.match.params[1]) {
            data_tileset = this.props.match.params[1].replace("/", "")
            is_building = this.props.match.params[0] === 'building'
        } else {
            is_building = false;
            data_tileset = 'date_year';
        }
        const dataLayer = !is_building ? (
            <TileLayer key={data_tileset} url={`/tiles/${data_tileset}/{z}/{x}/{y}.png`} />
        ) : null;

        // highlight
        const geometry_id = (this.props.building) ? this.props.building.geometry_id : undefined;
        const highlight = `/tiles/highlight/{z}/{x}/{y}.png?highlight=${geometry_id}`
        const highlightLayer = is_building ? (
            <TileLayer key={this.props.building.id} url={highlight} />
        ) : null;

        return (
            <Fragment>
                <Map
                    center={position}
                    zoom={this.state.zoom}
                    minZoom={10}
                    maxZoom={18}
                    doubleClickZoom={false}
                    zoomControl={false}
                    attributionControl={false}
                    onClick={this.handleClick}
                    >
                    <TileLayer url={url} attribution={attribution} />
                    { dataLayer }
                    { highlightLayer }
                    <ZoomControl position="topright" />
                    <AttributionControl prefix="" />
                </Map>
                <ThemeSwitcher onSubmit={this.themeSwitch} currentTheme={this.state.theme} />
            </Fragment>
        );
    }
};

export default ColouringMap;