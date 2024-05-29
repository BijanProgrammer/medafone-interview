import {Component, OnDestroy} from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet} from '@angular/router';
import {HeaderComponent} from './components/header/header.component';
import {Subscription} from 'rxjs';
import {LoadingComponent} from './components/loading/loading.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, HeaderComponent, LoadingComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent implements OnDestroy {
    protected isLoading = false;

    private subscriptions: Subscription[] = [];

    constructor(private router: Router) {
        this.initializeSubscriptions();
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }

    private initializeSubscriptions(): void {
        const subscription = this.router.events.subscribe((e) => {
            switch (true) {
                case e instanceof NavigationStart: {
                    this.isLoading = true;
                    break;
                }

                case e instanceof NavigationEnd:
                case e instanceof NavigationCancel:
                case e instanceof NavigationError: {
                    this.isLoading = false;
                    break;
                }

                default: {
                    break;
                }
            }
        });

        this.subscriptions.push(subscription);
    }
}
