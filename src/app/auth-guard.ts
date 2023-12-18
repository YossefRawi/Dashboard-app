import { inject } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { Router } from "@angular/router";
import { GlobalStateService } from "./login/isLogged";

export const canActivate = () => {

    const loginComp = inject(LoginComponent)
    const router = inject(Router)
    const globalStateService = inject(GlobalStateService)

    const loggedIn = globalStateService.getIsLogged();

    if (loggedIn){ return true} else{return false};
     

}




