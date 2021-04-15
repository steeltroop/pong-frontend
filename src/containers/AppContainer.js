import { connect } from "react-redux";
import App from "../components/app/App";
import * as userActions from "../redux/actions/userActions";

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => {
    dispatch(userActions.setUser(user));
  },
});

export default connect(
  null,
  mapDispatchToProps
)(App);
