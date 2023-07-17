export interface SuccessSchema {
    success: boolean,
    message: string
}

export interface ErrorSchema {
    success: false,
    message: string
}

export interface VehicleIDRequest{
    ID: number
}

export interface VehicleDataRequest {
    ID: number,
    placa: string,
    color: string,
    VehicleStatus: string,
    creationDate: string,
    updateDate: string,
}

export interface VehicleDataResponse {
    data: VehicleDataRequest[]
}

export interface FilmDataResponse {
    titulo: string
    id_episodio: string
    rastreo_de_apertura: string
    director: string
    fecha_lanzamiento: string
    caracteres: string
    planetas: string
    naves_estelares: string
    vehiculos: string
    especies: string
    creado: string
    editado: string
    direccion: string
}

export interface PlanetDataResponse{
    nombre: string
    periodo_de_rotacion: string
    periodo_orbital: string
    diametro: string
    clima: string
    gravedad: string
    terreno: string
    superficie_del_agua: string
    poblacion: string
    especies: string
    creado: string
    editado: string
    direccion: string
}