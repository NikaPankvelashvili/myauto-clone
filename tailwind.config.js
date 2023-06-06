/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "bgColor": "#E5E5E5",
        "myauto-orange": "#FD4100",
        "grey": "#F9F9FB"

      },
      padding: {
        "435px": "435px",
      },
      width: {
        "30px": "30px",
        "250px": "250px",
      },
      height: {
        "14px": "14px"
      },
      borderColor: {
        "grey": "#E9E9F0",
        "orange": "#FD4100"
      },
      textColor: {
        "default": "#272A37"
      }
    },
  },
  plugins: [],
}

