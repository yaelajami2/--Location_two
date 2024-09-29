import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from '../src/component/app/app.config';
import { AppComponent } from '../src/component/app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
