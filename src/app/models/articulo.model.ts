
 export class Articulo {

    constructor(
        public codigoInterno: number,
        public nombre: string,
        public precio: number,
        public costo: number,
        public usuario: string,
        public marca: string,
        public categoria: string,
        public subcategoria: string[],
        public descripcion: string,
        public nuevo: boolean,
        public oferta?: boolean,
        public stock?: number,
        public precioOferta?: number,
        public fechaIniPrecioOferta?: string,
        public fechaFinPrecioOferta?: string,
        public activo?: boolean,
        public mailing?: boolean,
        public slideShow?: boolean,
        public img?: string[],
        public imgNombre?: string[],
        public _id?: string
    ) { }

}

