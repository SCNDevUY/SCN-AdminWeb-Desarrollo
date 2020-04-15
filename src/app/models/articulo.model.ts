
 export class Articulo {

    constructor(
        public codigoInterno: number,
        public nombre: string,
        public precio: number,
        public costo: number,
        public stock: number,
        public nuevo?: boolean,
        public descripcion?: string,
        public marca?: string,
        public categoria?: string,
        public subcategoria?: string[],
        public oferta?: boolean,
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

