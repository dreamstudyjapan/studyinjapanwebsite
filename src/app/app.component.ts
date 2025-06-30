import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./Components/header/header.component";
import { HomeComponent } from "./Components/home/home.component";
import { FooterComponent } from './Components/footer/footer.component';
import { Analytics } from "@vercel/analytics/react"
import { RunningBannerComponent } from './Components/running-banner/running-banner.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent,FooterComponent,RunningBannerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'StudyInJapan';
}
