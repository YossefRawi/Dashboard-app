import { inject } from "@angular/core";
import { GlobalStateService } from "./login/isLogged";
import { Router } from "@angular/router";

export const canActivate = () => {


    const router = inject(Router);
    const globalStateService = inject(GlobalStateService);

    const loggedIn = globalStateService.getIsLogged();
    if (loggedIn) {
      return true;
    } else {
      alert('Not authorized you MUST Log in!')  
      router.navigate([''])
      return false;
    }
     

}




