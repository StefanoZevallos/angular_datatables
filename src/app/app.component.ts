import { Component, OnInit,OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegistroService } from './registro.service';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'angular_app_formulario';

  constructor(private service: RegistroService,private httpClient: HttpClient) { }

  persona = {} as any;
  datosUsuario: any[] = [];

  mostrarModalEditarUsuario = false
  mostrarModalEliminarUsuario = false

  idSeleccionado: any = ""
  indiceSeleccionado: any = ""

  nombre = ""
  correo = ""
  telefono = ""

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  ngOnInit():void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength:2,
    };
    // const storedData = localStorage.getItem('datos');
    this.httpClient.get('http://localhost:3000/usuarios')
      .subscribe(data => {
        this.datosUsuario = (data as any).content;
        console.log(this.datosUsuario);
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next(" ");
      });
    // this.datosUsuario = storedData ? JSON.parse(storedData) : [];
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
 // Agregar Usuario Flujo 
  agregarUsuario() {
    this.service.enviarPersona(`http://localhost:3000/registro`, this.persona).subscribe(res => {
      console.log(res);
      if (res.content) {
        this.datosUsuario.push(res.content);
       
        this.persona = {}
      } else {
        console.error('La respuesta del servidor no es válida:', res.content);
      }
    },
      (error: any) => {
        alert('Error al crear al usuario, los correos deben ser únicos');
      }
    );
  }
// Editar Usuario Flujo
  abrirModalEditarUsuario(id: any, indice: any, nombre: string, correo: string, telefono: string) {
    this.mostrarModalEditarUsuario = true;
    this.idSeleccionado = id
    this.indiceSeleccionado = indice
    this.nombre = nombre
    this.correo = correo
    this.telefono = telefono
    this.persona = { "nombre": nombre, "correo": correo, "telefono": telefono }
  }

  editarUsuarioGuardarCambiosConfirmar() {
    this.service.editarUsuario(`http://localhost:3000/usuario/${this.idSeleccionado}`, this.persona).subscribe(res => {
      console.log(res)
      this.datosUsuario[this.indiceSeleccionado].nombre = res.content.nombre
      this.datosUsuario[this.indiceSeleccionado].correo = res.content.correo
      this.datosUsuario[this.indiceSeleccionado].telefono = res.content.telefono
    });
    this.mostrarModalEditarUsuario = false;
    this.persona = {}
    alert("Usuario Editado exitosamente")
  }

  cerrarModalEditarUsuario() {
    this.mostrarModalEditarUsuario = false
    this.persona = {}
  }

  // Eliminar Usuario Flujo

  abrirModalEliminarUsuario(id: any, indice: any) {
    this.mostrarModalEliminarUsuario = true
    this.idSeleccionado = id
    this.indiceSeleccionado = indice
  }

  eliminarUsuarioConfirmar() {
    this.service.eliminarUsuario(`http://localhost:3000/usuario/${this.idSeleccionado}`).subscribe(res => {
      console.log(res)
    })
    this.datosUsuario.splice(this.indiceSeleccionado, 1);
    this.mostrarModalEliminarUsuario = false
  }

  cerrarModalEliminarUsuario() {
    this.mostrarModalEliminarUsuario = false
  }

}

