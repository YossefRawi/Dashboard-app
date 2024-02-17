import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HomeComponent } from './shared/components/home/home.component';
import { PagenotfoundComponent } from './shared/components/pagenotfound/pagenotfound.component';
import { LoginComponent } from './shared/components/login/login.component';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
  TranslateStore,
} from '@ngx-translate/core';
import { TranslateServiceModule } from './shared/services/translate.service';
import { HomeModule } from './shared/components/home/home.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,

    TranslateModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [],
})
export class AppComponent {

}
