import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRFU1QiLCJ1c2VyaWQiOiIxMTA3MjQ3MjEiLCJqdGkiOiI4MmMzOWUzOS1mZTZhLTRhMWItYTA4ZC1lMzU5OTIzYzk5MTkiLCJpYXQiOiI2LzIxLzIwMTcgNTozNjoxNSBBTSIsIm5iZiI6MTQ5ODAyMzM3NSwiZXhwIjoxNDk4MDI2OTc1LCJpc3MiOiJCVk1vYmlsZUFwcHMiLCJhdWQiOiJBbGwifQ.0X3oa1pG5oDajQR6S40YYPjC54XF3x6KY5LEtp5osgs")

platformBrowserDynamic().bootstrapModule(AppModule);
