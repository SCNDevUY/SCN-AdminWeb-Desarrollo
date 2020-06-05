
export class Usuario {

    constructor(
        public nombre: string,
        public telefono: string,
        public email: string,
        public password: string,
        public direccion?: string,
        public localidad?: string,
        public departamento?: string,
        public pais?: string,
        public img?: string,
        public imgNombre?: string,
        public role?: string,
        public google?: boolean,
        public _id?: string
    ) { }

}
