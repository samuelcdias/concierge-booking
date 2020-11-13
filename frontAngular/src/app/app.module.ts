import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { MainToolbarComponent } from './ui/main-toolbar/main-toolbar.component';
import { MainMenuComponent } from './ui/main-menu/main-menu.component';
import { MainFooterComponent } from './ui/main-footer/main-footer.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { HotelListComponent } from './hotel/hotel-list/hotel-list.component';
import { ClienteListComponent } from './cliente/cliente-list/cliente-list.component';
import { HospedeListComponent } from './hospede/hospede-list/hospede-list.component';
import { ReservaListComponent } from './reserva/reserva-list/reserva-list.component';
import { QuartoListComponent } from './quarto/quarto-list/quarto-list.component';
import { AgendaListComponent } from './agenda/agenda-list/agenda-list.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import { HotelFormComponent } from './hotel/hotel-form/hotel-form.component';
import { ClienteFormComponent } from './cliente/cliente-form/cliente-form.component';
import { HospedeFormComponent } from './hospede/hospede-form/hospede-form.component';
import { ReservaFormComponent } from './reserva/reserva-form/reserva-form.component';
import { QuartoFormComponent } from './quarto/quarto-form/quarto-form.component';
import { AgendaFormComponent } from './agenda/agenda-form/agenda-form.component';
import { ConfigFormComponent } from './config/config-form/config-form.component';
import { ConfirmDlgComponent } from './ui/confirm-dlg/confirm-dlg.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
// Habilitar formatação de moeda e data em português
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { MatMomentDateModule, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
@NgModule({
  declarations: [
    AppComponent,
    MainToolbarComponent,
    MainMenuComponent,
    MainFooterComponent,
    UserListComponent,
    HotelListComponent,
    ClienteListComponent,
    HospedeListComponent,
    ReservaListComponent,
    QuartoListComponent,
    AgendaListComponent,
    UserFormComponent,
    HotelFormComponent,
    ClienteFormComponent,
    HospedeFormComponent,
    ReservaFormComponent,
    QuartoFormComponent,
    AgendaFormComponent,
    ConfigFormComponent,
    ConfirmDlgComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    
    MatDatepickerModule,
    MatNativeDateModule,

    MatInputModule,
  ],
  providers: [
        /**** Datas em português no MatDatepicker  ****/
        { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
        /**********************************************/
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
