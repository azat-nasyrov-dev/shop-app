import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useSnackbar} from 'notistack';
import {removeNotification} from "../../store/actions/notifierActions";

let displayed = [];

const Notifier = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(state => state.notifier.notifications);
  const {enqueueSnackbar, closeSnackbar} = useSnackbar();

  const storeDisplayed = key => {
    displayed = [...displayed, key];
  };

  const removeDisplayed = key => {
    displayed = [...displayed.filter(key => key !== key)];
  };

  useEffect(() => {
    notifications.forEach(({key, message, options = {}, dismissed = false}) => {
      if (dismissed) {
        closeSnackbar(key);
        return;
      }

      if (displayed.includes(key)) return;

      enqueueSnackbar(message, {
        key,
        ...options,
        onClose: (event, reason, myKey) => {
          if (options.onClose) {
            options.onClose(event, reason, myKey);
          }
        },
        onExited: (event, myKey) => {
          dispatch(removeNotification(myKey));
          removeDisplayed(myKey);
        },
      });

      storeDisplayed(key);
    });
  }, [notifications, closeSnackbar, enqueueSnackbar, dispatch]);

  return null;
};

export default Notifier;