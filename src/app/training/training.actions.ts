import {Action} from '@ngrx/store';
import {Exercise} from './exercise.model';

export const SET_AVAILABLE_TRAININGS = '[TRAINING] Set available trainings';
export const SET_FINISHED_TRAININGS = '[TRAINING] Set finished trainings';
export const START_TRAINING = '[TRAINING] Start training';
export const STOP_TRAINING = '[TRAINING] Stop training';


export class SetAvailableTraining implements Action {
  readonly type = SET_AVAILABLE_TRAININGS;
  constructor(public payload: Exercise[]) {
  }
}

export class SetFinishedTraining implements Action {
  readonly type = SET_FINISHED_TRAININGS;
  constructor(public payload: Exercise[]) {
  }
}

export class StartTraining implements Action {
  readonly type = START_TRAINING;
  constructor(public payload: Exercise) {
  }
}

export class StopTraining implements Action {
  readonly type = STOP_TRAINING;
}

export type TrainingActions = SetAvailableTraining | SetFinishedTraining | StartTraining | StopTraining;
