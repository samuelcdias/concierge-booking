import { NextComponentType } from "next";
import SignIn from "../SignIn";

import { Container, Row, Col } from "@components/index";
import Footer from "@components/Footer";
import Header from "@components/Header";
import Sidebar from "@components/SideBar";
import Notification from "@components/notifications";
import { UserProvider } from "@contexts/UserContext";

function withAuth<T>(Component: NextComponentType<T>) {
  const Auth = (props: T) => {
    // Login data added to props via redux-store (or use react context for example)
    const { isLoggedIn } = props;

    // If user is not logged in, return login component
    if (!isLoggedIn) {
      return <SignIn />;
    }

    // If user is logged in, return original component
    return <Component {...props} />;
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
}

function App({ children }) {
  return (
    <div className="App">
      <UserProvider>
        <Container fluid>
          <Row>
            <Header title="Concierge" />
          </Row>
          <Row className="container-page-content">
            <Notification />

            <Col md={1}>
              <Sidebar />
            </Col>
            <Col>{children}</Col>
            <Col md={1}></Col>
          </Row>
        </Container>
        <Footer />
      </UserProvider>
    </div>
  );
}

export default withAuth(App);
