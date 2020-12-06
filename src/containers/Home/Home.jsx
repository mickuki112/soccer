import React, { Component } from "react";
import styles from "./Home.module.sass";
import AddressScreen from "../AddressScreen/AddressScreen";
import CreateAccount from "../CreateAccount/CreateAccount";
import DoneScreen from "../DoneScreen/DoneScreen";

class Home extends Component {
  state = {
    showComponent: 0,
  };

  changeComponent = (val) => {
    this.setState({
      showComponent: val.showComponent,
      ...val.data,
    });
  };

  render() {
    const { showComponent } = this.state;
    return (
      <>
        <div className={styles.container}>
          {showComponent === 0 ? (
            <CreateAccount
              changeComponent={(val) => this.changeComponent(val)}
            />
          ) : showComponent === 1 ? (
            <AddressScreen
              changeComponent={(val) => this.changeComponent(val)}
            />
          ) : (
            <DoneScreen />
          )}
        </div>
      </>
    );
  }
}

export default Home;
