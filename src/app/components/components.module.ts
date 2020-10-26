import { ErrorMessageComponent } from './error-message/error-message.component';
import { CommonModule } from '@angular/common';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { AuthInterceptor } from '../security/auth.interceptor';
// import { Moeda } from './../../pipes/moeda';
// import { DialogService } from './../../services/shared/dialog.service';
// import { DialogComponent } from './dialog/dialog.component';
// import { FilterPipe } from './filter/filter';
@NgModule({
    declarations: [
        ErrorMessageComponent,
    ],
    imports: [
        FormsModule,
        CommonModule,
      ],
    exports: [
        ErrorMessageComponent,
    ],
    providers: [
        // DialogService,
        // {
        //     provide: HTTP_INTERCEPTORS,
        //     useClass: AuthInterceptor,
        //     multi: true
        // },
    ]
})
export class ComponentsModule { }