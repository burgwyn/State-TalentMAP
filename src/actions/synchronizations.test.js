import { setupAsyncMocks } from '../testUtilities/testUtilities';
import * as actions from './synchronizations';

const { mockStore, mockAdapter } = setupAsyncMocks();

describe('async actions', () => {
  beforeEach(() => {
    mockAdapter.onGet('http://localhost:8000/api/v1/data_sync/').reply(200,
      { data: [{ id: 1 }] },
    );

    mockAdapter.onPut('http://localhost:8000/api/v1/data_sync/run/1/').reply(200,
      null,
    );

    mockAdapter.onPut('http://localhost:8000/api/v1/data_sync/run/2/').reply(404,
      null,
    );
  });

  it('fetches sync jobs', (done) => {
    const store = mockStore({ comparisons: [] });

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.syncsFetchData());
        done();
      }, 0);
    };
    f();
  });

  it('handles errors when fetching sync jobs', (done) => {
    const store = mockStore({});

    mockAdapter.onGet('http://localhost:8000/api/v1/data_sync/').reply(404,
      null,
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.syncsFetchData());
        done();
      }, 0);
    };
    f();
  });

  it('puts sync jobs', (done) => {
    const store = mockStore({ comparisons: [] });

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.putAllSyncs());
        done();
      }, 0);
    };
    f();
  });

  it('puts sync jobs when some are invalid', (done) => {
    const store = mockStore({ comparisons: [] });

    mockAdapter.onGet('http://localhost:8000/api/v1/data_sync/').reply(200,
      { data: [{ id: 1 }, { id: 2 }] },
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.putAllSyncs());
        done();
      }, 0);
    };
    f();
  });

  it('handles errors when all sync jobs are invalid', (done) => {
    const store = mockStore({ comparisons: [] });

    mockAdapter.onGet('http://localhost:8000/api/v1/data_sync/').reply(200,
      { data: [{ id: 1 }] },
    );

    mockAdapter.onPut('http://localhost:8000/api/v1/data_sync/run/1/').reply(404,
      null,
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.putAllSyncs());
        done();
      }, 0);
    };
    f();
  });

  it('handles errors on GET when putting sync jobs', (done) => {
    const store = mockStore({});

    mockAdapter.onGet('http://localhost:8000/api/v1/data_sync/').reply(404,
      null,
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.putAllSyncs());
        done();
      }, 0);
    };
    f();
  });

  it('handles errors on PUT when putting sync jobs', (done) => {
    const store = mockStore({});

    mockAdapter.onPut('http://localhost:8000/api/v1/data_sync/run/1/').reply(404,
      null,
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.putAllSyncs());
        done();
      }, 0);
    };
    f();
  });
});
