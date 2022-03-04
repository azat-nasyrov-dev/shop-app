import {createSlice} from '@reduxjs/toolkit';

export const name = 'notifier';

export const notifierSlice = createSlice({
  name,
  initialState: {
    notifications: []
  },
  reducers: {
    addNotification: (state, action) => {
      let notification = action.payload;

      state.notifications.push({
        ...notification,
        key: notification.key || new Date().getTime() + Math.random(),
      });
    },
    closeNotification: (state, {payload: {dismissAll, key}}) => {
      state.notifications.forEach(notification => {
        if (dismissAll || notification.key === key) {
          notification.dismissed = true;
        }
      });
    },
    removeNotification: (state, {payload: {key}}) => {
      const index = state.notifications.findIndex(notification => notification.key === key);
      state.notifications.splice(index, 1);
    },
  }
});

export default notifierSlice;