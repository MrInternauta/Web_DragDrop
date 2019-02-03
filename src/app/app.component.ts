import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { isNumber, isString } from 'util';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  nombre: string;
  alerta: string;
  tarjeta = '';
  card: any = {
    todo: [
      'Get to work',
      'Pick up groceries',
      'Go home',
      'Fall asleep'
    ],
    proceso: [
      'saaaaasa',
      'JHDSAJHDSA',
      'JKhdjdda',
      'FalDadal asleep'
    ],
    realizado: [
      'Get up',
      'Brush teeth',
      'Take a shower',
      'Check e-mail',
      'Walk dog'
    ]
  };

  ngOnInit() {
    if (localStorage.getItem('todo')) {
      this.card = JSON.parse(localStorage.getItem('todo'));
    } else {
      console.log(2);
    }
  }
  drop(event: CdkDragDrop<string[]>) {
    console.log(event.previousContainer, event.container);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      /*console.log(
        event.container.data,
        event.previousIndex,
        event.previousIndex,
        event.currentIndex);*/
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      /*console.log(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);*/
    }
    localStorage.setItem('todo', JSON.stringify(this.card));
  }

  crear( ) {
    if ( this.nombre === '') {
      return this.alerta = 'Ingresa algo';
    }
    if ( !this.tarjeta) {
      return this.alerta = 'Ingresa algo';
    }
    switch (this.tarjeta) {
      case '1':
        this.card.todo.push(this.nombre);
        break;
      case '2':
        this.card.proceso.push(this.nombre);
        break;
      case '3':
        this.card.realizado.push(this.nombre);
        break;
      default:
        this.alerta = 'error';
        break;
    }
    this.nombre = '';
    this.tarjeta = '';
    this.alerta = '';
    localStorage.setItem('todo', JSON.stringify(this.card));
  }
}
