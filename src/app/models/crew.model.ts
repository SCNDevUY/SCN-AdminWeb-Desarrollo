export class Crew {

    constructor(
        public nombre: string,
        public activo: boolean,
        public cargo?: string,
        public descripcion?: string,
        public orden?: number,
        public img?: string[],
        public imgNombre?: string[],
        public _id?: string
    ) { }

}
