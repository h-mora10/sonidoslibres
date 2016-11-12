// cb == callback
export const auth = {
  artist(){
    return getRole("artist");
  },
  comercial_agent(){
    return getRole("comercial_agent");
  },
  onChange() {},
  getToken() {
    return localStorage.token
  },
  login(credentials, cb) {
    cb = arguments[arguments.length - 1]
    /*
    $.ajax({
      method: 'POST',
      url: `${SERVER_URL}/comercial_agent/notifications/${notificationId}`,
      data: JSON.stringify(notificationObj),
    })
    .done(( msg ) => {
      auth.login()
    })
    .fail((err) => {
      console.error(err);
    })
    */
    pretendRequest(credentials.username, credentials.password, (res) => {
      if (res.authenticated) {
        localStorage.token = res.token
        localStorage.role = res.role
        if (cb) cb(true,res)
        this.onChange(true)
      } else {
        if (cb) cb(false)
        this.onChange(false)
      }
    })
  },

  logout(cb) {
    delete localStorage.token
    if (cb) cb()
    this.onChange(false)
  },

  loggedIn() {
    return !!localStorage.token
  },
}

function notAuthorize(nextState,replace){
  replace({
    pathname: '/',
    state: { nextPathname: nextState.location.pathname }
  })
}
// #ToDo delete below function, is just for dev proposes
function pretendRequest(email, pass, cb) {
  setTimeout(() => {
    if (email === 'coemrcial_agent@example.com' && pass === '12345678') {
      cb({
        role: "comercial_agent",
        authenticated: true,
        token: Math.random().toString(36).substring(7)
      })
    }else if (email === 'artist@example.com' && pass === '12345678') {
      cb({
        id: 1,
        role: "artist",
        authenticated: true,
        token: Math.random().toString(36).substring(7)
      })
    } else {
      cb({ authenticated: false })
    }
  }, 0)
}
function getRole(role){
  return localStorage.role == role ? true : false;
}
export const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    notAuthorize(nextState,replace);
  }
}

export const isArtist = (nextState, replace) => {
  if (!auth.artist()) {
    notAuthorize(nextState, replace);
  }
}
export const isComercialAgent = (nextState, replace) => {
  if (!auth.comercial_agent()) {
    notAuthorize(nextState, replace);
  }
}