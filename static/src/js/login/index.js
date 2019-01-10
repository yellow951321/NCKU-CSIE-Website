import WebLanguageUtils from 'static/src/js/utils/language.js';
import serverSetting from 'settings/server/config.js';
import header from 'static/src/js/components/common/header/index.js';

header( document.getElementById( 'header' ) );

const currentLanguage = WebLanguageUtils.currentLanguage;

const login = document.getElementById( 'login' );
const forget = document.getElementById( 'forget' );
const verify = document.getElementById( 'verify' );
const reset = document.getElementById( 'reset' );

const input = () => {
    const button = login.querySelector( '.login__button' );
    const account = login.querySelector( '.login__input--account' );
    const password = login.querySelector( '.login__input--password' );
    if ( account.value !== '' && password.value !== '' ) {
        button.disabled = false;
        button.classList.add( 'login__button--valid' );
    }
    else {
        button.disabled = true;
        button.classList.remove( 'login__button--valid' );
    }
};
const loginClear = () => {
    login.querySelector( '.login__input--account' ).value = '';
    login.querySelector( '.login__input--password' ).value = '';

    login.querySelector( '.login__button' ).classList.remove( 'login__button--valid' );
}

login.querySelector( '.login__input--account' ).addEventListener( 'input', input );
login.querySelector( '.login__input--password' ).addEventListener( 'input', input );

const toForget = (event) => {
    event.preventDefault();

    loginClear();
    login.classList.add( 'login--hidden' );
    forget.classList.remove( 'forget--hidden' );
}

login.querySelector( '.login__forget' ).addEventListener( 'click' , toForget);

const reqURL = `${ serverSetting.host }/api/auth/login?language=${ currentLanguage }`;

