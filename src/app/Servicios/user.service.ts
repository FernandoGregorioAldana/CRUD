import { Injectable } from "@angular/core";
import { Auth, signInWithEmailAndPassword, authState} from "@angular/fire/auth";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from '@angular/router';
import { Datos, profile } from 'src/app/Modelos/models';
import { FirestoreService } from "./firestore.service"

import {doc, docData, Firestore,  setDoc, updateDoc} from '@angular/fire/firestore';
import {from, Observable, of, switchMap } from 'rxjs';
import {getDownloadURL, ref, Storage, uploadBytes} from '@angular/fire/storage';

import { AngularFirestore} from "@angular/fire/compat/firestore";

//este import no se usa, pero si en un futuro se necesita con estos datos podrian realizar el acceso por roles
//import { RoleValid } from "./helper/RolValid";


@Injectable({
    providedIn: 'root'
})
  //en este archivo que contendra todos los servicios que se usaran.
export class UserService{

//se declara una variable la cual guardara los datos del usuario que estan ya almacenados 
 public user$: Observable<Datos |null |undefined>;

  currentUser$ = authState(this.auth);
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
  
    /*en el contructor se inyectan los servicios o los componentes de los cuales mandaras a llamar metodos creados
    asi como las funciones en caso de mandar a llamar bibliotecas u frameworks instalados en angular (firestore, boostrap)*/
    constructor(private afs: AngularFirestore, private firestore: Firestore, private auth: Auth, private fireauth: AngularFireAuth, private router:Router, private firestoreService: FirestoreService, private storage: Storage ) {
      
      //este metodo servira para obtener los datos registrados que contiene el usuario actual
      this.user$ = this.fireauth.authState.pipe(
        switchMap((user) => {
          if (user) {
            return this.afs.doc<Datos>(`Usuario/${user.uid}`).valueChanges();
          }
          return of(null);
        })
      );
    
    }




    // metodo para recuperar contraseña el cual mandara un correo al email registrado
    recuperar(email : string) {
        this.fireauth.sendPasswordResetEmail(email).then(() => {
        }, err => {
          alert('Something went wrong');
        })
    }
    // registrar usuario
    register (datos: Datos){
        return this.fireauth.createUserWithEmailAndPassword (datos.email, datos.password)
        }




    //metodo para iniciar sesion
    login({email, password}: any){
        return signInWithEmailAndPassword(this.auth, email, password);


    }

    //metodo para cerrar sesión
    logout() {
      return this.auth.signOut();
      
    }
  

    
      //metodo para enviar la verificación por email
    SendVerficationEmail(user: any){



        this.fireauth.currentUser.then(u => u?.sendEmailVerification())
    
          .then(() =>{

    
          }, (err: any) =>{
    
              alert('Ha ocurrido un problema.');
    
          })
    
    
    
      }



//metodo para obtener los datos que tiene el usuario que inicio sesion actualmente

   get currentUserProfile$(): Observable<profile | null> {
    return this.currentUser$.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }

        const ref = doc(this.firestore, 'Usuario', user?.uid);
        return docData(ref) as Observable<profile>;
      })
    );
  }

  //metodo para agregar los datos del usuario registrado en el documento llamado "UserServerP"
  addUser(user: profile): Observable<void> {
    const ref = doc(this.firestore, 'Usuario', user.id);
    return from(setDoc(ref, user));
  }

  //metodo que servira para el perfil de usuario cuando se requiera cambiar algun dato
  updateUser(user: profile): Observable<void> {
    const ref = doc(this.firestore, 'Usuario', user.id);
    return from(updateDoc(ref, { ...user }));
  }



  //metodo que funcionara para subir una nueva imagen a la plataforma
    uploadImage(image: File, path: string): Observable<string> {
    const storageRef = ref(this.storage, path);
    const uploadTask = from(uploadBytes(storageRef, image));
    return uploadTask.pipe(switchMap((result) => getDownloadURL(result.ref)));
  }


}