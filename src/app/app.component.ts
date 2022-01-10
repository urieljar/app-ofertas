import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Componente } from './interfaces/interfaces';
import { DataService } from './services/data.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  componentes: Observable<Componente[]>;
  constructor(private dataService: DataService, private storage: Storage) {
      this.componentes= this.dataService.getMenuOpts();
    }

    // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
    async ngOnInit() {
      // If using a custom driver:
      // await this.storage.defineDriver(MyCustomDriver)
      await this.storage.create();
    }
}
