import {inject} from '@angular/core';
import {CanActivateFn, GuardResult, Router} from '@angular/router';

let isCached = false;

export const authGuard: CanActivateFn = async (route, state): Promise<GuardResult> => {
    if (await isAuthenticated()) {
        return true;
    } else {
        const router = inject(Router);
        return router.createUrlTree(['/']);
    }
};

async function isAuthenticated(): Promise<boolean> {
    if (isCached) {
        return true;
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));
    isCached = true;

    return true;
}
