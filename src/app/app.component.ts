import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { LoginComponent } from './login/login.component';
import { TranslateLoader, TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet, RouterLinkActive, RouterLink, HomeComponent, PagenotfoundComponent,TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers:[LoginComponent,TranslateService, TranslateStore]
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }

 

}

// json-server --watch db.json