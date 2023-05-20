import { Component } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { UserService } from '../../Servicios/user.service';
import { Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {CookieService} from 'ngx-cookie-service';


@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent {
  formlog: FormGroup;

  /*en el contructor se inyectan los servicios o los componentes de los cuales mandaras a llamar metodos creados
  o funciones que contenga*/
  constructor(private cookieServices:CookieService, private userService: UserService, private router:Router, private toastr: ToastrService){


    /*Se crea un formulario el cual recibira los datos de las casillas de texto creadas en el html
    estos datos obtenidos serviran para usarlos dentro de una funcion que ayudara a iniciar sesion*/
    this.formlog = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  ngOnInit(): void {
    
  }

  //notificacion que mostrara si el usuario inicio sesion correctamente
  showsucces() {
    this.toastr.success('Inicio de sesión correcto', 'Ya puedes entrar a la plataforma');
  }

  //notificacion que mostrara una alerta si los datos del usuario son incorrectos
  showErr(){
    this.toastr.error('Hubo un problema con sus credenciales', 'Error causado por:', {
      timeOut: 3000,
    });
  }

  /*se crea una funcion que manda a llamar un metodo creado en "UserService" que sirve para iniciar sesion
  el cual obtendra los valores (correo, contraseña) del formulario creado arriba, si los datos son correctos
  nos llevara directamente a la pagina de inicio de la plataforma*/
  onbutton(){
    this.userService.login(this.formlog.value)
    .then((res: any) => {
      this.showsucces();
      this.cookieServices.set('token_access', res.accessToken, 2, '/');
      this.router.navigate(['inicio']);
      
    })
    .catch(error => this.showErr());
    
  }
}