login.addEventListener( 'submit', ( event ) => {
    event.preventDefault();

    const account = login.querySelector( '.login__input--account' );
    const password = login.querySelector( '.login__input--password' );

    fetch(reqURL, {
        method: 'post',
        body: JSON.stringify({'account': account.value, 'password': password.value}),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then( res => res.json() )
    .then( data => {
        const error = login.querySelector( '.login__error' );
        if( data[ 'response' ] === 'success' )
        {
            loginClear();
            error.classList.add( 'login__error--hidden' );
            window.location = `${ serverSetting.host }/?language=${ currentLanguage }`;
        }
        else
        {
            loginClear();
            login.querySelector( '.login__reset' ).classList.add( 'login__reset--hidden' );
            login.querySelector( '.login__forget' ).classList.remove( 'login__forget--hidden' );
            if( error.classList.contains( 'login__error--hidden' ))
                error.classList.remove( 'login__error--hidden' );
        }
        return true
    })
})

// js about forget
const forgetButton = () => {
    const account = forget.querySelector( '.forget__input' );
    const button = forget.querySelector( '.forget__button' );
    if ( account.value !== '' ) {
        button.disabled = false;
        button.classList.add( 'forget__button--valid' );
    }
    else {
        button.disabled = true;
        button.classList.remove( 'forget__button--valid' );
    }
};

const forgetClear = () => {
    forget.querySelector( '.forget__input' ).value = '';

    forget.querySelector( '.forget__button' ).classList.remove( 'forget__button--valid' );
}

forget.querySelector( '.forget__input' ).addEventListener( 'input', forgetButton );

forget.addEventListener( 'submit', ( event ) => {
    event.preventDefault();

    const reqURL = `${ serverSetting.host }/api/auth/login/forget?language=${ currentLanguage }`;
    const error = forget.querySelector( '.forget__error' );
    const account = forget.querySelector( '.forget__input' )
    fetch(reqURL, {
        method: 'post',
        body: JSON.stringify({'account': account.value}),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then( res => res.json() )
    .then( data => {
        if( data[ 'response' ] === 'success' )
        {
            forgetClear();
            error.classList.add( 'forget__error--hidden' );

            forget.classList.add( 'forget--hidden' );
            verify.classList.remove( 'verify--hidden' );
        }
        else
        {
            forgetClear();
            if( error.classList.contains( 'forget__error--hidden' ))
                error.classList.remove( 'forget__error--hidden' );
        }
        return true
    })
})

// js about verify
const verifyButton = () => {
    const input = verify.querySelector( '.verify__code' );
    const button = verify.querySelector( '.verify__button' );
    if ( input.value !== '' ) {
        button.disabled = false;
        button.classList.add( 'verify__button--valid' );
    }
    else {
        button.disabled = true;
        button.classList.remove( 'verify__button--valid' );
    }
};

const verifyClear = () => {
    verify.querySelector( '.verify__code' ).value = '';

    verify.querySelector( '.verify__button' ).classList.remove( 'verify__button--valid' );
}

verify.querySelector( '.verify__code' ).addEventListener( 'input', verifyButton );

verify.addEventListener( 'submit', ( event ) => {
    event.preventDefault();

    const reqURL = `${ serverSetting.host }/api/auth/login/verify?language=${ currentLanguage }`;
    const error = verify.querySelector( '.verify__error' );
    const input = verify.querySelector( '.verify__code' )
    fetch(reqURL, {
        method: 'post',
        body: JSON.stringify({'verify': input.value}),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then( res => res.json() )
    .then( data => {
        if( data[ 'response' ] === 'success' )
        {
            verifyClear();
            error.classList.add( 'verify__error--hidden' );

            verify.classList.add( 'verify--hidden' );
            reset.classList.remove( 'reset--hidden' );
        }
        else
        {
            verifyClear();
            if( error.classList.contains( 'verify__error--hidden' ))
                error.classList.remove( 'verify__error--hidden' );
        }
        return true
    })
})

//js about reset
const resetButton = () => {
    const account = reset.querySelector( '.reset__input' );
    const check = reset.querySelector( '.reset__input--check' );
    const button = reset.querySelector( '.reset__button' );
    if ( account.value !== '' && check.value !== '' ) {
        button.disabled = false;
        button.classList.add( 'reset__button--valid' );
    }
    else {
        button.disabled = true;
        button.classList.remove( 'reset__button--valid' );
    }
};

const resetClear = () => {
    reset.querySelector( '.reset__input' ).value = '';
    reset.querySelector( '.reset__input--check' ).value = '';

    reset.querySelector( '.reset__button' ).classList.remove( 'reset__button--valid' );
}

reset.querySelector( '.reset__input' ).addEventListener( 'input', resetButton );
reset.querySelector( '.reset__input--check' ).addEventListener( 'input', resetButton );

reset.addEventListener( 'submit', ( event ) => {
    event.preventDefault();

    const reqURL = `${ serverSetting.host }/api/auth/login/reset?language=${ currentLanguage }`;
    const error = reset.querySelector( '.reset__error' );
    const account = reset.querySelector( '.reset__input' );
    const check = reset.querySelector( '.reset__input--check' );
    fetch(reqURL, {
        method: 'post',
        body: JSON.stringify( { 'account': account.value, 'check': check.value } ),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then( res => res.json() )
    .then( data => {
        if( data[ 'response' ] === 'success' )
        {
            resetClear();
            error.classList.add( 'reset__error--hidden' );

            reset.classList.add( 'reset--hidden' );
            login.classList.remove( 'login--hidden' );

            login.querySelector( '.login__forget' ).classList.add( 'login__forget--hidden' );
            login.querySelector( '.login__error' ).classList.add( 'login__error--hidden' );
            login.querySelector( '.login__reset' ).classList.remove( 'login__reset--hidden' );
        }
        else
        {
            resetClear();
            if( error.classList.contains( 'reset__error--hidden' ))
                error.classList.remove( 'reset__error--hidden' );
        }
        return true
    })
})