import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-film-edit',
  templateUrl: './film-edit.component.html',
  styleUrls: ['./film-edit.component.css']
})

export class FilmEditComponent implements OnChanges {
  @Input() film: any;
  @Output() filmSaved = new EventEmitter<any>();
  filmEditForm = new FormGroup({
    filmName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    year: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(4),
      Validators.pattern('\\d+')
    ]),
    slovakName: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ])
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (this.film) {
        this.filmName.setValue(this.film.nazov);
        this.year.setValue(this.film.rok);
        this.slovakName.setValue(this.film.slovenskyNazov);
        console.log('Input:', this.film);
    }
}

  get filmName(): FormControl {
    return this.filmEditForm.get('filmName') as FormControl;
  }
  get year(): FormControl {
    return this.filmEditForm.get('year') as FormControl;
  }
  get slovakName(): FormControl {
    return this.filmEditForm.get('slovakName') as FormControl;
  }
  ngOnInit(): void {
  }
  onSubmit(): void {
    const film = {
      ...this.film,
      nazov: this.filmName.value,
      slovenskyNazov: this.slovakName.value,
      rok: this.year.value,
      reziser: [],
      postava: []
    };
    this.filmSaved.emit(film);
  }






}


