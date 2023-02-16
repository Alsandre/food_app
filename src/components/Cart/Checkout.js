import useInput from "../../hooks/use-input";

const Checkout = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    valueChangeHandler: nameChangeHandler,
  } = useInput((value) => value.trim().length > 0);
  const {
    value: enteredCity,
    isValid: enteredCityIsValid,
    valueChangeHandler: cityChangeHandler,
  } = useInput((value) => value.trim().length > 0);
  const {
    value: enteredPostal,
    isValid: enteredPostalIsValid,
    valueChangeHandler: postalChangeHandler,
  } = useInput(
    (value) => value.trim().length === 5 && typeof +value === "number"
  );

  const userData = {
    name: enteredName,
    city: enteredCity,
    postal: enteredPostal,
  };

  const confirmationHandler = (e) => {
    e.preventDefault();
    if (enteredPostalIsValid && enteredCityIsValid && enteredNameIsValid) {
      props.onConfirmation(userData);
    }
  };

  return (
    <form onSubmit={confirmationHandler}>
      <div>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={enteredName}
          onChange={nameChangeHandler}
        />
      </div>
      <div>
        <label htmlFor="city">Your City</label>
        <input
          type="text"
          id="city"
          value={enteredCity}
          onChange={cityChangeHandler}
        />
      </div>
      <div>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          value={enteredPostal}
          onChange={postalChangeHandler}
        />
      </div>
      <button>Confirm</button>
    </form>
  );
};

export default Checkout;
