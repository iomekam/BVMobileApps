import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRFU1QiLCJ1c2VyaWQiOiIxMTA3MjQ3MjEiLCJqdGkiOiIwNWEyMTVhNC1jYTY4LTQwNjgtOTZiOS03ZTBjNTU0NmY5MTkiLCJpYXQiOiI2LzIxLzIwMTcgNjo1MjoxNyBBTSIsIm5iZiI6MTQ5ODAyNzkzNywiZXhwIjoxNDk4MDMxNTM3LCJpc3MiOiJCVk1vYmlsZUFwcHMiLCJhdWQiOiJBbGwifQ.4U9DKwe5rycclH3oOJH6xsPom0FxhWf7v_1vqWB3Pwo")

platformBrowserDynamic().bootstrapModule(AppModule);
