module.exports = {
    CLIENT_HOME_PAGE: 'http://localhost:3000',
    SERVER_ROOT: 'http://localhost:5000',

    GOOGLE_OAUTH_CB_URL: '/auth/google/callback',
    GOOGLE_OAUTH_SCOPE: ['profile', 'email'],

    GITHUB_OAUTH_CB_URL: `http://localhost:5000/auth/github/callback`,
    GITHUB_OAUTH_SCOPE: ['user:email'],

    LOCAL_AUTH: {
        LOGIN: 'login-local',
        REGISTER: 'register-local',
    },

    STRIPE_PUBLISHABLE_KEY: 'pk_test_51Grr7WCI5VP73Rhbp86j9hYXGKqST5u3Vi6wnikJDgGn87IwyKpkoEl7GjVRdUTbjJFZRoxAAG9qPtKyGDfn17yn00N1Vwg8Il',

    PAYMENT_METHODS: "card, ideal", // ideal -> european payment method -> less fields to type, so easier for development
    AUTO_LOCALE: 'auto',

    STRONG_PASSWORD_REGEX: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}/, // contains at least one of each of lowercase/uppercase/numerics/special char/8+ char
    EMAIL_REGEX: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    
    BASE_PRICE: 1000, // cents
    CURRENCY: 'EUR', // needed for ideal payment method to work

    SALT_ROUND: 10,
}