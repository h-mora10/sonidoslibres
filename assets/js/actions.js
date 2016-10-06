export const addRequest = request => ({ type: 'ADD_REQUEST', data: request });
export const getSoundTracks = (soundtracks) => ({ type: 'GET_SOUNDTRACKS', data: soundtracks });
export const showSAModal = (modalProps) => ({ type: 'SHOW_SA_MODALS', data: modalProps });
export const hideSAModal = () => ({ type: 'HIDE_SA_MODALS' });

export const fetchSoundTracks = () => {
  return dispatch => {
    jQuery.ajax({
        method: "GET",
        url: "http://localhost:8000/comercial_agent/get-sounds",
        statusCode: {
        200: (data) => {
          dispatch(getSoundTracks(data))
        },
        404: (err) => {
          dispatch(showSAModal({
            show: true,
            type: "error",
            title: "Error",
            text: `status: ${err.status} \nstatusText: ${err.statusText}`
          }))
        }
      }
    });
  }
};
export const fetchNotifications = () => {
  return dispatch => {
    jQuery.ajax({
        method: "GET",
        url: "http://localhost:8000/comercial_agent/notificationJSON",
        statusCode: {
        200: (data) => {
            console.log(data)
          dispatch(receiveData(data))
        },
        404: (err) => {
          dispatch(showSAModal({
            show: true,
            type: "error",
            title: "Error",
            text: `status: ${err.status} \nstatusText: ${err.statusText}`
          }))
        }
      }
    });
  }
};
