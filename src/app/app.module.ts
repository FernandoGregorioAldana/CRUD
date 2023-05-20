import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PerfilComponent } from './Componentes/perfil/perfil.component';
import { RegistroComponent } from './Componentes/registro/registro.component';
import { InicioSesionComponent } from './Componentes/inicio-sesion/inicio-sesion.component';
import { environment } from 'src/environments/environment';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideMessaging,getMessaging } from '@angular/fire/messaging';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { provideFunctions,getFunctions } from '@angular/fire/functions';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InicioComponent } from './Componentes/inicio/inicio.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/Shared/material.module';
import { DetallesComponent } from './Componentes/detalles/detalles.component';
import {CookieService} from 'ngx-cookie-service';
import { ListaComponent } from './Componentes/lista/lista.component';



@NgModule({
  declarations: [
    AppComponent,
    PerfilComponent,
    RegistroComponent,
    InicioSesionComponent,
    InicioComponent,
    DetallesComponent,
    ListaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideMessaging(() => getMessaging()),
    provideStorage(() => getStorage()),
    AngularFireModule.initializeApp(environment.firebase),
    provideFunctions(() => getFunctions()),
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,

    
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
