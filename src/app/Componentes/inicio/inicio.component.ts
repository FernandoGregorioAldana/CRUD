import { UserService } from '../../Servicios/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PokemonService } from '../../Servicios/pokemon.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
    //Con este codigo se manda a llamar el perfil de usuario logeado 
    user$ = this.userService.currentUserProfile$;
  displayedColumns: string[] = ['position', 'image', 'name'];
  data: any[] = [];
  dataSource = new MatTableDataSource<any>(this.data);


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;



  constructor(private pokemonService: PokemonService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.getPokemons();
  }


  getPokemons() {
    let pokemonData;

    for (let i = 1; i <= 300; i++) {
      this.pokemonService.getPokemons(i).subscribe(
        res => {
          pokemonData = {
            position: i,
            image: res.sprites.front_default,
            name: res.name
            
          };
          this.data.push(pokemonData);
          this.dataSource = new MatTableDataSource<any>(this.data);
          this.dataSource.paginator = this.paginator;
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  getRow(row : any){
    console.log(row);
    this.router.navigateByUrl(`/detalles/${row.position}`)
  }
  

}