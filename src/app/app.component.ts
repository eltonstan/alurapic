import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { switchMap, filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title) {

    }

    ngOnInit(): void {
      this.router.events
        // nesse trecho informa que somente executaremos essa ação se for uma ação de NavigationEnd
        .pipe(filter(event => event instanceof NavigationEnd))
        // Esta aguardando a rota ativa no map para usar no proximo pipe
        .pipe(map(() => this.activatedRoute))
        // esse codigo percorre a rota ate chegar na rota final navegada
        .pipe(map(route => {
          while(route.firstChild) route = route.firstChild;
          return route;
        }))
        // acessa a propriedade data do arquivo de routing.module.ts
        .pipe(switchMap(route => route.data))
        // usamos o titleService para colocar o titulo da pagina usando a propriedade data.title
        .subscribe(event => this.titleService.setTitle(event.title));
      } 
  
}


