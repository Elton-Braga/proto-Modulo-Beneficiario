//import { NgFor } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tela-dashboard',
  standalone: true,
  imports: [MatIconModule, RouterModule],
  templateUrl: './tela-dashboard.component.html',
  styleUrls: ['./tela-dashboard.component.scss'],
})
export class TelaDashboardComponent implements AfterViewInit {
  dashboardItems = [
    { title: 'Item 1', description: 'Descrição do item 1' },
    { title: 'Item 2', description: 'Descrição do item 2' },
    { title: 'Item 3', description: 'Descrição do item 3' },
    { title: 'Item 4', description: 'Descrição do item 4' },
    { title: 'Item 5', description: 'Descrição do item 5' },
    { title: 'Item 6', description: 'Descrição do item 6' },
  ];
  ngOnInit() {
    console.log('Itens carregados:', this.dashboardItems);
    //this.initCarousel();
  }
  ngAfterViewInit(): void {
    this.initCarousel();
    const carouselInner = document.querySelector('.carousel-inner');
    if (!carouselInner) {
      console.error(
        'Erro: elementos do carrossel não foram encontrados no DOM.'
      );
      return;
    }
    console.log('Carrossel inicializado com sucesso!', carouselInner);
    // aqui você coloca a lógica de movimentação do carrossel
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

    if (!carousel || !prevBtn || !nextBtn || items.length === 0) {
      console.error(
        'Erro: elementos do carrossel não foram encontrados no DOM.'
      );
      return;
    }

    let currentIndex: number = 0;
    const itemCount: number = items.length;

    const updateCarousel = (): void => {
      const translateX: number = currentIndex * 100;
      carousel.style.transform = `translateX(-${translateX}%)`;

      indicators.forEach((indicator: HTMLElement, index: number): void => {
        indicator.classList.toggle('active', index === currentIndex);
      });

      console.log('Slide atual:', currentIndex, 'TranslateX:', translateX);
    };

    nextBtn.addEventListener('click', (): void => {
      currentIndex = (currentIndex + 1) % itemCount;
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

    // autoplay
    setInterval((): void => {
      currentIndex = (currentIndex + 1) % itemCount;
      updateCarousel();
    }, 5000);

    updateCarousel();
  }
}
