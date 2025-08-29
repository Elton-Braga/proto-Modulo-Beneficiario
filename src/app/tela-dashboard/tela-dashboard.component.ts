import { Component, AfterViewInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tela-dashboard',
  standalone: true,
  imports: [MatIconModule, RouterModule],
  templateUrl: './tela-dashboard.component.html',
  styleUrl: './tela-dashboard.component.scss',
})
export class TelaDashboardComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.initCarousel();
  }

  private initCarousel(): void {
    const carousel = document.querySelector(
      '.carousel-inner'
    ) as HTMLElement | null;
    const items: NodeListOf<HTMLElement> =
      document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector(
      '.carousel-control.prev'
    ) as HTMLButtonElement | null;
    const nextBtn = document.querySelector(
      '.carousel-control.next'
    ) as HTMLButtonElement | null;
    const indicators: NodeListOf<HTMLElement> = document.querySelectorAll(
      '.carousel-indicator'
    );

    if (!carousel || !prevBtn || !nextBtn) {
      console.error(
        'Erro: elementos do carrossel não foram encontrados no DOM.'
      );
      return;
    }

    let currentIndex: number = 0;
    const itemsPerView: number = window.innerWidth > 768 ? 3 : 1;
    const itemCount: number = items.length;

    const updateCarousel = (): void => {
      const translateX: number = currentIndex * 100;
      if (carousel) {
        carousel.style.transform = `translateX(-${translateX}%)`;
      }

      indicators.forEach((indicator: HTMLElement, index: number): void => {
        indicator.classList.toggle('active', index === currentIndex);
      });
    };

    nextBtn.addEventListener('click', (): void => {
      currentIndex = (currentIndex + itemsPerView) % itemCount;
      if (currentIndex > itemCount - itemsPerView) {
        currentIndex = 0;
      }
      updateCarousel();
    });

    prevBtn.addEventListener('click', (): void => {
      currentIndex = (currentIndex - 1 + itemCount) % itemCount;
      updateCarousel();
    });

    indicators.forEach((indicator: HTMLElement): void => {
      indicator.addEventListener('click', (): void => {
        const index: string | null = indicator.getAttribute('data-index');
        if (index !== null) {
          currentIndex = Number(index);
          updateCarousel();
        }
      });
    });

    setInterval((): void => {
      currentIndex = (currentIndex + itemsPerView) % itemCount;
      if (currentIndex > itemCount - itemsPerView) {
        currentIndex = 0;
      }
      updateCarousel();
    }, 5000);
  }
}
