import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { RouterModule } from '@angular/router';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

import { AppComponent } from './app/app.component';
import { ApiService } from './app/services/api.service';
import { LocalApiService } from './app/services/local-api.service';
import { environment } from './environments/environment';

if (environment.production) {
  // Not needed for Angular 17+, production mode is automatic
}

bootstrapApplication(AppComponent, {
  providers: [
    ApiService,
    LocalApiService,
    importProvidersFrom(
      FormsModule,
      HttpClientModule,
      BsDropdownModule.forRoot(),
      ModalModule.forRoot(),
      AngularSvgIconModule.forRoot(),
      RouterModule.forRoot([]),
      AutocompleteLibModule
    )
  ]
}).catch(err => console.log(err));
