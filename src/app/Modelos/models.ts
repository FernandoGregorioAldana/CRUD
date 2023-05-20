//las interfaces ayudan a definir la estructura de métodos y propiedades, no su implementación.
//esta interface define la estructura de como se guardaran los datos al registrar un nuevo usuario
export interface Datos {
    id: string;
    nombre?: string;
    apellido?: string;
    email: string;
    tel?: string;
    image?: string;
    password: string ;


}


//interface de perfil donde definira la estructura que se mandara a llamar de firebase, para poder asignarla
//a los datos que mostrara el perfil de usuario
export interface profile{
    id: string;
    nombre?: string;
    apellido?: string;
    email?: string;
    tel?: string;
    image?: string;


}


export default interface pokemon {
  id?: string;
  name: string;
  type: string;
  height: string;
}







