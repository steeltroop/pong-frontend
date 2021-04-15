import { connect } from "react-redux";
import App from "../components/app/App";
import * as userActions from "../redux/actions/userActions";

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => {
    dispatch(userActions.setUser(user));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
