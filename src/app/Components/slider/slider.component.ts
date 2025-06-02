import { AfterViewInit, Component } from '@angular/core';
declare var $: any; // Declare jQuery to avoid TypeScript errors.

@Component({
  selector: 'app-slider',
  imports: [],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})

export class SliderComponent implements AfterViewInit {
  ngAfterViewInit() {
    $(document).ready(function() {
      $(".owl-carousel").owlCarousel({
          items: 1,
          loop: true,
          margin: 10,
          nav: true,
          autoplay: true,
          autoplayTimeout: 3000,
          autoplayHoverPause: true,
          responsive: {
              0: {
                  items: 1
              },
              600: {
                  items: 1
              },
              1000: {
                  items: 1
              }
          }
      });
  });
}
}