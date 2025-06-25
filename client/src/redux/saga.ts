import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  fetchVendorsSuccess,
  fetchVendorsFailure,
  fetchVendorsRequest,
} from "./slices/vendorsSlice";
import { Vendor } from "../types";

export function* fetchVendorsWorker() {
  try {
    const response: Response = yield call(fetch, "/api/vendors");
    if (!response.ok) throw new Error("Failed to fetch vendors");
    const json: unknown = yield call([response, "json"]);
    const data = json as { vendors: Vendor[] };
    yield put(fetchVendorsSuccess(data.vendors));
  } catch (error) {
    yield put(fetchVendorsFailure());
  }
}

export function* watchFetchVendors() {
  yield takeLatest(fetchVendorsRequest.type, fetchVendorsWorker);
}

export default function* rootSaga() {
  yield all([watchFetchVendors()]);
}
