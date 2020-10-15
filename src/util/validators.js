const isEmail = (email) => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
  else return false;
};

const isEmpty = (string) => {
  if (string.trim() === "") return true;
  else return false;
};

exports.validataSignupData = (data) => {
  let errors = {};
  const {
    orgName,
    email,
    password,
    confirmedEmail,
    confirmedPassword,
    address,
    tel,
  } = data;

  // check orgName
  if (isEmpty(orgName)) {
    errors.orgName = "Must not be empty";
  }
  // check email
  if (isEmpty(email)) {
    errors.email = "Must not be empty";
  } else if (!isEmail(email)) {
    errors.email = "Must be a valid email address";
  } else if (email !== confirmedEmail) {
    errors.email = "Email and confirmedEmail is not same";
  }

  if (isEmpty(confirmedEmail)) {
    errors.confirmedEmail = "Must not be empty";
  } else if (!isEmail(confirmedEmail)) {
    errors.confirmedEmail = "Must be a valid confirmedEmail address";
  } else if (email !== confirmedEmail) {
    errors.email = "Email and confirmedEmail is not same";
  }
  // check password
  if (isEmpty(password)) {
    errors.password = "Must not be empty";
  } else if (password !== confirmedPassword) {
    errors.password = "Email and confirmedEmail is not same";
  }
  //
  if (isEmpty(confirmedPassword)) {
    errors.confirmedPassword = "Must not be empty";
  } else if (password !== confirmedPassword) {
    errors.confirmedPassword = "Email and confirmedEmail is not same";
  }
  // check address
  if (isEmpty(address)) {
    errors.address = "Must not be empty";
  }
  // check tel
  if (isEmpty(tel)) {
    errors.tel = "Must not be empty";
  }
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

exports.validataSigninData = (data) => {
  let errors = {};
  const { email, password, } = data;

  // check email
  if (isEmpty(email)) {
    errors.email = "Must not be empty";
  } else if (!isEmail(email)) {
    errors.email = "Must be a valid email address";
  }
  // check password
  if (isEmpty(password)) {
    errors.password = "Must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
}

exports.validataAttendData = (data) => {
  let errors = {};
  const { email, password,submitStatus } = data;

  // check email
  if (isEmpty(email)) {
    errors.email = "Must not be empty";
  } else if (!isEmail(email)) {
    errors.email = "Must be a valid email address";
  }
  // check password
  if (isEmpty(password)) {
    errors.password = "Must not be empty";
  }
  // check submitStatus
  if( isEmpty(submitStatus)) {
    errors.submitStatus = "Must not be empty";
  }
  // check submitStatus
  if( isEmpty(submitStatus)) {
    errors.submitStatus = "Must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
}

exports.validataChildSignupData = (data) => {
  let errors = {};
  const { email, confirmedEmail,password, confirmedPassword,childName,address, tel} = data;

  //check email
  if( isEmpty(email)) {
    errors.email = "Must not be empty"
  } else if ( isEmpty(password)) {
    errors.email = "Must be a valid email address"
  } else if (email !== confirmedEmail) {
    errors.email = "Email and confirmedEmail is not same";
  }

  if (isEmpty(confirmedEmail)) {
    errors.confirmedEmail = "Must not be empty";
  } else if (!isEmail(confirmedEmail)) {
    errors.confirmedEmail = "Must be a valid email address";
  } else if (email !== confirmedEmail) {
    errors.confirmedEmail = "Email and confirmedEmail is not same";
  }

  // check password
  if (isEmpty(password)) {
    errors.password = "Must not be empty";
  } else if (password !== confirmedPassword) {
    errors.password = "Email and confirmedEmail is not same";
  }
  //
  if (isEmpty(confirmedPassword)) {
    errors.confirmedPassword = "Must not be empty";
  } else if (password !== confirmedPassword) {
    errors.confirmedPassword = "Email and confirmedEmail is not same";
  }
  // check childName
  if (isEmpty(childName)) {
    errors.childName = "Must not be empty";
  }

  // check address
  if (isEmpty(address)) {
    errors.address = "Must not be empty";
  }
  // check tel
  if (isEmpty(tel)) {
    errors.tel = "Must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
}
