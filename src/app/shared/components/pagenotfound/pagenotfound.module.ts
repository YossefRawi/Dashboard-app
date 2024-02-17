import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import{routes} from './pagenotfound.routes'
import { PagenotfoundComponent } from './pagenotfound.component';


@NgModule({
    declarations:[
        PagenotfoundComponent
    ],
    imports: [
    
    RouterModule.forChild(routes)
],
  exports: [RouterModule]
})
export class PagenotfoundModule { }