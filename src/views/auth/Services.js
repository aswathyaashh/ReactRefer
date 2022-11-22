
export function runLogoutTimer(dispatch,timer){
    setTimeout(() => {
        dispatch(logout())
    },5000);
}

