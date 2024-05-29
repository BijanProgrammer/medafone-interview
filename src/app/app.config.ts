import {ApplicationConfig} from '@angular/core';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideRouter} from '@angular/router';

import {provideToastr} from 'ngx-toastr';

import {routes} from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideAnimations(),
        provideToastr({
            tapToDismiss: true,
            progressBar: true,
            progressAnimation: 'decreasing',
            timeOut: 2500,
            extendedTimeOut: 1000,
            disableTimeOut: false,
            maxOpened: 5,
            autoDismiss: true,
            easeTime: 100,
            positionClass: 'toast-bottom-right',
        }),
    ],
};
