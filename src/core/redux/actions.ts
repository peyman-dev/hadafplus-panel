import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequest } from "../axios";
import { DomainAddType, DomainUpdateType, SortsType } from "../types/types";

export const getDomains = createAsyncThunk("Domains/getDomains", async () => {
  // Empty .get('') will send request to baseURL: https://6797aa2bc2c861de0c6d964c.mockapi.io/domain
  const res = await sendRequest.get("");
  const data = await res.data;
  return data;
});

export const addDomain = createAsyncThunk(
  "Domains/addDomain",
  async (payload: DomainAddType, { rejectWithValue, dispatch }) => {
    try {
      const res = await sendRequest({
        method: "POST",
        data: payload,
      });
      dispatch(getDomains());
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const removeDomain = createAsyncThunk(
  "Domains/removeDomain",
  async (domainID: string, { rejectWithValue, dispatch }) => {
    if (!domainID) {
      return rejectWithValue({
        message: "Domain ID Is missing !",
        status: 400,
        ok: false,
      });
    }
    try {
      const res = await sendRequest.delete(`/${domainID}`);
      const data = await res.data;
      
      if (res.status == 200) {
        dispatch(getDomains());
      }

      return data;
    } catch (error: any) {
      return rejectWithValue({
        message: error?.message,
        status: 400,
        ok: false,
      });
    }
  }
);

export const updateDomain = createAsyncThunk(
  "Domains/updateDomain",
  async (payload: DomainUpdateType, { dispatch, rejectWithValue }) => {
    try {
      const res = await sendRequest.put(`/${payload.id}`, payload);

      if (res.status == 200) {
        dispatch(getDomains());
      }

      return res;
    } catch (error: any) {
      return rejectWithValue({
        message: error.message,
        status: 400,
        ok: false,
      });
    }
  }
);
