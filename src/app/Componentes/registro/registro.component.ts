import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, RequiredValidator, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UserService } from '../../Servicios/user.service';
import { Datos } from 'src/app/Modelos/models';
import { FirestoreService } from '../../Servicios/firestore.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  //en esta estructura se manda a llamar la estructura del interface donde se guardaran u obtendran datos 
//con los metodos que se realizan
  datos : Datos ={
    id: '',
    nombre: '',
    apellido: '',
    email: '',
    tel: '',
    image: '',
    password: '',
  }

  //se manda a llamar el form y se le asigna un nombre para poder usarlo
  formReg: FormGroup;

 //en el contructor se inyectan los servicios o los componentes de los cuales mandaras a llamar metodos creados
  constructor(
    private userService: UserService,  private firestore: FirestoreService, private router: Router, private toastr: ToastrService
  ){

    //se asigna un nombre de cada elemento que tendra el formulario, estos nombres se usaran en el archivo 
    //html
    this.formReg = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      apellidos: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required)
    })
  
  }

  //se crea la notificacion que se vera cuando el usuario se registre de manera correcta
  showsucces() {
    this.toastr.success('Registrado correctamente', 'Datos guardados :)');
  }
  

  ngOnInit() {}

    
  //aqui se crea el metodo que se mandara a llamar la estructura html
    async registrar() {

      console.log('datos -> ', this.datos);

      //se manda a llamar el metodo "register" que viene del "UserServices" dentro de la carpeta services
      //el cual recibira los datos que ocupe
      const res = await this.userService.register(this.datos).catch( error => {

        this.toastr.error('El usuario ya existe', 'Error debido a que:', {
          timeOut: 3000,
        });
      })
      if (res) {
        this.showsucces();
        //en este apartado procede a obtener el id del usuario que recien se creo para tambien guardar los
        //datos que requiere el registro de usuario y nos manda al inicio de sesión
          const path = 'Usuario';
          const id = res.user?.uid;
          this.datos.id = id!;
          this.datos.password = ''
          await this.firestore.createDoc(this.datos, path, id!)
          this.router.navigate(['/iniciosesion'])
      }
  
    }


}
