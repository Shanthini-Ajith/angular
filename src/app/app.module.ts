import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SubmissionComponent } from './pages/student-dashboard/submission/submission.component';
import { CompletionComponent } from './pages/student-dashboard/completion/completion.component';

@NgModule({
  declarations: [
    AppComponent,
    SubmissionComponent,
    CompletionComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
