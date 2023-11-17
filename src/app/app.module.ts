import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from "angular-datatables";
import { UsuarioComponent } from './components/usuarios/usuario/usuario.component';
import { UsuarioListaComponent } from './components/usuarios/usuario-lista/usuario-lista.component';


@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    UsuarioListaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DataTablesModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
