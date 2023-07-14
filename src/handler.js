'use strict';
const axios = require('axios');
const Responses = require('../libs/apiResponse');
const Dynamo = require('../libs/DynamoDB');

exports.films = async event => {

  console.log('Inicio films');

  try {
    /** Configuracion de metodo y endpoint a consumir **/
    const configuration = {
      method : 'GET',
      url: 'https://swapi.py4e.com/api/films/1/'
    }

    /** Uso de la libreria axios para el consumo del endpoint **/
    const res = await axios(configuration);
    const information = [res.data];
    
    /** Transformacion de campos internos del json **/
    const transformation = information.map( item => {
      return {
        titulo:  item.title,
        id_episodio:  item.episode_id,
        rastreo_de_apertura:  item.opening_crawl,
        director:  item.director,
        productor:  item.producer,
        fecha_lanzamiento:  item.release_date,
        caracteres:  item.characters,
        planetas:  item.planets,
        naves_estelares:  item.starships,
        vehiculos:  item.vehicles,
        especies:  item.species,
        creado:  item.created,
        editado:  item.edited,
        direccion:  item.url,
      }
    })
    
    /** Respuesta exitosa del servicio **/
    return Responses._200(transformation[0]);
  } catch (error) {    

    console.log(error);
    /** Captacion del mensaje de error **/
    const errorData = {
      success: false,
      message: error.message,
    }
    
    /** Respuesta de error del servicio **/
    return Responses._400(errorData);
  }
};

exports.planets = async event => {

  console.log('Inicio planets');

  try {
    /** Configuracion de metodo y endpoint a consumir **/
    const configuration = {
      method : 'GET',
      url: 'https://swapi.py4e.com/api/planets/1/'
    }

    /** Uso de la libreria axios para el consumo del endpoint **/
    const res = await axios(configuration);
    const information = [res.data];

    /** Transformacion de campos internos del json **/
    const transformation = information.map( item => {
      return {
        nombre:  item.name,
        periodo_de_rotacion:  item.rotation_period,
        periodo_orbital:  item.orbital_period,
        diametro:  item.diameter,
        clima:  item.climate,
        gravedad:  item.gravity,
        terreno:  item.terrain,
        superficie_del_agua:  item.surface_water,
        poblacion:  item.population,
        residentes:  item.residents,
        peliculas:  item.films,
        creado:  item.created,
        editado:  item.edited,
        direccion:  item.url,
      }
    })

    /** Respuesta exitosa del servicio **/
    return Responses._200(transformation[0]);
  } catch (error) {
    
    console.log(error);
    /** Captacion del mensaje de error **/
    const errorData = {
      success: false,
      message: error.message,
    }

    /** Respuesta de error del servicio **/
    return Responses._400(errorData);
  }
};

exports.vehicleAll = async event => {

    console.log('Inicio vehicleAll');
    const tableName = process.env.TABLE_VEHICLE;
  
    try {
      /** Configuracion de metodo y endpoint a consumir **/
     const vehicles = await Dynamo.scanAll(tableName);
     console.log('[vehicles]',vehicles);
     const res = {
        data : vehicles
     }
      /** Respuesta exitosa del servicio **/
      return Responses._200(res);
    } catch (error) {
      
      console.log(error);
      /** Captacion del mensaje de error **/
      const errorData = {
        success: false,
        message: error.message,
      }
  
      /** Respuesta de error del servicio **/
      return Responses._400(errorData);
    }
};

exports.vehicleID = async event => {

    console.log('Inicio vehicleID');
    const tableName = process.env.TABLE_VEHICLE;

    if (!event.body) {
        const errorData = {
            success: false,
            message: 'No se encontró informacion en el body',
        }
        return Responses._400(errorData);
    }

    const request = JSON.parse(event.body);

    if (!request.ID) {
        const errorData = {
            success: false,
            message: 'No se encontró el campo ID',
        }
        return Responses._400(errorData);
    }

    let ID = request.ID
  
    try {
      /** Configuracion de metodo y endpoint a consumir **/
     const vehicles = await Dynamo.get(ID, tableName);
     console.log('[vehicles]',vehicles);
      /** Respuesta exitosa del servicio **/
      return Responses._200(vehicles);
    } catch (error) {
      
      console.log(error);
      /** Captacion del mensaje de error **/
      const errorData = {
        success: false,
        message: error.message,
      }
  
      /** Respuesta de error del servicio **/
      return Responses._400(errorData);
    }
};

exports.vehicleRegister = async event => {

    console.log('Inicio vehicleRegister');
    const tableName = process.env.TABLE_VEHICLE;

    if (!event.body) {
        const errorData = {
            success: false,
            message: 'No se encontró informacion en el body',
        }
        return Responses._400(errorData);
    }

    const request = JSON.parse(event.body);

    if (!request.ID || !request.placa || !request.color || !request.VehicleStatus || !request.creationDate || !request.updateDate) {
        const errorData = {
            success: false,
            message: 'Los campos del body no se encuentran completos',
        }
        return Responses._400(errorData);
    }
  
    try {
      /** Configuracion de metodo y endpoint a consumir **/
     const vehicles = await Dynamo.write(request, tableName);
     console.log('[vehicles]',vehicles);
      /** Respuesta exitosa del servicio **/
      const sucessData = {
        success: true,
        message: 'Registro exitoso',
      }
      return Responses._200(sucessData);
    } catch (error) {
      
      console.log(error);
      /** Captacion del mensaje de error **/
      const errorData = {
        success: false,
        message: error.message,
      }
  
      /** Respuesta de error del servicio **/
      return Responses._400(errorData);
    }
};