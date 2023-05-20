import { Component, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc } from '@angular/fire/firestore';
import pokemon from '../Modelos/models';

@Injectable({
    providedIn: 'root'
  })
  export class FirestoreService {
  
    /*en el contructor se inyectan los servicios o los componentes de los cuales mandaras a llamar metodos creados
    asi como las funciones en caso de mandar a llamar bibliotecas u frameworks instalados en angular (firestore, boostrap)*/
    constructor(public database: AngularFirestore, private firestor: Firestore) { }
  
    createDoc(data: any, path: string, id: string) {
        const collection = this.database.collection(path);
        return collection.doc(id).set(data);
    }
    
    addPokemon(Pokemon: pokemon) {
      const PokemonRef = collection(this.firestor, 'pokemon');
      return addDoc(PokemonRef, Pokemon);
    }
  
    getPokemon(): Observable<pokemon[]> {
      const PokemonRef = collection(this.firestor, 'pokemon');
      return collectionData(PokemonRef, { idField: 'id' }) as Observable<pokemon[]>;
    }
  
    deletePokemon(Pokemon: pokemon) {
      const PokemonRef = doc(this.firestor, `pokemon/${Pokemon.id}`);
      return deleteDoc(PokemonRef);
    }
    

    }
  

  
  

    

  
  
  
  
  