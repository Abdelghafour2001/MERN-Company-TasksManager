import { configureStore } from '@reduxjs/toolkit';
import localReducer from '../features/local/localSlice';
import authReducer from '../features/auth/authSlice';
import companyReducer from '../features/company/companySlice';
import businessReducer from '../features/business/businessSlice';
import employeeReducer from '../features/employee/employeeSlice';
import shiftReducer from '../features/shift/shiftSlice';
import inviteReducer from '../features/invite/inviteSlice';
import globalMessageReducer from '../features/globalMessage/globalMessageSlice';
import taskReducer from '../features/task/taskSlice';
import ticketReducer from '../features/ticket/ticketSlice';
import trainingReducer from '../features/training/trainingSlice';

export const store = configureStore({
  reducer: {
    local: localReducer,
    auth: authReducer,
    company: companyReducer,
    business: businessReducer,
    employee: employeeReducer,
    shift: shiftReducer,
    invite: inviteReducer,
    globalMessage: globalMessageReducer,
    task: taskReducer,
    ticket: ticketReducer,
    training: trainingReducer,
  },
  // middleware: getDefaultMiddleware =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   })
});
