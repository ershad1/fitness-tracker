import {Injectable} from '@angular/core';
import {Exercise} from './exercise.model';
import {Subject} from 'rxjs';
import {AngularFirestore} from 'angularfire2/firestore';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private runningExercise: Exercise;

  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();

  availableExercise: Exercise[] = [];

  private exercises: Exercise[] = [];

  constructor(private db: AngularFirestore) {
  }

  // getAvailableExercises() {
  //   return this.availableExercise.slice();
  // }
  fetchAvailableExercises() {
    this.db.collection('availableExercises')
      .snapshotChanges()
      .pipe(map(docArray => {
        return docArray.map(doc => {
          console.log(doc);
          return (
            {
              id: doc.payload.doc.id,
              name: doc.payload.doc.data()['name'],
              duration: doc.payload.doc.data()['duration'],
              calories: doc.payload.doc.data()['calories'],
            }
            // doc
          );
        });
      }))
      .subscribe(exercices => {
        this.availableExercise = exercices;
        this.exercisesChanged.next([...this.availableExercise]);
      });
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercise.find(ex => ex.id === selectedId);
    this.exerciseChanged.next({...this.runningExercise});
  }

  completeExercise() {
    this.exercises.push({...this.runningExercise, date: new Date(), state: 'completed'});
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelledExercise(progress: number) {
    this.exercises.push({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getRunningExercise() {
    return {...this.runningExercise};
  }

  getCompletedOrCancelledExercises() {
    return this.exercises.slice();
  }

}
