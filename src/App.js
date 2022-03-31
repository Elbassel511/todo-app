import classes from './App.module.scss';
import Header from './components/layouts/Header/Header';
import Container from './components/UI/Container';
import AppBody from './components/app-components/AppBody';
import ThemeProvider from './themes/ThemeProvider';

function App() {
  return (

    <ThemeProvider>
      <Container>
        <div className={classes.container}>
          <div>
            <Header />
            <AppBody />
          </div>
          <footer className={classes.info}>
            Drag and drop to arrange list
          </footer>
        </div>
      </Container>
    </ThemeProvider>



  );
}

export default App;
