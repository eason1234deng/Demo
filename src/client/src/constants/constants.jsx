const SIGN_IN = "signin";
const HOME = "home";
const REGISTER = "register";
const PAYMENT = "Payment";

const LOCALES = 'en-US';

const MAX_TOP_UP_COUNT = 10;
const MIN_TOP_UP_COUNT = 1;

const INCLUDE_CREDENTIAL_HEADER = {
    credentials: "include",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
    }
};

const PARTICLE_OPTIONS = {
    particles: {
        number: {
            value: 50,
            density: {
                enable: true,
                value_area: 800 
            }
        },
        size: {
            value: 5
        },
        line_linked: {
            shadow: {
                enable: true,
                color: "#3CA9D1",
                blur: 5
            }
        }
    },
    interactivity: {
        events: {
            onhover: {
                enable: true,
                mode: "repulse"
            }
        }
    }
};

const IMAGE_UNHOVER_POSITION = {
    topHovered: -1,
    leftHovered: -1
};

const MIN_HEIGHT_THRESHOLD = 40; // If image 1 is located at least 40px above  image 2 => image 1 is counted first

const LOGO = "https://i.pinimg.com/originals/54/7a/9c/547a9cc6b93e10261f1dd8a8af474e03.jpg";

const DRAW_IMAGE = 'draw_image';

export default {
    SIGN_IN,
    HOME,
    REGISTER,
    PAYMENT,
    INCLUDE_CREDENTIAL_HEADER,
    LOCALES,
    MAX_TOP_UP_COUNT,
    MIN_TOP_UP_COUNT,
    PARTICLE_OPTIONS,
    IMAGE_UNHOVER_POSITION,
    MIN_HEIGHT_THRESHOLD,
    LOGO,
    DRAW_IMAGE
};