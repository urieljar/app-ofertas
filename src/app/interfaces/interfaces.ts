/* eslint-disable @typescript-eslint/naming-convention */
export interface Componente{
    icon: string;
    name: string;
    redirectTo: string;
}
export interface Usuario{
    name?: string;
    email?: string;
    password?: string;
}
export interface ProyectoInterface{
    nombre: string;
    descripcion: string;
}
export interface TarjetaInterface{
    categoria: string;
    subcategoria: string;
    nombre: string;
    rfc: string;
    telefono: string;
    contacto: string;
    tel_contacto: string;
    email_contacto: string;
}
