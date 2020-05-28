
export class Usuario {

    constructor(
        public nombre: string,
        public telefono: string,
        public email: string,
        public password: string,
        public img?: string,
        public imgNombre?: string,
        public role?: string,
        public google?: boolean,
        public _id?: string
    ) { }

}
