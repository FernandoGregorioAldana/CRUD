import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Servicios/user.service';
import { NonNullableFormBuilder  } from '@angular/forms';
import { profile } from '../../Modelos/models';
import { switchMap} from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';



@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  user$ = this.userService.currentUserProfile$;


  /*Esta estructura es una interface creada ya en el "models.ts" la cual podemos mandar a llamar y así no tener
  que declarar los datos con su respectivo atributo*/

  
/*Se crea este formulario el cual tendra los datos de una interface creada en el "models.ts"
esto para almacenar los datos que el usuario guardo al momento de registrarse, los cuales se mandaran a llamar
con un metodo creado mas abajo (los campos del html que mostraran la informacion deben llamarse igual que los 
del formulario para poder obtener los datos de manera correcta */
  profileForm = this.fb.group({
    id: [''],
    nombre: [''],
    apellido: [''],
    email: [''],
    tel: [''],
    image:[''],

  });

  
//en el contructor se inyectan los servicios o los componentes de los cuales mandaras a llamar metodos creados
  constructor(private fb: NonNullableFormBuilder, private userService: UserService, private toast: HotToastService ) { }


/*en este metodo se manda a llamar al usuario que tienen la sesion activa y obtiene sus datos para guardarlos
en el formulario que se creo llamado "profileForm"*/
  ngOnInit(): void {
    this.userService.currentUserProfile$
      .subscribe((user) => {
        this.profileForm.patchValue({ ...user });
      });
  }

  uploadFile(event: any, { id }: profile) {
    this.userService
      .uploadImage(event.target.files[0], `UserServerP/${id}`)
      .pipe(
        this.toast.observe({
          loading: 'Subiendo foto de perfil...',
          success: 'foto de perfil actualizada',
          error: 'Ocurrio un error al subir la foto',
           }),
           /*indica que la opcion que se va a editar sera el campo imagen, el cual se guardara como una url
           ya que asi lo indica el metodo creado en los UserServices*/
        switchMap((image) =>
        /*se manda a llamar el metodo "updateUser" para poder actualizar el campo, o el dato que se desea 
        cambiar en este caso sera la imagen*/
          this.userService.updateUser({
            id,
            image,
          })
        )
      
      )
      .subscribe()
  }


  //Esta funcion manda a llamar metodos creados en UserService, el cual funciona para hacer el guardado de los datos del usuario o actualizacion
  saveProfile() {
    const { id, ...data } = this.profileForm.value;

    if (!id) {
      return;
    }

    this.userService
      .updateUser({ id, ...data })
      .pipe(
        this.toast.observe({
          //notificaciones que indicaran si los datos fueron actualizados con exito
          loading: 'Guardando datos del perfil...' ,
          success: 'Perfil actualizado con exito',
          error: 'Ocurrio un error al actualizar',
          
        })
        
      )
      .subscribe();
  
  }


}
