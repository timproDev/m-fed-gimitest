// GA Event Tracking    

// Marsh.com | Main Header, Insights link
$(".main-nav-wrapper li ul li:first-of-type a").on("click", function() {
    ga("send", "event", {
        eventCategory: 'Insights',
        eventAction: 'Main Nav Usage',
        eventLabel: 'Clicked'
    });
});

// Marsh.com | Marsh.com Header Login Usage
marshTrack( '.utility-forms #signIn', 'login', 'Header Login' );

// Marsh.com | Marsh.com Modal Login Usage
marshTrack( '.utility-forms #signinModal', 'login', 'Modal Login' );

// TSP onlin.marsh.com | TSP Login Usage
marshTrack( '#logIn #loginButton', 'Login', 'Main Login' );

// TSP onlin.marsh.com | Forget Password Function Usage
marshTrack( '#logIn .forget_pswd', 'Login', 'Failed Login' );

// TSP onlin.marsh.com | Password Retrieval Function Usage
marshTrack( '#resetPswd #resetButton', 'Password Retrieval', 'Password Retrieval' );

// TSP onlin.marsh.com | Password Cancellation Function Usage
marshTrack( "#resetPswd .options .cancel", 'Password Retrieval', 'Password Retrieval Cancellation' );

// marshTrack Function
marshTrack( selector, eventCatagory, eventAction ) {
    $(selector).on("click", function() {
        ga("send", "event", {
            eventCategory: eventCatagory,
            eventAction: eventAction,
            eventLabel: 'Clicked'
        });
    });
};

