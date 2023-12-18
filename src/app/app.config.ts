import { ApplicationConfig, NgModule, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';


export function HttpLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader(http,'./assets/i18n/', '.json')
}

export const appConfig: ApplicationConfig = {
  providers:
   [ provideRouter(routes, withComponentInputBinding()),
     provideClientHydration(), 
     provideAnimations(), 
     provideHttpClient(), 
     LoginComponent,
     importProvidersFrom(HttpClientModule), // or provideHttpClient() in Angular v15
     importProvidersFrom(TranslateModule.forRoot({
      defaultLanguage: "en",
         loader: {
             provide: TranslateLoader,
             useFactory:HttpLoaderFactory,
             deps: [HttpClient]
        }
     }),)
    ]
};
