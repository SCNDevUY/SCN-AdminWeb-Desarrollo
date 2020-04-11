
export class Categoria {

    constructor(
        public nombre: string,
        public activo: boolean,
        public subcategorias?: string[],
        public _id?: string
    ) { }

}
