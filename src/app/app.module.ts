import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { FormBuilderComponent } from './form-builder/form-builder.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormBuilder } from '@angular/forms'

@NgModule({
  declarations: [AppComponent, FormBuilderComponent],
  imports: [BrowserModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
