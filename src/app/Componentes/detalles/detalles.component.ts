import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../Servicios/pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { NonNullableFormBuilder } from '@angular/forms';
import { UserService } from 'src/app/Servicios/user.service';
import { FirestoreService } from 'src/app/Servicios/firestore.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss']
})
export class DetallesComponent implements OnInit {

  formulario: FormGroup;

  pokemon: any = '';
  pokemonImg = '';
  pokemonType = [];



  constructor(private activatedRouter: ActivatedRoute, private pokemonService: PokemonService, 
    private toast: HotToastService, private fb: NonNullableFormBuilder, 
    private userService: UserService, private  FireServices: FirestoreService,
    private toastr: ToastrService) {

      this.formulario = new FormGroup({
        name: new FormControl(),
        type: new FormControl(),
        height: new FormControl(),
      })

    this.activatedRouter.params.subscribe(
      params => {
        this.getPokemon(params['id']);
      }
    )
  }

  ngOnInit(): void {
  }

    //notificacion que mostrara si el usuario inicio sesion correctamente
    showsucces() {
      this.toastr.success('Pokemon guardado correctamente', 'Ahora puedes consultar la lista');
    }

      //notificacion que mostrara una alerta si los datos del usuario son incorrectos

  async savePokemon() {
    console.log(this.formulario.value)
    const response = await this.FireServices.addPokemon(this.formulario.value);
    console.log(response);
    this.showsucces();
  }

  getPokemon(id : any) {
    this.pokemonService.getPokemons(id).subscribe(
      res => {
        console.log(res);
        this.pokemon = res;
        this.pokemonImg = this.pokemon.sprites.front_default;
        this.pokemonType = res.types[0].type.name;
      },
      err => {
        console.log(err);
      }
    )
  }
  }