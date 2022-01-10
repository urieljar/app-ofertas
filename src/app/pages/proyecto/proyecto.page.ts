/* eslint-disable @typescript-eslint/no-shadow */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ProyectoInterface } from 'src/app/interfaces/interfaces';
import { Proyecto } from 'src/app/models/Proyecto';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.page.html',
  styleUrls: ['./proyecto.page.scss'],
})
export class ProyectoPage implements OnInit {
  id: any;
  nombre = '';
  mensaje= '';
  descripcion='';
  proyecto = new Proyecto();
  proyectoInterface: ProyectoInterface[]=[];
  constructor(
    private route: ActivatedRoute,
    private alertController: AlertController,
    private proyectoService: ProyectoService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.refresh();
  }
  refresh(){
    this.proyectoService.getProyectos().subscribe(
      response=>{
        if(response){
          console.log(response);
          this.proyectoInterface = response;
        console.log(this.proyectoInterface);
        }else{
          console.log('hubo un error');
        }
      });
  }
  async alerta(titulo: string, subtitulo: string, mensaje: string) {
    const alert =await this.alertController.create({
      header: titulo,
      subHeader: subtitulo,
      message: mensaje,
      buttons: ['Ok']
    });
    await alert.present();
  }
  async agregar(){
    const proyectoN = new Proyecto();
    proyectoN.id=this.id;
    const alert = await this.alertController.create({
      cssClass: 'alert-danger',
      header: 'Crear Proyecto ',
      inputs: [{
        name:'nombre',
        type: 'text',
        value: proyectoN.nombre,
        placeholder: 'Nombre',
        cssClass: 'alert-danger',
      },
      {
        name:'descripcion',
        type: 'text',
        value: proyectoN.descripcion,
        placeholder: 'Descripcion'
      }],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: (blah) => {
            console.log('Confirmar Cancelar: blah');
          },cssClass: 'alert-danger'
        }, {
          text: 'Confirmar',
          handler: (data) => {
            proyectoN.nombre= data.nombre;
            proyectoN.descripcion= data.descripcion;
            this.proyectoService.postProyecto(proyectoN).subscribe(
              res => {
                console.log(res);
                this.refresh();
                this.alerta('Exito', 'Crear Proyecto', 'El proyecto se ha sido registrado correctamente');
              },
              error => {
                console.log(proyectoN);
                this.alerta('Error', 'Crear Proyecto', 'No se pudo crear el proyecto correctamente <br>'+error);
              }
            );
          }
        }
      ]
    });
    await alert.present();
}
async editar(proyecto,i){
  const titulo = `Editar Proyecto ${proyecto.id}`;
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: titulo,
    inputs: [{
      name:'nombre',
      type: 'text',
      value: proyecto.nombre,
      placeholder: 'Nombre'
    },{
      name:'descripcion',
      type: 'text',
      value: proyecto.descripcion,
      placeholder: 'Descripcion'
    }],
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Confirmar',
        handler: (data) => {
          this.proyectoService.getProyecto(proyecto.id).subscribe(
            res => {
              // eslint-disable-next-line @typescript-eslint/dot-notation
              this.proyecto = res ['data'];
              console.log(this.proyecto);
              this.proyecto.nombre=data.nombre;
              this.proyecto.descripcion=data.descripcion;
              this.proyectoService.putProyecto(this.proyecto).subscribe(
                res => {
                  this.proyectoInterface[i].nombre = data.nombre;
                  this.proyectoInterface[i].descripcion = data.descripcion;
                  console.log(res);
                }
              );
            }
          );
        }
      }
    ]
  });
  await alert.present();
}
async eliminar(proyecto,i){
  const titulo = `Peligro!!`;
  const nombre = `${proyecto.nombre} ${proyecto.apellido}`;
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: titulo,
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Confirmar',
        handler: () => {
          this.proyectoService.deleteProyecto(proyecto.id).subscribe(
            res => {
              console.log(res);
              this.proyectoInterface.splice(i,1);
            },
            error => {
              console.log(error);
            }
          );
        }
      }
    ]
  });
  await alert.present();
}
}
