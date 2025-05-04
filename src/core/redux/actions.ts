import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequest } from "../axios";

export const getDomains = createAsyncThunk("Domains/getDomains", async () => {
    // Empty .get('') will send request to baseURL: https://6797aa2bc2c861de0c6d964c.mockapi.io/domain
    const res = await sendRequest.get("");
    const data = await res.data;
    return data;
});
