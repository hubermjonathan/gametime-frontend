/* eslint-disable */
import axios from 'axios';
import cookie from 'js-cookie';

/**
 * Middleware for axios requests that adds relevant auth headers.
 */
axios.interceptors.request.use((config) => {
  // May additionally add a check to renew session token before continuing with request
  // config.headers.Authorization = 'eyJraWQiOiJmUk1xT1J0SFNTcnk3RWNsYmtQbXlVK1wvZlNabjhWOElWWU5vY3A0K3Ricz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI3Nzg4ZjMxMy05ZGEzLTQ2NzktOGI5OC1lNWQ2NTQ4YmRhNGEiLCJldmVudF9pZCI6ImRhNjhmY2EzLWI2ZWEtNGUzYi1iNjE1LWQwZDc3YTBmMzk5NiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2MDQwMjQxMTIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0yX1cwRXRtZHg0cyIsImV4cCI6MTYwNDExMDUxMiwiaWF0IjoxNjA0MDI0MTEyLCJqdGkiOiI4N2M0YmE4YS0wZmY4LTRkMWMtOGNiNC04ZDE4ZTJkOTQ0YTkiLCJjbGllbnRfaWQiOiI3dWQxcXJ1OGV1Mm8xdmh0Nm9vNnBodXRudSIsInVzZXJuYW1lIjoiNzc4OGYzMTMtOWRhMy00Njc5LThiOTgtZTVkNjU0OGJkYTRhIn0.aLCW2MrCGuo-Pu6w1zU6M19L10UQMXk4m_Ng7YmqzSwQSLtD4rRF0ySOCXeoyAVrqZy0u9rKWMmX1MyNEyJs4_KuwIas_bgCxJOuYOMT14433iXSbqKd9kbi06QmtfKdGwNRQsYqsEm1vuhbEX5gc6lwUkxKV-3pivq1p6Cyzy9um9Jlvz3ijmNTP3BDBWBcaQVCR6EifBUPWUI_RA9LAbq2cz2Ff4PFBdCPd2rRTtlmkwzVSfLSGiV8UisUWEuysr9lZ3JAhT1xWwc7uY5U7BkkCvVhkDd4dQl_YfL6IO3rvOioFNaTI-_mb5F-tMsrg5pMVPZ5y5BMBRVWTx3uUQ';
  // return config;
  const access_token = cookie.get('access_token');
  if (access_token) {
    config.headers.Authorization = access_token;
  }
  return config;
});

export default axios;
