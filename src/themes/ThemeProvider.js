import React, { useEffect } from "react";


export const theme = React.createContext();


function ThemeProvider(props) {
    const [isDark, setTheme] = React.useState(false);

    useEffect(() => {
        const perferedDark = +localStorage.getItem('isDark') | 0;
        console.log(perferedDark);
        perferedDark === 1 ? setTheme(true) : setTheme(false);
    }, []);

    const toggleTheme = () => {
        setTheme((prev) => {
            !prev ? localStorage.setItem('isDark', 1) : localStorage.setItem('isDark', 0);
            return (!prev);
        }
        );
    };

    return (
        <theme.Provider value={{ isDark, toggleTheme }}>
            {props.children}
        </theme.Provider>
    );
}

export default ThemeProvider;