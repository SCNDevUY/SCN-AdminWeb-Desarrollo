
export class Categoria {

    constructor(
        public nombre: string,
        public activo: boolean,
        public menuHorizontal: boolean,
        public menuVertical: boolean,
        public codigoNifelco?: string,
        public utilidadNifelco?: number,
        public subcategorias?: string[],
        public _id?: string
    ) { }

}
