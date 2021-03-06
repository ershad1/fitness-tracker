import {Injectable} from '@angular/core';
import {Exercise} from './exercise.model';
import {Subject, Subscription} from 'rxjs';
import {AngularFirestore} from 'angularfire2/firestore';
import {map} from 'rxjs/operators';
import {UiService} from '../shared/service/ui.service';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import {Store} from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();

  finishedExercisesChanges = new Subject<Exercise[]>();

  private availableExercise: Exercise[] = [];
  private runningExercise: Exercise;

  private fireBaseSubscription: Subscription[] = [];

  constructor(
    private db: AngularFirestore,
    private uiService: UiService,
    private store: Store<fromRoot.State>) {
  }

  fetchAvailableExercises() {
    this.store.dispatch(new UI.StartLoading);
    this.fireBaseSubscription.push(this.db.collection('availableExercises')
      .snapshotChanges()
      .pipe(map(docArray => {
        return docArray.map(doc => {
          // console.log(doc);
          return (
            {
              id: doc.payload.doc.id,
              name: doc.payload.doc.data()['name'],
              duration: doc.payload.doc.data()['duration'],
              calories: doc.payload.doc.data()['calories'],
            }
          );
        });
      }))
      .subscribe((exercices: Exercise[]) => {
        this.store.dispatch(new UI.StopLoading);
        this.availableExercise = exercices;
        this.exercisesChanged.next([...this.availableExercise]);
      }, error => {
        this.store.dispatch(new UI.StopLoading);
        this.exercisesChanged.next(null);
        this.uiService.showSnackBar('Fetching exercises failed, please try again later', null, 3000);
      }));
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercise.find(ex => ex.id === selectedId);
    this.exerciseChanged.next({...this.runningExercise});
  }

  completeExercise() {
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelledExercise(progress: number) {
    this.addDataToDatabase({
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

  fetchCompletedOrCancelledExercises() {
    this.fireBaseSubscription.push(this.db
      .collection('finishedExercises')
      .valueChanges()
      .subscribe((exercises: Exercise[]) => {
        this.finishedExercisesChanges.next(exercises);
      }));
  }

  cancelSubscription() {
    this.fireBaseSubscription.forEach(subscription => subscription.unsubscribe());
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }

}
