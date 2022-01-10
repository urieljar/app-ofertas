import { Component} from '@angular/core';
import { Observable } from 'rxjs';
import { Componente } from 'src/app/interfaces/interfaces';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  componentes: Observable<Componente[]>;
  constructor(private dataService: DataService){
    this.componentes= this.dataService.getMenuOpts();
  }
}
