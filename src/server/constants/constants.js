module.exports = {
    GOOGLE_OAUTH_SCOPE: ['profile', 'email'],
    GITHUB_OAUTH_SCOPE: ['user:email'],

    LOCAL_AUTH: {
        LOGIN: 'login-local',
        REGISTER: 'register-local',
    },

    PAYMENT_METHODS: "card, ideal", // ideal -> european payment method -> less fields to type, so easier for development
    AUTO_LOCALE: 'auto',

    STRONG_PASSWORD_REGEX: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}/, // contains at least one of each of lowercase/uppercase/numerics/special char/8+ char
    EMAIL_REGEX: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    
    BASE_PRICE: 1000, // cents
    CURRENCY: 'EUR', // needed for ideal payment method to work
}