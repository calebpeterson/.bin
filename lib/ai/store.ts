import { merge } from "lodash";

export type Action<State, Args extends unknown[] = []> = (
  state: State,
  ...args: Args
) => Promise<Partial<State> | void>;

export class Store<State> {
  private state: State;

  constructor(initialState: State) {
    this.state = initialState;
  }

  getState(): State {
    return this.state;
  }

  setState(state: State): void {
    this.state = state;
  }

  get<K extends keyof State>(key: K): State[K] {
    return this.state[key];
  }

  set<K extends keyof State>(key: K, value: State[K]): void {
    this.state[key] = value;
  }

  async execute<Args extends unknown[]>(
    mutation: Action<State, Args>,
    ...args: Args
  ): Promise<void> {
    const newState = await mutation(this.state, ...args);
    if (newState) {
      this.state = merge(newState);
    }
  }
}
