
 export class Articulo {

    constructor(
        public codigoInterno: number,
        public nombre: string,
        public precio: number,
        public costo: number,
        public stock: number,
        public costoPesos?: number,
        public webservice?: boolean,
        public codigoProveedor?: string,
        public nuevo?: boolean,
        public descripcion?: string,
        public marca?: string,
        public categoria?: string,
        public subcategoria?: string[],
        public oferta?: boolean,
        public precioOferta?: number,
        public superOferta?: boolean,
        public precioSuperOferta?: number,
        public descripcionSuperOferta?: string,
        public activo?: boolean,
        public mailing?: boolean,
        public precioMailing?: number,
        public slideShow?: boolean,
        public inicio?: boolean,
        public imagenes?: string[],
        public img?: string,
        public imgNombre?: string,
        public imgSlideshow?: string,
        public imgNombreSlideshow?: string,
        public _id?: string
    ) { }

}

