import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/Servicios/firestore.service';
import pokemon from 'src/app/Modelos/models';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  Pokemon: pokemon[];

  constructor(private FireStore:FirestoreService) { }

  ngOnInit(): void {
    this.FireStore.getPokemon().subscribe(pokemon => {
      this.Pokemon = pokemon;
    })
  }

  async onClickDelete(pokemonn: pokemon) {
    const response = await this.FireStore.deletePokemon(pokemonn);
    console.log(response);
  }

  

}

