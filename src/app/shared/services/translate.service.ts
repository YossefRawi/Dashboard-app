import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";






@Injectable({
  providedIn: 'root'
})
export class TranslateServiceModule{

    constructor(public translate: TranslateService) {}

    switchLanguage() {
        const currentLang = this.translate.currentLang;
        const newLang = currentLang === 'en' ? 'ar' : 'en';
        this.translate.use(newLang);
    }

  

}
